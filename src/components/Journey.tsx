import React, { useState } from 'react';
import { JOURNEY_STEPS } from '../data/content';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { ArrowUp, Sparkles, CheckCircle } from 'lucide-react';

interface JourneyProps {
  onNavigate: (id: string) => void;
}

export const Journey: React.FC<JourneyProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepAction = (stepIdx: number) => {
    switch (stepIdx) {
      case 0:
        onNavigate('kuis');
        break;
      case 1:
        onNavigate('opencall');
        break;
      case 2:
        onNavigate('ekosistem');
        break;
      case 3:
        onNavigate('dinding-karya');
        break;
      default:
        onNavigate('ekosistem');
    }
  };

  return (
    <section id="journey" className="relative w-full py-16 md:py-24 bg-charcoal-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="METAFORA BOROBUDUR"
          title="Naik Teras demi Teras"
          highlightWord="Teras demi Teras"
          description="Seperti peziarah yang menapaki tingkatan Borobudur dari Kamadhatu, Rupadhatu, hingga Arupadhatu. Setiap tingkatan karya menuntut ketulusan, proses tempaan, dan dedikasi nyata."
          align="center"
        />

        {/* Terraced Journey Architecture */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Step Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-charcoal-800 border-gold-400 shadow-xl shadow-gold-500/10 -translate-y-1'
                      : 'bg-charcoal-800/40 border-charcoal-700/60 hover:border-gold-500/40 hover:bg-charcoal-800/70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          isActive ? 'bg-gold-500 text-charcoal-950 font-bold' : 'bg-charcoal-700 text-cream-200'
                        }`}
                      >
                        Langkah {step.step}
                      </span>
                      <span className="text-xs text-gold-400 font-medium tracking-wide">
                        {step.terrace}
                      </span>
                    </div>
                    {isActive && <Sparkles className="w-4 h-4 text-gold-400" />}
                  </div>

                  <h3
                    className={`font-serif text-xl sm:text-2xl font-bold mt-3 transition-colors ${
                      isActive ? 'text-gold-300' : 'text-cream-100'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-cream-200/80 leading-relaxed font-light">
                    {step.description}
                  </p>

                  {isActive && (
                    <div className="mt-5 pt-4 border-t border-charcoal-700 flex items-center justify-between">
                      <span className="text-xs text-cream-200/60 italic font-light">
                        {step.summary}
                      </span>
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepAction(idx);
                        }}
                      >
                        {step.action}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Visual Stepped Terrace Metaphor (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-charcoal-950/60 rounded-3xl border border-charcoal-700/60 relative">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-6">
              Piramida Undakan Karya
            </span>

            {/* Isometric Staggered Terraces (Bottom to Top) */}
            <div className="w-full max-w-sm flex flex-col-reverse gap-3.5 items-center">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const widths = ['w-full', 'w-[85%]', 'w-[70%]', 'w-[55%]'];
                return (
                  <button
                    key={`terrace-vis-${idx}`}
                    onClick={() => setActiveStep(idx)}
                    className={`${widths[idx]} py-3.5 px-4 rounded-xl border text-center transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-gold-500 text-charcoal-950 border-gold-300 shadow-lg shadow-gold-500/20 scale-105 font-bold'
                        : 'bg-charcoal-800 text-cream-200 border-charcoal-600 hover:border-gold-500/50'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold">{step.step}</span>
                    <span className="text-xs sm:text-sm font-serif truncate mx-2">{step.title}</span>
                    {isActive ? (
                      <CheckCircle className="w-4 h-4 text-charcoal-950" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-charcoal-600" />
                    )}
                  </button>
                );
              })}

              {/* Pinnacle Glowing Stupa */}
              <div
                className={`w-12 h-14 rounded-t-full border-2 flex items-center justify-center transition-all duration-500 ${
                  activeStep === 3
                    ? 'bg-gold-400 border-cream-100 shadow-[0_0_25px_rgba(201,169,110,0.8)] scale-110'
                    : 'bg-charcoal-800 border-gold-600/50'
                }`}
              >
                <div className="w-1.5 h-6 bg-gold-200 rounded-full" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-gold-400 font-medium">
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
              <span>Menapaki Puncak Stupa Mahakarya</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
