import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface GununganTransitionProps {
  isActive: boolean;
  onAnimationComplete: () => void;
}

export const GununganTransition: React.FC<GununganTransitionProps> = ({
  isActive,
  onAnimationComplete,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced || !isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Sweeping Gunungan Silhouette across screen from right to left */}
        <motion.div
          initial={{ x: '100vw', rotate: 4 }}
          animate={{ x: '-100vw', rotate: -4 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={onAnimationComplete}
          className="relative w-[120vw] h-[120vh] flex items-center justify-center flex-shrink-0"
        >
          {/* Backdrop screen sweep */}
          <div className="absolute inset-0 bg-charcoal-950/70 backdrop-blur-sm" />

          {/* Majestic Center Gunungan in Gold */}
          <div className="relative z-10 w-80 md:w-[480px] h-[550px] md:h-[750px]">
            <img
              src="/wayang/gunungan-gold.png"
              alt="Transisi Gunungan"
              className="w-full h-full object-contain text-gold-400 drop-shadow-[0_0_35px_rgba(201,169,110,0.6)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
