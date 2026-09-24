import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'charcoal' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2 tracking-wide',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    gold: 'bg-gold-500 hover:bg-gold-600 text-charcoal-950 shadow-md hover:shadow-lg hover:shadow-gold-500/20 border border-gold-400 font-semibold',
    outline: 'border border-cream-200/50 hover:border-gold-400 text-cream-100 hover:text-gold-300 hover:bg-charcoal-700/40 backdrop-blur-sm',
    charcoal: 'bg-charcoal-900 hover:bg-charcoal-950 text-gold-400 border border-charcoal-600 hover:border-gold-500/50 shadow-sm',
    ghost: 'text-cream-200 hover:text-gold-400 hover:bg-charcoal-700/30',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="inline-block transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
