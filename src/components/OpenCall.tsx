import React from 'react';
import { OPEN_CALL_CONTENT } from '../data/content';
import { Button } from './ui/Button';
import { Sparkles, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const OpenCall: React.FC = () => {
  return (
    <section id="opencall" className="relative w-full py-16 md:py-24 bg-charcoal-800 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="relative bg-charcoal-900 border-2 border-gold-500/60 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          {/* Subtle Wayang Silhouette in Gold at 8% opacity in background (§5.3d & §7.10) */}
          <div className="pointer-events-none absolute right-4 -bottom-10 h-96 opacity-[0.08] select-none text-gold-500">
            <img
              src="/wayang/gunungan.svg"
              alt="Siluet Wayang Latar"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-3xl">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-800 border border-gold-400/40 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{OPEN_CALL_CONTENT.eyebrow}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 leading-tight">
              {OPEN_CALL_CONTENT.title}
            </h2>

            {/* Period Badge */}
            <div className="mt-3 flex items-center gap-2 text-sm sm:text-base text-gold-300 font-medium">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>{OPEN_CALL_CONTENT.subtitle}</span>
            </div>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-cream-200/80 leading-relaxed font-light">
              {OPEN_CALL_CONTENT.description}
            </p>

            {/* Badges */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {OPEN_CALL_CONTENT.badges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-800/80 border border-charcoal-700 text-xs text-cream-100 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Button
                variant="gold"
                size="lg"
                onClick={() => window.open(OPEN_CALL_CONTENT.href, '_blank')}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                {OPEN_CALL_CONTENT.cta}
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
