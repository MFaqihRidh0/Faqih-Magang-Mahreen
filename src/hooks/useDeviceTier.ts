import { useState, useEffect } from 'react';

export interface DeviceTier {
  isMobile: boolean;
  isLowTier: boolean;
  hasWebGL: boolean;
  canRender3D: boolean;
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>({
    isMobile: false,
    isLowTier: false,
    hasWebGL: true,
    canRender3D: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const isMobile = window.innerWidth < 768;
      
      // Check WebGL support
      let hasWebGL = false;
      try {
        const canvas = document.createElement('canvas');
        hasWebGL = Boolean(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        hasWebGL = false;
      }

      // Check hardware concurrency
      const concurrency = navigator.hardwareConcurrency || 4;
      const isLowTier = concurrency <= 4 || isMobile;

      const canRender3D = hasWebGL && !isMobile && concurrency > 2;

      setTier({
        isMobile,
        isLowTier,
        hasWebGL,
        canRender3D,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return tier;
}
