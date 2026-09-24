import React from 'react';
import { TICKER_ITEMS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Ticker: React.FC = () => {
  const prefersReduced = useReducedMotion();

  // Kawung Separator Icon
  const KawungIcon = () => (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none" className="inline-block mx-5 text-charcoal-900">
      <ellipse cx="16" cy="9" rx="3.5" ry="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="16" cy="23" rx="3.5" ry="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="9" cy="16" rx="6" ry="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="23" cy="16" rx="6" ry="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );

  return (
    <div
      role="region"
      aria-label="Pengumuman Berjalan"
      className="relative w-full bg-gold-500 py-3.5 overflow-hidden border-y border-gold-600 shadow-inner group select-none"
    >
      <div
        className={`flex whitespace-nowrap items-center text-charcoal-950 font-bold text-xs sm:text-sm tracking-wider uppercase ${
          prefersReduced ? 'overflow-x-auto' : 'group-hover:[animation-play-state:paused] animate-marquee'
        }`}
      >
        {/* Render repeated list for continuous seamless marquee */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div key={`ticker-${index}`} className="flex items-center flex-shrink-0">
            <span>{item}</span>
            <KawungIcon />
          </div>
        ))}
      </div>
    </div>
  );
};
