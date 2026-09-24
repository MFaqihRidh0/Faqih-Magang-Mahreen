import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  onNavigate: (targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ekosistem', href: 'ekosistem' },
    { label: 'Jalur Karyamu', href: 'kuis' },
    { label: 'Journey', href: 'journey' },
    { label: 'Dampak', href: 'dampak' },
    { label: 'Dinding Karya', href: 'dinding-karya' },
    { label: 'FAQ', href: 'faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal-900/90 backdrop-blur-md shadow-lg shadow-charcoal-950/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark with Gunungan Icon */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Mahreen Indonesia - Beranda"
          >
            <div className="w-8 h-10 flex-shrink-0">
              <img
                src="/wayang/gunungan.svg"
                alt="Gunungan Emblem"
                className="w-full h-full object-contain text-gold-400 group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-cream-100 group-hover:text-gold-300 transition-colors">
                Mahreen
              </span>
              <span className="block text-[10px] tracking-[0.28em] font-semibold text-gold-400 uppercase -mt-1">
                Indonesia
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-cream-200/80 hover:text-gold-300 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="gold"
              size="sm"
              onClick={() => handleLinkClick('kuis')}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Mulai Berkarya
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-cream-100 hover:text-gold-400 hover:bg-charcoal-700/50 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Mega Mendung bottom line when sticky */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-charcoal-900/98 backdrop-blur-xl border-b border-charcoal-600 px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-base font-medium text-cream-100 hover:text-gold-300 py-2 border-b border-charcoal-700/60"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4">
              <Button
                variant="gold"
                size="md"
                className="w-full"
                onClick={() => handleLinkClick('kuis')}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Mulai Berkarya
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
