import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroGununganProps {
  onComplete: () => void;
}

export const IntroGunungan: React.FC<IntroGununganProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [hasStartedSplitting, setHasStartedSplitting] = useState(false);

  useEffect(() => {
    // If reduced motion or already seen in this session, skip immediately
    const seen = sessionStorage.getItem('mahreen_intro_seen');
    if (prefersReduced || seen) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Sequence timer: 1.4s wait -> start split -> finish at 2.4s
    const splitTimer = setTimeout(() => {
      setHasStartedSplitting(true);
    }, 1400);

    const endTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('mahreen_intro_seen', 'true');
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(endTimer);
    };
  }, [prefersReduced, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem('mahreen_intro_seen', 'true');
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950 overflow-hidden"
      >
        {/* Pulsating Blencong Lamp in Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 animate-blencong-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(227, 207, 166, 0.45) 0%, rgba(201, 169, 110, 0.15) 45%, transparent 75%)',
          }}
        />

        {/* Traditional Kelir Title Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-16 md:top-24 text-center z-20 pointer-events-none px-4"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-semibold">
            Pagelaran Karya Nusantara
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-cream-100 mt-2 font-normal">
            Mahreen Indonesia
          </h1>
        </motion.div>

        {/* Gunungan Split halves */}
        <div className="relative w-72 md:w-96 h-[420px] md:h-[500px] flex items-center justify-center">
          {/* Left Half of Gunungan */}
          <motion.div
            initial={{ x: 0 }}
            animate={hasStartedSplitting ? { x: '-160%', opacity: 0 } : { x: 0, rotate: [-1, 1, -1] }}
            transition={
              hasStartedSplitting
                ? { duration: 0.9, ease: [0.65, 0, 0.35, 1] }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden"
          >
            <div className="w-[200%] h-full">
              <img
                src="/wayang/gunungan.svg"
                alt="Gunungan Wayang Kiri"
                className="w-full h-full object-contain text-gold-400 drop-shadow-[0_0_20px_rgba(201,169,110,0.4)]"
              />
            </div>
          </motion.div>

          {/* Right Half of Gunungan */}
          <motion.div
            initial={{ x: 0 }}
            animate={hasStartedSplitting ? { x: '160%', opacity: 0 } : { x: 0, rotate: [1, -1, 1] }}
            transition={
              hasStartedSplitting
                ? { duration: 0.9, ease: [0.65, 0, 0.35, 1] }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden"
          >
            <div className="w-[200%] h-full -translate-x-1/2">
              <img
                src="/wayang/gunungan.svg"
                alt="Gunungan Wayang Kanan"
                className="w-full h-full object-contain text-gold-400 drop-shadow-[0_0_20px_rgba(201,169,110,0.4)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-10 z-30 px-5 py-2 rounded-full border border-gold-400/40 text-xs tracking-widest uppercase text-cream-200/80 hover:text-gold-300 hover:border-gold-300 transition-all cursor-pointer backdrop-blur-sm"
        >
          Lewati Intro →
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
