import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BorobudurProcedural } from './BorobudurProcedural';
import { BorobudurFallback } from './BorobudurFallback';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface BorobudurSceneProps {
  className?: string;
}

export const BorobudurScene: React.FC<BorobudurSceneProps> = ({ className = '' }) => {
  const { canRender3D } = useDeviceTier();
  const prefersReducedMotion = useReducedMotion();
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!canRender3D || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouseParallax({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canRender3D, prefersReducedMotion]);

  // Fallback to static vector/WebP Borobudur if low-tier, mobile, or reduced motion
  if (!canRender3D || prefersReducedMotion) {
    return <BorobudurFallback className={className} />;
  }

  // Calculate scroll camera elevation (rises gently as user scrolls down hero)
  const cameraY = Math.min(6.5, 3.8 + scrollY * 0.0035);
  const cameraZ = Math.max(7.5, 9.5 - scrollY * 0.002);

  return (
    <div
      role="img"
      aria-label="Ilustrasi 3D Candi Borobudur Interaktif Emas"
      className={`relative w-full h-[400px] sm:h-[480px] lg:h-[580px] select-none ${className}`}
    >
      <Suspense fallback={<BorobudurFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, cameraY, cameraZ], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Background Fog matching charcoal-800 to melt into page */}
          <fog attach="fog" args={['#2A2623', 8, 22]} />

          {/* Golden Twilight Lighting */}
          <ambientLight intensity={0.8} color="#C9A96E" />
          {/* Main Key Sun Light */}
          <directionalLight position={[6, 8, 5]} intensity={1.5} color="#F5EEDF" castShadow />
          {/* Rim light from behind */}
          <directionalLight position={[-6, 4, -5]} intensity={0.9} color="#E3CFA6" />
          {/* Subtle bottom warm bounce */}
          <pointLight position={[0, -2, 2]} intensity={0.5} color="#A8864F" />

          {/* Procedural 3D Borobudur Model */}
          <BorobudurProcedural mouseParallax={mouseParallax} />
        </Canvas>
      </Suspense>
    </div>
  );
};
