import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BorobudurProcedural } from './BorobudurProcedural';
import { BorobudurFallback } from './BorobudurFallback';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Rotate3d } from 'lucide-react';

interface BorobudurSceneProps {
  className?: string;
}

export const BorobudurScene: React.FC<BorobudurSceneProps> = ({ className = '' }) => {
  const { canRender3D } = useDeviceTier();
  const prefersReducedMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!canRender3D || prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [canRender3D, prefersReducedMotion]);

  // Fallback to static vector/WebP Borobudur if low-tier, mobile, or reduced motion
  if (!canRender3D || prefersReducedMotion) {
    return <BorobudurFallback className={className} />;
  }

  // Scroll camera elevation (rises gently as user scrolls down hero)
  const cameraY = Math.min(6.5, 3.8 + scrollY * 0.0035);
  const cameraZ = Math.max(7.5, 9.5 - scrollY * 0.002);

  return (
    <div
      role="img"
      aria-label="Ilustrasi 3D Candi Borobudur Interaktif 360 Derajat"
      className={`relative w-full h-[400px] sm:h-[480px] lg:h-[580px] select-none cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
    >
      {/* 360° Interactive Drag Prompt Overlay Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-900/80 border border-gold-400/40 text-gold-300 text-[11px] font-medium tracking-wide backdrop-blur-md shadow-lg animate-pulse">
        <Rotate3d className="w-3.5 h-3.5 text-gold-400" />
        <span>Putar 360° Bebas</span>
      </div>

      <Suspense fallback={<BorobudurFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, cameraY, cameraZ], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Background Fog matching charcoal-800 to melt into page */}
          <fog attach="fog" args={['#2A2623', 8, 24]} />

          {/* Golden Twilight Multi-Directional Lighting for 360 Visibility */}
          <ambientLight intensity={0.75} color="#C9A96E" />
          
          {/* Key Light from Top Front-Right */}
          <directionalLight position={[7, 9, 6]} intensity={1.6} color="#F5EEDF" castShadow />
          
          {/* Fill Light from Left */}
          <directionalLight position={[-7, 6, 4]} intensity={1.1} color="#E3CFA6" />
          
          {/* Rim Back Light from Rear for 360 depth */}
          <directionalLight position={[0, 8, -8]} intensity={1.3} color="#D6BC8A" />
          
          {/* Subtle warm ground bounce */}
          <pointLight position={[0, -2, 0]} intensity={0.4} color="#A8864F" />

          {/* 360-degree Orbit Controls */}
          <OrbitControls
            enableRotate={true}
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={0.75}
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.06}
            target={[0, 0.4, 0]}
            minPolarAngle={Math.PI / 4.8}
            maxPolarAngle={Math.PI / 2.15}
          />

          {/* Procedural 3D Borobudur Model with Ashlar Stone Bricks */}
          <BorobudurProcedural />
        </Canvas>
      </Suspense>
    </div>
  );
};
