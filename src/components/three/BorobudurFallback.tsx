import React from 'react';

export const BorobudurFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      role="img"
      aria-label="Ilustrasi Siluet Candi Borobudur Emas"
      className={`relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Golden Dusk Glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(201, 169, 110, 0.35) 0%, rgba(23, 20, 18, 0) 70%)',
        }}
      />

      {/* Stylized Vector Silhouette of Borobudur */}
      <svg
        viewBox="0 0 600 400"
        className="w-full max-w-lg h-auto drop-shadow-[0_10px_25px_rgba(201,169,110,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5EEDF" />
            <stop offset="40%" stopColor="#C9A96E" />
            <stop offset="100%" stopColor="#7E6337" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Level 1-6 (Square Terraces) */}
        <polygon points="50,340 550,340 520,320 80,320" fill="url(#goldGradient)" opacity="0.85" />
        <polygon points="80,320 520,320 490,300 110,300" fill="url(#goldGradient)" opacity="0.88" />
        <polygon points="110,300 490,300 460,280 140,280" fill="url(#goldGradient)" opacity="0.9" />
        <polygon points="140,280 460,280 430,260 170,260" fill="url(#goldGradient)" opacity="0.92" />
        <polygon points="170,260 430,260 400,240 200,240" fill="url(#goldGradient)" opacity="0.95" />
        <polygon points="200,240 400,240 380,220 220,220" fill="url(#goldGradient)" opacity="0.98" />

        {/* Circular Terraces (Arupadhatu) */}
        <ellipse cx="300" cy="220" rx="150" ry="18" fill="url(#goldGradient)" />
        <ellipse cx="300" cy="205" rx="120" ry="15" fill="url(#goldGradient)" opacity="0.9" />
        <ellipse cx="300" cy="190" rx="90" ry="12" fill="url(#goldGradient)" opacity="0.85" />

        {/* Small Stupas Rows */}
        {/* Row 1 */}
        {[-110, -75, -40, 0, 40, 75, 110].map((offset, i) => (
          <g key={`stupa-1-${i}`} transform={`translate(${300 + offset}, 208)`}>
            <path d="M-6,0 C-6,-10 6,-10 6,0 Z" fill="#E3CFA6" />
            <line x1="0" y1="-10" x2="0" y2="-15" stroke="#E3CFA6" strokeWidth="1.5" />
          </g>
        ))}
        {/* Row 2 */}
        {[-80, -40, 0, 40, 80].map((offset, i) => (
          <g key={`stupa-2-${i}`} transform={`translate(${300 + offset}, 194)`}>
            <path d="M-5,0 C-5,-9 5,-9 5,0 Z" fill="#E3CFA6" />
            <line x1="0" y1="-9" x2="0" y2="-14" stroke="#E3CFA6" strokeWidth="1.5" />
          </g>
        ))}
        {/* Row 3 */}
        {[-50, -20, 20, 50].map((offset, i) => (
          <g key={`stupa-3-${i}`} transform={`translate(${300 + offset}, 180)`}>
            <path d="M-5,0 C-5,-8 5,-8 5,0 Z" fill="#E3CFA6" />
            <line x1="0" y1="-8" x2="0" y2="-13" stroke="#E3CFA6" strokeWidth="1.5" />
          </g>
        ))}

        {/* Main Central Stupa (Stupa Induk) */}
        <path
          d="M265,180 C265,130 335,130 335,180 Z"
          fill="url(#goldGradient)"
          filter="url(#softGlow)"
        />
        {/* Main Stupa Pinnacle */}
        <rect x="296" y="90" width="8" height="45" rx="3" fill="#F5EEDF" filter="url(#softGlow)" />
        <circle cx="300" cy="85" r="5" fill="#F5EEDF" />

        {/* Warm Pelita Glow points */}
        <circle cx="300" cy="85" r="8" fill="#F5EEDF" opacity="0.6" />
        <circle cx="200" cy="220" r="3" fill="#E3CFA6" opacity="0.8" />
        <circle cx="400" cy="220" r="3" fill="#E3CFA6" opacity="0.8" />
        <circle cx="250" cy="205" r="2.5" fill="#E3CFA6" opacity="0.8" />
        <circle cx="350" cy="205" r="2.5" fill="#E3CFA6" opacity="0.8" />
      </svg>
    </div>
  );
};
