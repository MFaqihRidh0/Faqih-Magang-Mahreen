import React from 'react';

interface BatikDividerProps {
  className?: string;
  variant?: 'gold' | 'charcoal' | 'subtle';
}

export const BatikDivider: React.FC<BatikDividerProps> = ({
  className = '',
  variant = 'gold',
}) => {
  const strokeColor = variant === 'charcoal' ? '#1F1B19' : variant === 'subtle' ? '#4A423C' : '#C9A96E';
  const glowColor = variant === 'gold' ? 'rgba(201, 169, 110, 0.2)' : 'transparent';

  return (
    <div
      className={`w-full flex items-center justify-center my-8 md:my-14 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-[#C9A96E]" />

      {/* Center Kawung Emblem */}
      <div className="mx-4 flex items-center justify-center" style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer diamonds */}
          <rect x="16" y="2" width="4" height="4" transform="rotate(45 16 2)" fill={strokeColor} opacity="0.6" />
          <rect x="16" y="28" width="4" height="4" transform="rotate(45 16 28)" fill={strokeColor} opacity="0.6" />
          <rect x="2" y="16" width="4" height="4" transform="rotate(45 2 16)" fill={strokeColor} opacity="0.6" />
          <rect x="28" y="16" width="4" height="4" transform="rotate(45 28 16)" fill={strokeColor} opacity="0.6" />

          {/* 4 Kawung Petals */}
          <ellipse cx="16" cy="9" rx="3.5" ry="6" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <ellipse cx="16" cy="23" rx="3.5" ry="6" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <ellipse cx="9" cy="16" rx="6" ry="3.5" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <ellipse cx="23" cy="16" rx="6" ry="3.5" stroke={strokeColor} strokeWidth="1.2" fill="none" />

          {/* Center Point */}
          <circle cx="16" cy="16" r="2.5" fill={strokeColor} />
          <circle cx="16" cy="16" r="4.5" stroke={strokeColor} strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Right Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C9A96E]/50 to-[#C9A96E]" />
    </div>
  );
};
