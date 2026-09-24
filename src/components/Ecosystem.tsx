import React, { useState } from 'react';
import { ECOSYSTEM_UNITS, EcosystemUnit } from '../data/ecosystem';
import { EcosystemCard } from './EcosystemCard';
import { SectionHeading } from './ui/SectionHeading';
import { Chip } from './ui/Chip';
import { Button } from './ui/Button';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

export const Ecosystem: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedUnit, setSelectedUnit] = useState<EcosystemUnit | null>(null);

  const categories = ['Semua', 'Belajar', 'Berkarya', 'Berdampak'];

  const filteredUnits =
    activeCategory === 'Semua'
      ? ECOSYSTEM_UNITS
      : ECOSYSTEM_UNITS.filter((u) => u.category === activeCategory);

  return (
    <section id="ekosistem" className="relative w-full py-16 md:py-24 bg-charcoal-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="OUR ECOSYSTEM"
          title="Enam Pintu untuk Berkarya"
          highlightWord="Berkarya"
          description="Temukan wadah paling relevan dengan aspirasimu. Dari riset wawasan, agensi digital komersial, hingga aksi kemanusiaan di pelosok negeri."
          align="center"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              count={
                cat === 'Semua'
                  ? ECOSYSTEM_UNITS.length
                  : ECOSYSTEM_UNITS.filter((u) => u.category === cat).length
              }
            />
          ))}
        </div>

        {/* 6 Unit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredUnits.map((unit) => (
            <EcosystemCard
              key={unit.id}
              unit={unit}
              onSelect={(u) => setSelectedUnit(u)}
            />
          ))}
        </div>

        {/* Modal Detail */}
        {selectedUnit && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-2xl bg-charcoal-900 border border-gold-400/60 rounded-3xl p-6 sm:p-9 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedUnit(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-charcoal-800 text-cream-200/70 hover:text-cream-100 hover:bg-charcoal-700 transition-colors cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category Pill */}
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 border border-gold-400/30 uppercase tracking-widest inline-block mb-3">
                Kategori: {selectedUnit.category}
              </span>

              {/* Title & Tagline */}
              <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-cream-100">
                {selectedUnit.name}
              </h3>
              <p className="mt-2 text-base text-gold-400 font-medium">
                {selectedUnit.tagline}
              </p>

              {/* Target Audience */}
              <div className="mt-6 p-4 rounded-xl bg-charcoal-800/80 border border-charcoal-700">
                <span className="text-xs uppercase tracking-wider text-cream-200/60 font-semibold block mb-1">
                  Untuk siapa program ini?
                </span>
                <p className="text-sm text-cream-100 leading-relaxed">
                  {selectedUnit.forYouIf}
                </p>
              </div>

              {/* What You Can Do List */}
              <div className="mt-6">
                <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block mb-3">
                  Aktivitas & Peranmu di Sini:
                </span>
                <ul className="space-y-2.5">
                  {selectedUnit.whatYouCanDo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-cream-200/90 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-charcoal-700 flex flex-wrap items-center justify-between gap-4">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => window.open(selectedUnit.ctaHref, '_blank')}
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  {selectedUnit.ctaLabel}
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setSelectedUnit(null)}
                >
                  Tutup
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
