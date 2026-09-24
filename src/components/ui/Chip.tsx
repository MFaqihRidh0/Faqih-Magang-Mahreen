import React from 'react';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  onClick,
  count,
  icon,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 select-none cursor-pointer border ${
        active
          ? 'bg-gold-500 text-charcoal-950 border-gold-400 shadow-md shadow-gold-500/10 font-semibold'
          : 'bg-charcoal-700/60 text-cream-200/90 border-charcoal-600 hover:border-gold-500/50 hover:text-gold-300'
      } ${className}`}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{label}</span>
      {typeof count === 'number' && (
        <span
          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
            active ? 'bg-charcoal-950 text-gold-400' : 'bg-charcoal-800 text-cream-200'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
