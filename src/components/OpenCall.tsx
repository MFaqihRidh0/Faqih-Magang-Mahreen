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
          
          {/* Authentic Golden Wayang Ksatria Figure from user asset */}
          <div className="hidden lg:block absolute right-10 -bottom-6 h-[440px] pointer-events-none select-none z-10">
            <div className="relative h-full animate-wayang-sway origin-bottom">
              {/* Golden Ambient Glow */}
              <div
                className="absolute inset-0 opacity-40 blur-2xl -z-10"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.6) 0%, transparent 70%)',
                }}
              />
              <img
                src="/wayang/wayang-ksatria.png"
                alt="Wayang Kulit Ksatria Berkarya"
                className="h-full w-auto object-contain drop-shadow-[0_10px_25px_rgba(201,169,110,0.45)]"
              />
            </div>
          </div>

          {/* Subtle mobile backdrop wayang */}
          <div className="lg:hidden pointer-events-none absolute right-2 -bottom-8 h-72 opacity-15 select-none">
            <img
              src="/wayang/wayang-ksatria.png"
              alt="Wayang Kulit Ksatria"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            
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
