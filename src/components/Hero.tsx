import React from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { HERO_CONTENT } from '../data/content';
import { Button } from './ui/Button';
import { BatikPattern } from './batik/BatikPattern';
import { BorobudurFallback } from './three/BorobudurFallback';

const BorobudurScene = React.lazy(() =>
  import('./three/BorobudurScene').then((mod) => ({ default: mod.BorobudurScene }))
);

interface HeroProps {
  onNavigate: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 lg:py-28 overflow-hidden bg-charcoal-800"
    >
      {/* Subtle Batik Kawung Background Pattern (6% opacity as in §4) */}
      <BatikPattern variant="kawung" opacity={0.06} color="#C9A96E" />

      {/* Warm Ambient Radial Glow Behind 3D Canvas */}
      <div
        className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.4) 0%, rgba(42, 38, 35, 0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Typography & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-700/80 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-6 w-fit backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            {/* Main H1 */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-cream-100 leading-[1.12]">
              {HERO_CONTENT.h1Part1}{' '}
              <span className="text-gold-400 italic block sm:inline">
                {HERO_CONTENT.h1Highlight}
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-cream-200/85 leading-relaxed max-w-2xl font-light">
              {HERO_CONTENT.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                onClick={() => onNavigate('kuis')}
                icon={<Compass className="w-4 h-4" />}
              >
                {HERO_CONTENT.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('ekosistem')}
              >
                {HERO_CONTENT.ctaSecondary}
              </Button>
            </div>

            {/* Value Highlights Pill Row */}
            <div className="mt-10 pt-6 border-t border-charcoal-700/80 flex flex-wrap items-center gap-6 text-xs text-cream-200/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span>Borobudur 3D Stylized</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cream-200/40" />
                <span>Wayang Punakawan & Kelir</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cream-200/40" />
                <span>Batik Kawung & Parang Prosedural</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Borobudur Scene (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              <React.Suspense fallback={<BorobudurFallback />}>
                <BorobudurScene />
              </React.Suspense>

              {/* Caption pill below 3D */}
              <div className="text-center mt-2 flex items-center justify-center gap-1.5">
                <span className="text-[11px] uppercase tracking-widest text-gold-400/90 font-medium">
                  ✦ Putar 360° — Geser Bebas untuk Melihat Seluruh Sisi Candi ✦
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-cream-200/50 hover:text-gold-300 transition-colors pointer-events-none">
        <span className="text-[11px] tracking-widest uppercase">
          {HERO_CONTENT.scrollIndicator}
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-gold-400/80" />
      </div>
    </section>
  );
};
