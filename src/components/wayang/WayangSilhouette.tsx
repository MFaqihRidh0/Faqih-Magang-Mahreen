import React from 'react';

export type WayangFigure = 'gunungan' | 'semar' | 'gareng' | 'petruk' | 'bagong' | 'ksatria';

interface WayangSilhouetteProps {
  figure: WayangFigure;
  color?: 'charcoal' | 'gold' | 'cream' | 'prada';
  className?: string;
  height?: number | string;
  animate?: boolean;
  shadowEffect?: boolean;
}

export const WayangSilhouette: React.FC<WayangSilhouetteProps> = ({
  figure,
  color = 'prada',
  className = '',
  height = 240,
  animate = true,
  shadowEffect = true,
}) => {
  const isKsatria = figure === 'ksatria';
  const isGunungan = figure === 'gunungan';

  // Radiant Golden Prada Shadow Effect
  const shadowStyle = shadowEffect
    ? {
        filter: isKsatria
          ? 'drop-shadow(0 0 25px rgba(201, 169, 110, 0.6)) drop-shadow(2px 6px 12px rgba(23, 20, 18, 0.4))'
          : 'drop-shadow(0 4px 14px rgba(201, 169, 110, 0.35)) drop-shadow(1px 2px 4px rgba(23, 20, 18, 0.2))',
      }
    : {};

  let imageSrc = `/wayang/${figure}.png`;
  if (isKsatria) {
    imageSrc = '/wayang/wayang-ksatria.png';
  } else if (isGunungan && (color === 'gold' || color === 'cream')) {
    imageSrc = '/wayang/gunungan-gold.png';
  }

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
        className="h-full w-auto object-contain"
        draggable={false}
      />
    </div>
  );
};
