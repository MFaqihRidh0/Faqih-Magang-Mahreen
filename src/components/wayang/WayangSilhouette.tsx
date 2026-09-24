import React from 'react';

export type WayangFigure = 'gunungan' | 'semar' | 'gareng' | 'petruk' | 'bagong';

interface WayangSilhouetteProps {
  figure: WayangFigure;
  color?: 'charcoal' | 'gold' | 'cream';
  className?: string;
  height?: number | string;
  animate?: boolean;
  shadowEffect?: boolean;
}

export const WayangSilhouette: React.FC<WayangSilhouetteProps> = ({
  figure,
  color = 'charcoal',
  className = '',
  height = 240,
  animate = true,
  shadowEffect = true,
}) => {
  const textColorClass =
    color === 'charcoal'
      ? 'text-charcoal-950'
      : color === 'gold'
      ? 'text-gold-500'
      : 'text-cream-100';

  // Kelir shadow effect: soft double shadow + slight blur like cloth projection
  const shadowStyle = shadowEffect
    ? {
        filter:
          color === 'charcoal'
            ? 'drop-shadow(3px 4px 6px rgba(23, 20, 18, 0.45)) drop-shadow(1px 2px 2px rgba(23, 20, 18, 0.6)) blur(0.3px)'
            : 'drop-shadow(0 0 10px rgba(201, 169, 110, 0.4))',
      }
    : {};

  return (
    <div
      className={`inline-block select-none origin-bottom ${animate ? 'animate-wayang-sway' : ''} ${className}`}
      style={{
        height,
        ...shadowStyle,
      }}
      aria-hidden="true"
    >
      <img
        src={`/wayang/${figure}.svg`}
        alt={`Siluet Wayang ${figure}`}
        className={`h-full w-auto object-contain ${textColorClass}`}
        draggable={false}
      />
    </div>
  );
};
