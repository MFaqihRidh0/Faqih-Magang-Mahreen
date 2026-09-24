import React from 'react';
import {
  GraduationCap,
  Newspaper,
  Sparkles,
  Palette,
  HeartHandshake,
  Trees,
  ArrowRight,
} from 'lucide-react';
import { EcosystemUnit } from '../data/ecosystem';

interface EcosystemCardProps {
  unit: EcosystemUnit;
  onSelect: (unit: EcosystemUnit) => void;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({ unit, onSelect }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-gold-400" />;
      case 'Newspaper':
        return <Newspaper className="w-6 h-6 text-gold-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-gold-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-gold-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-gold-400" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-gold-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold-400" />;
    }
  };

  const categoryColorClass = {
    Belajar: 'bg-gold-500/15 text-gold-300 border-gold-400/30',
    Berkarya: 'bg-cream-100/15 text-cream-100 border-cream-200/30',
    Berdampak: 'bg-gold-600/20 text-gold-200 border-gold-500/40',
  }[unit.category];

  return (
    <div
      onClick={() => onSelect(unit)}
      className="group relative bg-charcoal-700/80 rounded-2xl p-7 border border-charcoal-600 transition-all duration-300 hover:border-gold-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Mega Mendung Corner Ornament in Top Right (15% -> 40% on hover as in §7.5) */}
      <div className="absolute top-0 right-0 w-28 h-20 pointer-events-none opacity-15 group-hover:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 120 80" className="w-full h-full text-gold-400" fill="currentColor">
          <path d="M120,0 L70,0 C65,15 50,15 45,25 C35,28 30,40 20,45 C10,50 0,65 0,80 L120,80 Z" opacity="0.3" />
          <path d="M120,0 C100,10 85,15 75,30 C65,40 50,45 40,60 C35,68 25,75 15,80" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M120,20 C105,28 95,35 85,45 C78,52 65,58 55,70 C50,75 45,78 40,80" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>

      <div>
        {/* Top Header: Icon & Category Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-charcoal-800 border border-charcoal-600/80 flex items-center justify-center group-hover:scale-110 transition-transform">
            {getIcon(unit.icon)}
          </div>
          <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border tracking-wider uppercase ${categoryColorClass}`}>
            {unit.category}
          </span>
        </div>

        {/* Highlight badge if available */}
        <span className="text-xs font-semibold text-gold-400 tracking-wide block mb-1">
          ✦ {unit.highlightText}
        </span>

        {/* Title & Tagline */}
        <h3 className="font-serif text-2xl font-bold text-cream-100 group-hover:text-gold-300 transition-colors">
          {unit.name}
        </h3>
        <p className="mt-2 text-sm text-cream-200/80 leading-relaxed font-light">
          {unit.tagline}
        </p>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-6 pt-5 border-t border-charcoal-600/60 flex items-center justify-between text-xs text-gold-400 font-medium">
        <span>Lihat Detail Program</span>
        <div className="w-7 h-7 rounded-full bg-charcoal-800 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-colors">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
