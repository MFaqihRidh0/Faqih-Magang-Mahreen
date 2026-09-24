import React, { useState, useEffect } from 'react';
import { IMPACT_STATS } from '../data/content';
import { BatikPattern } from './batik/BatikPattern';
import { SectionHeading } from './ui/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ImpactStats: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (prefersReduced) {
      setCounts(IMPACT_STATS.stats.map((s) => s.value));
      return;
    }

    const duration = 2000;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(
        IMPACT_STATS.stats.map((s) => Math.floor(s.value * easeOut))
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(IMPACT_STATS.stats.map((s) => s.value));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [prefersReduced]);

  return (
    <section
      id="dampak"
      className="relative w-full py-16 md:py-24 bg-gold-500 text-charcoal-950 overflow-hidden"
    >
      {/* Subtle Parang Batik Pattern overlay at 8% opacity (as in §4 & §7.8) */}
      <BatikPattern variant="parang" opacity={0.08} color="#7E6337" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with light theme */}
        <SectionHeading
          theme="light"
          eyebrow={IMPACT_STATS.eyebrow}
          title={IMPACT_STATS.title}
          highlightWord="Bersemi"
          description="Inisiatif Mahreen Indonesia terus berkesinambungan menanam benih perubahan, merawat talenta, dan menebar faedah nyata di masyarakat."
          align="center"
        />

        {/* 4 Large Stats Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12">
          {IMPACT_STATS.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-cream-100/70 border border-charcoal-950/20 rounded-2xl p-6 sm:p-7 text-center backdrop-blur-sm shadow-md hover:bg-cream-100 transition-colors"
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-950 tracking-tight">
                {counts[idx].toLocaleString('id-ID')}
                <span className="text-gold-700">{stat.suffix}</span>
              </div>
              <h3 className="mt-2 text-sm sm:text-base font-bold text-charcoal-900">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-charcoal-800/80 leading-relaxed font-normal">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 2 Program Progress Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {IMPACT_STATS.programs.map((prog) => (
            <div
              key={prog.name}
              className="bg-cream-50/80 border border-charcoal-950/25 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
                  {prog.status}
                </span>
                <span className="text-sm font-bold text-charcoal-950">
                  {prog.progress}%
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-charcoal-950">
                {prog.name}
              </h4>
              <span className="text-xs text-charcoal-700 block mt-0.5">
                Target Capaian: {prog.target}
              </span>

              {/* Progress Bar with gold fill */}
              <div className="mt-4 w-full h-2.5 rounded-full bg-charcoal-950/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-charcoal-950 transition-all duration-1000"
                  style={{ width: `${prog.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Illustrative Data Note */}
        <p className="mt-10 text-center text-xs text-charcoal-800/70 font-medium italic">
          * {IMPACT_STATS.disclaimer}
        </p>

      </div>
    </section>
  );
};
