import React from 'react';
import { FOOTER_CONTENT } from '../data/content';
import { MapPin, Mail, Phone, Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-charcoal-950 text-cream-200/90 pt-16 pb-12 overflow-hidden border-t border-charcoal-700/60">
      
      {/* Full-width Mega Mendung Top Border Motif (§7.12) */}
      <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden pointer-events-none opacity-40 select-none">
        <svg viewBox="0 0 600 20" preserveAspectRatio="none" className="w-full h-full text-gold-500" fill="none">
          <path
            d="M0,10 Q50,0 100,10 T200,10 T300,10 T400,10 T500,10 T600,10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M0,15 Q50,5 100,15 T200,15 T300,15 T400,15 T500,15 T600,15"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-9 h-11 flex-shrink-0">
                <img
                  src="/wayang/gunungan.svg"
                  alt="Gunungan Mahreen"
                  className="w-full h-full object-contain text-gold-400"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-cream-100">
                  Mahreen
                </span>
                <span className="block text-[10px] tracking-[0.3em] font-semibold text-gold-400 uppercase -mt-1">
                  Indonesia
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-cream-200/75 leading-relaxed max-w-md font-light">
              {FOOTER_CONTENT.brandDescription}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-charcoal-900 border border-gold-500/40 text-gold-400 tracking-wider">
                #BERKARYAUNTUKINDONESIA
              </span>
            </div>
          </div>

          {/* Contact Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col text-xs sm:text-sm">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-400 mb-4">
              Kantor & Kontak Resmi
            </span>
            <ul className="space-y-3 text-cream-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span>{FOOTER_CONTENT.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${FOOTER_CONTENT.email}`} className="hover:text-gold-300 transition-colors">
                  {FOOTER_CONTENT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="https://wa.me/6289652647385" target="_blank" rel="noreferrer" className="hover:text-gold-300 transition-colors">
                  WhatsApp: {FOOTER_CONTENT.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="https://mahreenindonesia.com" target="_blank" rel="noreferrer" className="hover:text-gold-300 transition-colors">
                  {FOOTER_CONTENT.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Col (3 cols) */}
          <div className="lg:col-span-3 flex flex-col text-xs sm:text-sm">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-400 mb-4">
              Kanal Sosial
            </span>
            <div className="flex flex-col gap-2.5">
              {FOOTER_CONTENT.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/50 hover:text-gold-300 transition-all text-xs"
                >
                  <span className="font-medium">{soc.name}</span>
                  <span className="text-gold-400/80 text-[11px] font-mono">{soc.handle}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Asset Credits & Attribution Section (§11 & §12) */}
        <div className="py-8 border-b border-charcoal-800">
          <span className="text-xs uppercase tracking-wider text-gold-400/90 font-semibold block mb-3">
            Kredit & Atribusi Aset Karya Nusantara:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] text-cream-200/70">
            {FOOTER_CONTENT.credits.map((c, i) => (
              <div key={i} className="p-3 rounded-lg bg-charcoal-900/60 border border-charcoal-800">
                <span className="font-bold text-cream-100 block">{c.item}</span>
                <span className="block mt-0.5 text-cream-200/60">{c.source}</span>
                <span className="text-[10px] text-gold-400/90 font-mono mt-1 block">
                  {c.license}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p className="text-center sm:text-left">
            {FOOTER_CONTENT.prototypeNotice}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 transition-colors text-gold-400 cursor-pointer text-xs"
            aria-label="Kembali ke atas"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
