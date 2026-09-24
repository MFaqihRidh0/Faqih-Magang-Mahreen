import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlightWord?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  theme?: 'dark' | 'light'; // dark for charcoal background, light for gold background (e.g. Kelir, Dampak)
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlightWord,
  description,
  align = 'center',
  className = '',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  // Render title with highlighted word if provided
  const renderTitle = () => {
    if (!highlightWord) return title;

    const parts = title.split(new RegExp(`(${highlightWord})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span
              key={i}
              className={
                isLight
                  ? 'text-charcoal-950 underline decoration-gold-700 decoration-wavy decoration-1 underline-offset-8'
                  : 'text-gold-400 italic'
              }
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignClasses[align]} mb-10 md:mb-14 ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3 ${
            isLight ? 'text-charcoal-800' : 'text-gold-400'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] ${
          isLight ? 'text-charcoal-950' : 'text-cream-100'
        }`}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
            isLight ? 'text-charcoal-900' : 'text-cream-200/80'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
