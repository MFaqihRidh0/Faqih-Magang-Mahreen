import React from 'react';

export type WayangFigure = 'gunungan' | 'semar' | 'gareng' | 'petruk' | 'bagong' | 'ksatria';

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
  const isKsatria = figure === 'ksatria';

  const textColorClass =
    color === 'charcoal'
      ? 'text-charcoal-950'
      : color === 'gold'
      ? 'text-gold-500'
      : 'text-cream-100';

  // Kelir shadow effect: soft double shadow + subtle blur like cloth projection
  const shadowStyle = shadowEffect
    ? {
        filter: isKsatria
          ? 'drop-shadow(0 0 20px rgba(201, 169, 110, 0.45)) drop-shadow(2px 6px 12px rgba(23, 20, 18, 0.6))'
          : color === 'charcoal'
          ? 'drop-shadow(3px 4px 6px rgba(23, 20, 18, 0.45)) drop-shadow(1px 2px 3px rgba(23, 20, 18, 0.6))'
          : 'drop-shadow(0 0 12px rgba(201, 169, 110, 0.5))',
      }
    : {};

  const imageSrc = isKsatria ? '/wayang/wayang-ksatria.png' : `/wayang/${figure}.svg`;

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
        src={imageSrc}
        alt={`Wayang ${figure}`}
        className={`h-full w-auto object-contain ${!isKsatria ? textColorClass : ''}`}
        draggable={false}
      />
    </div>
  );
};
