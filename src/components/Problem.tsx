import React from 'react';
import { PROBLEM_SOLUTION_CONTENT } from '../data/content';
import { SectionHeading } from './ui/SectionHeading';
import { BatikDivider } from './batik/BatikDivider';
import { Compass, Layers, Zap } from 'lucide-react';

export const Problem: React.FC = () => {
  const stepIcons = [
    <Compass className="w-6 h-6 text-gold-400" />,
    <Layers className="w-6 h-6 text-gold-400" />,
    <Zap className="w-6 h-6 text-gold-400" />,
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-charcoal-900/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <SectionHeading
          eyebrow={PROBLEM_SOLUTION_CONTENT.eyebrow}
          title={PROBLEM_SOLUTION_CONTENT.title}
          highlightWord="Mulai dari Mana?"
          description={PROBLEM_SOLUTION_CONTENT.description}
          align="center"
        />

        {/* 3 Pillars Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {PROBLEM_SOLUTION_CONTENT.steps.map((step, idx) => (
            <div
              key={step.number}
              className="group relative bg-charcoal-800/90 border border-charcoal-600/80 rounded-2xl p-7 transition-all duration-300 hover:border-gold-500/70 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold-500/5"
            >
              {/* Top Row: Icon & Step Number */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-charcoal-700/80 border border-charcoal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stepIcons[idx]}
                </div>
                <span className="font-serif text-3xl font-bold text-gold-500/30 group-hover:text-gold-400/70 transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl font-bold text-cream-100 group-hover:text-gold-300 transition-colors">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-cream-200/80 leading-relaxed">
                {step.description}
              </p>

              {/* Bottom decorative accent line */}
              <div className="mt-6 h-[2px] w-12 bg-charcoal-600 group-hover:w-full group-hover:bg-gold-500 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Section Ending Divider */}
        <BatikDivider className="mt-16" />
      </div>
    </section>
  );
};
