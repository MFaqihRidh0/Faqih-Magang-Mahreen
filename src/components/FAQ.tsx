import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { SectionHeading } from './ui/SectionHeading';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Kawung Accordion Icon rotating 45deg on open (§7.11)
  const KawungIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div
      className={`w-7 h-7 rounded-full bg-charcoal-700/80 border border-charcoal-600 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
        isOpen ? 'rotate-45 border-gold-400 bg-gold-500/20' : ''
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" className="text-gold-400">
        <ellipse cx="16" cy="9" rx="3" ry="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <ellipse cx="16" cy="23" rx="3" ry="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <ellipse cx="9" cy="16" rx="5" ry="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <ellipse cx="23" cy="16" rx="5" ry="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    </div>
  );

  return (
    <section id="faq" className="relative w-full py-16 md:py-24 bg-charcoal-900/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="TANYA JAWAB UMUM"
          title="Pertanyaan yang Sering Diajukan"
          highlightWord="Sering Diajukan"
          description="Segala hal mendasar yang perlu kamu ketahui seputar ekosistem Mahreen Indonesia dan inisiatif #BerkaryaUntukIndonesia."
          align="center"
        />

        {/* 5 Accordions List */}
        <div className="mt-12 flex flex-col gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-charcoal-800 border-gold-500/60 shadow-lg'
                    : 'bg-charcoal-800/40 border-charcoal-700/60 hover:border-gold-500/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-cream-100 pr-2">
                    {item.question}
                  </span>
                  <KawungIcon isOpen={isOpen} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-cream-200/80 leading-relaxed font-light border-t border-charcoal-700/60">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
