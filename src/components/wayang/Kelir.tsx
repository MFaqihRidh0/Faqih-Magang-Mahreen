import React from 'react';

interface KelirProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Kelir: React.FC<KelirProps> = ({ children, id = 'kuis', className = '' }) => {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden bg-gold-500 py-16 md:py-24 text-charcoal-950 transition-colors duration-500 ${className}`}
    >
      {/* Blencong Oil Lamp Radiance - pulsating warm light at top center */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-60 mix-blend-soft-light animate-blencong-pulse"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #F5EEDF 0%, #E3CFA6 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Cloth / Screen texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#171412 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      {/* Decorative Kelir Border (Top & Bottom subtle frame like wayang banana trunk / kelir frame) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-charcoal-950 via-gold-700 to-charcoal-950" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-charcoal-950 via-gold-700 to-charcoal-950" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
