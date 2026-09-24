import React from 'react';

export type BatikVariant = 'kawung' | 'parang' | 'megamendung';

interface BatikPatternProps {
  variant?: BatikVariant;
  className?: string;
  opacity?: number;
  color?: string; // default stroke/fill color
}

export const BatikPattern: React.FC<BatikPatternProps> = ({
  variant = 'kawung',
  className = '',
  opacity = 0.08,
  color = '#C9A96E', // gold-500 default
}) => {
  const patternId = `batik-${variant}-${Math.random().toString(36).substring(2, 8)}`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {variant === 'kawung' && (
            <pattern
              id={patternId}
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              {/* Kawung Petals in Center */}
              <ellipse cx="32" cy="18" rx="8" ry="12" fill="none" stroke={color} strokeWidth="1.2" />
              <ellipse cx="32" cy="46" rx="8" ry="12" fill="none" stroke={color} strokeWidth="1.2" />
              <ellipse cx="18" cy="32" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1.2" />
              <ellipse cx="46" cy="32" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1.2" />
              
              {/* Inner petal highlights */}
              <ellipse cx="32" cy="20" rx="3.5" ry="6" fill={color} fillOpacity="0.25" />
              <ellipse cx="32" cy="44" rx="3.5" ry="6" fill={color} fillOpacity="0.25" />
              <ellipse cx="20" cy="32" rx="6" ry="3.5" fill={color} fillOpacity="0.25" />
              <ellipse cx="44" cy="32" rx="6" ry="3.5" fill={color} fillOpacity="0.25" />

              {/* Center cross dot */}
              <circle cx="32" cy="32" r="3" fill="none" stroke={color} strokeWidth="1.2" />
              <circle cx="32" cy="32" r="1.2" fill={color} />

              {/* Corner quadrants for seamless repeat */}
              <ellipse cx="0" cy="0" rx="8" ry="12" fill="none" stroke={color} strokeWidth="1.2" />
              <ellipse cx="64" cy="0" rx="8" ry="12" fill="none" stroke={color} strokeWidth="1.2" />
              <ellipse cx="0" cy="64" rx="8" ry="12" fill="none" stroke={color} strokeWidth="1.2" />
              <ellipse cx="64" cy="64" rx="8" ry="12" fill="none" stroke={color} strokeWidth="1.2" />
              
              <circle cx="0" cy="0" r="3" fill="none" stroke={color} strokeWidth="1" />
              <circle cx="64" cy="0" r="3" fill="none" stroke={color} strokeWidth="1" />
              <circle cx="0" cy="64" r="3" fill="none" stroke={color} strokeWidth="1" />
              <circle cx="64" cy="64" r="3" fill="none" stroke={color} strokeWidth="1" />
            </pattern>
          )}

          {variant === 'parang' && (
            <pattern
              id={patternId}
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              {/* Diagonal parang blade rows */}
              <path
                d="M 10,0 C 25,15 35,25 20,40 C 5,55 15,65 30,80 M 50,0 C 65,15 75,25 60,40 C 45,55 55,65 70,80"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Inner detail S-swirls */}
              <path
                d="M 16,10 C 22,18 24,24 16,30 M 56,10 C 62,18 64,24 56,30"
                fill="none"
                stroke={color}
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
              {/* Mlinjon (diamond accents) */}
              <polygon points="40,15 45,20 40,25 35,20" fill={color} fillOpacity="0.4" />
              <polygon points="40,55 45,60 40,65 35,60" fill={color} fillOpacity="0.4" />
              <polygon points="0,15 5,20 0,25 -5,20" fill={color} fillOpacity="0.4" />
              <polygon points="80,15 85,20 80,25 75,20" fill={color} fillOpacity="0.4" />
            </pattern>
          )}

          {variant === 'megamendung' && (
            <pattern
              id={patternId}
              width="120"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {/* Layer 1 Outer Cloud */}
              <path
                d="M 0,35 C 15,20 30,22 45,30 C 55,20 75,18 90,28 C 105,20 115,25 120,35"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Layer 2 Mid Cloud */}
              <path
                d="M 5,38 C 20,26 32,27 46,34 C 56,26 72,25 86,33 C 98,26 108,30 115,38"
                fill="none"
                stroke={color}
                strokeWidth="1.4"
                strokeOpacity="0.75"
              />
              {/* Layer 3 Core Cloud */}
              <path
                d="M 12,42 C 24,33 34,34 46,39 C 56,33 68,32 80,38 C 92,33 100,36 108,42"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            </pattern>
          )}
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
