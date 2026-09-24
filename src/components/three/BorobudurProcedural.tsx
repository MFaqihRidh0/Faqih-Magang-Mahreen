import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BorobudurProceduralProps {
  mouseParallax?: { x: number; y: number };
}

export const BorobudurProcedural: React.FC<BorobudurProceduralProps> = ({ mouseParallax = { x: 0, y: 0 } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const instancedStupasRef = useRef<THREE.InstancedMesh>(null);

  // Brand Palette Materials
  const templeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C9A96E'),
        metalness: 0.6,
        roughness: 0.45,
      }),
    []
  );

  const mainStupaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D6BC8A'),
        metalness: 0.7,
        roughness: 0.35,
      }),
    []
  );

  // 6 Square Terraces (Kamadhatu to Rupadhatu)
  const squareTerraces = useMemo(() => {
    const list = [];
    const baseSizes = [14, 12.5, 11, 9.6, 8.4, 7.2];
    const height = 0.55;
    for (let i = 0; i < baseSizes.length; i++) {
      list.push({
        size: baseSizes[i],
        y: i * height - 1.5,
        height,
      });
    }
    return list;
  }, []);

  // 3 Circular Terraces (Arupadhatu)
  const circularTerraces = useMemo(() => {
    const list = [];
    const radii = [3.0, 2.3, 1.6];
    const height = 0.45;
    const startY = squareTerraces.length * 0.55 - 1.5;
    for (let i = 0; i < radii.length; i++) {
      list.push({
        radius: radii[i],
        y: startY + i * height + height / 2,
        height,
      });
    }
    return list;
  }, [squareTerraces]);

  // 72 Stupas (32 on row 0, 24 on row 1, 16 on row 2)
  const stupaCount = 32 + 24 + 16; // 72
  const stupaPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    const counts = [32, 24, 16];
    const radii = [2.7, 2.0, 1.4];
    const startY = squareTerraces.length * 0.55 - 1.5;

    counts.forEach((count, rowIndex) => {
      const radius = radii[rowIndex];
      const y = startY + rowIndex * 0.45 + 0.55;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        positions.push({ x, y, z });
      }
    });

    return positions;
  }, [squareTerraces]);

  // Set up InstancedMesh transforms for 72 stupas
  useMemo(() => {
    if (!instancedStupasRef.current) return;
    const tempMatrix = new THREE.Matrix4();
    stupaPositions.forEach((pos, index) => {
      tempMatrix.makeTranslation(pos.x, pos.y, pos.z);
      instancedStupasRef.current?.setMatrixAt(index, tempMatrix);
    });
    instancedStupasRef.current.instanceMatrix.needsUpdate = true;
  }, [stupaPositions]);

  // Gentle Pelita Lantern points (Stars / Fireflies)
  const pelitaParticles = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 3.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0.5 + Math.random() * 3.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  // Frame animation: continuous gentle rotation & subtle parallax
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;

      // Parallax easing
      const targetRotX = (mouseParallax.y * Math.PI) / 36; // max ~5 deg
      const targetRotZ = -(mouseParallax.x * Math.PI) / 45; // max ~4 deg
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + 0.35, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 6 Square Base Terraces */}
      {squareTerraces.map((terrace, idx) => (
        <mesh
          key={`sq-terrace-${idx}`}
          position={[0, terrace.y + terrace.height / 2, 0]}
          material={templeMaterial}
        >
          <boxGeometry args={[terrace.size, terrace.height, terrace.size]} />
        </mesh>
      ))}

      {/* 4 Cardinal Staircases */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rotY, i) => (
        <group key={`stair-${i}`} rotation={[0, rotY, 0]}>
          <mesh position={[0, 0.2, 5.5]} material={mainStupaMaterial}>
            <boxGeometry args={[1.2, 2.5, 3.5]} />
          </mesh>
        </group>
      ))}

      {/* 3 Circular Upper Terraces */}
      {circularTerraces.map((terrace, idx) => (
        <mesh
          key={`circ-terrace-${idx}`}
          position={[0, terrace.y, 0]}
          material={templeMaterial}
        >
          <cylinderGeometry args={[terrace.radius, terrace.radius + 0.15, terrace.height, 32]} />
        </mesh>
      ))}

      {/* 72 Stupas via InstancedMesh for zero lag */}
      <instancedMesh
        ref={instancedStupasRef}
        args={[undefined, undefined, stupaCount]}
        material={mainStupaMaterial}
        castShadow
        onUpdate={(self) => {
          const tempMatrix = new THREE.Matrix4();
          stupaPositions.forEach((pos, index) => {
            tempMatrix.makeTranslation(pos.x, pos.y, pos.z);
            self.setMatrixAt(index, tempMatrix);
          });
          self.instanceMatrix.needsUpdate = true;
        }}
      >
        {/* Low-poly bell-shaped stupa geometry */}
        <cylinderGeometry args={[0.08, 0.22, 0.38, 8]} />
      </instancedMesh>

      {/* Puncak: Stupa Induk (Main Central Stupa) */}
      <group position={[0, circularTerraces[2].y + 0.7, 0]}>
        {/* Main Bell Body */}
        <mesh material={mainStupaMaterial}>
          <cylinderGeometry args={[0.3, 0.9, 0.85, 24]} />
        </mesh>
        {/* Stupa Dome */}
        <mesh position={[0, 0.45, 0]} material={mainStupaMaterial}>
          <sphereGeometry args={[0.48, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
        {/* Pinnacle Spire (Yashti / Chatra) */}
        <mesh position={[0, 0.95, 0]} material={mainStupaMaterial}>
          <cylinderGeometry args={[0.03, 0.09, 0.8, 12]} />
        </mesh>
        <mesh position={[0, 1.38, 0]} material={mainStupaMaterial}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>
      </group>

      {/* Warm Golden Pelita Fireflies */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pelitaParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={new THREE.Color('#E3CFA6')}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
