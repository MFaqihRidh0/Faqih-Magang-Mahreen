import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BorobudurProceduralProps {
  mouseParallax?: { x: number; y: number };
}

// Procedural Stone Brick Diffuse Texture Generator
function createStoneTexture(repeatX = 8, repeatY = 4) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Base background stone color (Champagne Gold undertone)
  ctx.fillStyle = '#A8864F';
  ctx.fillRect(0, 0, 512, 512);

  const rows = 16;
  const rowHeight = 512 / rows;
  const brickWidth = 64;

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    const isOdd = r % 2 === 1;
    const offset = isOdd ? brickWidth / 2 : 0;

    for (let x = -brickWidth; x < 512 + brickWidth; x += brickWidth) {
      // Natural variation per stone block (tone differences between cut stones)
      const seed = Math.sin(r * 19.3 + x * 7.1) * 0.5 + 0.5;
      const rVal = Math.floor(185 + seed * 35); // 185 - 220
      const gVal = Math.floor(150 + seed * 30); // 150 - 180
      const bVal = Math.floor(95 + seed * 25);  // 95 - 120

      // Stone block fill
      ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
      ctx.fillRect(x + offset + 2, y + 2, brickWidth - 4, rowHeight - 4);

      // Subtle chiseled stone stipple texture
      for (let n = 0; n < 25; n++) {
        const nx = x + offset + Math.random() * (brickWidth - 4);
        const ny = y + Math.random() * (rowHeight - 4);
        const isLight = Math.random() > 0.5;
        ctx.fillStyle = isLight ? 'rgba(245, 238, 223, 0.25)' : 'rgba(23, 20, 18, 0.25)';
        ctx.fillRect(nx, ny, 2, 2);
      }
    }

    // Mortar joint (horizontal recessed groove)
    ctx.strokeStyle = '#1F1B19';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();

    // Top highlight rim on each stone course
    ctx.strokeStyle = 'rgba(245, 238, 223, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y + 2);
    ctx.lineTo(512, y + 2);
    ctx.stroke();
  }

  // Vertical mortar joints
  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    const isOdd = r % 2 === 1;
    const offset = isOdd ? brickWidth / 2 : 0;
    for (let x = -brickWidth; x < 512 + brickWidth; x += brickWidth) {
      ctx.strokeStyle = '#1F1B19';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + offset, y);
      ctx.lineTo(x + offset, y + rowHeight);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  return texture;
}

// Procedural Stone Brick Bump / Normal Map Generator
function createStoneBumpMap(repeatX = 8, repeatY = 4) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Medium grey background (neutral height)
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  const rows = 16;
  const rowHeight = 512 / rows;
  const brickWidth = 64;

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    const isOdd = r % 2 === 1;
    const offset = isOdd ? brickWidth / 2 : 0;

    for (let x = -brickWidth; x < 512 + brickWidth; x += brickWidth) {
      // Raised pillow block face
      const grad = ctx.createLinearGradient(x + offset, y, x + offset, y + rowHeight);
      grad.addColorStop(0, '#e5e5e5');
      grad.addColorStop(0.3, '#bfbfbf');
      grad.addColorStop(0.8, '#a6a6a6');
      grad.addColorStop(1, '#858585');
      ctx.fillStyle = grad;
      ctx.fillRect(x + offset + 2, y + 2, brickWidth - 4, rowHeight - 4);

      // Deep recessed vertical joint
      ctx.fillStyle = '#101010';
      ctx.fillRect(x + offset, y, 3.5, rowHeight);
    }

    // Deep recessed horizontal joint
    ctx.fillStyle = '#101010';
    ctx.fillRect(0, y, 512, 3.5);
  }

  // Micro-chiseling pitting
  for (let i = 0; i < 1800; i++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#222222';
    ctx.fillRect(px, py, 2, 2);
  }

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(repeatX, repeatY);
  return bumpMap;
}

// Procedural Diamond Lattice Texture for 72 Stupas (Stupa Berterawang)
function createStupaLatticeTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#B39156';
  ctx.fillRect(0, 0, 256, 256);

  const cols = 8;
  const rows = 8;
  const w = 256 / cols;
  const h = 256 / rows;

  // Diamond (belah ketupat) perforations
  for (let r = 0; r < rows; r++) {
    const yCenter = r * h + h / 2;
    const isOdd = r % 2 === 1;
    const xOffset = isOdd ? w / 2 : 0;

    for (let c = -1; c <= cols + 1; c++) {
      const xCenter = c * w + xOffset;

      // Dark hole / shadow inside
      ctx.fillStyle = '#171412';
      ctx.beginPath();
      ctx.moveTo(xCenter, yCenter - h * 0.38);
      ctx.lineTo(xCenter + w * 0.38, yCenter);
      ctx.lineTo(xCenter, yCenter + h * 0.38);
      ctx.lineTo(xCenter - w * 0.38, yCenter);
      ctx.closePath();
      ctx.fill();

      // Golden inner statue glow inside the lattice hole
      ctx.fillStyle = '#E3CFA6';
      ctx.beginPath();
      ctx.arc(xCenter, yCenter, w * 0.12, 0, Math.PI * 2);
      ctx.fill();

      // Stone border around hole
      ctx.strokeStyle = '#68502B';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  return texture;
}

export const BorobudurProcedural: React.FC<BorobudurProceduralProps> = ({ mouseParallax = { x: 0, y: 0 } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const instancedStupasRef = useRef<THREE.InstancedMesh>(null);

  // Generate procedural textures
  const stoneDiffuse = useMemo(() => createStoneTexture(10, 3), []);
  const stoneBump = useMemo(() => createStoneBumpMap(10, 3), []);
  const stupaTexture = useMemo(() => createStupaLatticeTexture(), []);

  // Textured Temple Material with Ashlar Stone Bricks & Chiseled Reliefs
  const templeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D6BC8A'),
        map: stoneDiffuse || undefined,
        bumpMap: stoneBump || undefined,
        bumpScale: 0.28,
        roughness: 0.72,
        metalness: 0.28,
      }),
    [stoneDiffuse, stoneBump]
  );

  // Cornice / Ledge accent material (darker carved stone moldings)
  const corniceMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C9A96E'),
        bumpMap: stoneBump || undefined,
        bumpScale: 0.35,
        roughness: 0.65,
        metalness: 0.35,
      }),
    [stoneBump]
  );

  // Stupa Material (Diamond Lattice Perforated Andesite Stone)
  const stupaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E3CFA6'),
        map: stupaTexture || undefined,
        bumpMap: stoneBump || undefined,
        bumpScale: 0.25,
        roughness: 0.55,
        metalness: 0.35,
      }),
    [stupaTexture, stoneBump]
  );

  // Main Stupa Pinnacle Material
  const mainStupaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F5EEDF'),
        map: stoneDiffuse || undefined,
        bumpMap: stoneBump || undefined,
        bumpScale: 0.22,
        roughness: 0.5,
        metalness: 0.45,
      }),
    [stoneDiffuse, stoneBump]
  );

  // 6 Square Terraces (Kamadhatu to Rupadhatu) with architectural stepped cornices
  const squareTerraces = useMemo(() => {
    const list = [];
    const baseSizes = [14.2, 12.6, 11.2, 9.8, 8.5, 7.3];
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
    const radii = [3.05, 2.35, 1.65];
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
  const stupaCount = 32 + 24 + 16;
  const stupaPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    const counts = [32, 24, 16];
    const radii = [2.7, 2.0, 1.38];
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

  // Pelita Lanterns (Fireflies)
  const pelitaParticles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 3.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0.5 + Math.random() * 3.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  // Frame animation: continuous gentle rotation & subtle parallax
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;

      const targetRotX = (mouseParallax.y * Math.PI) / 36;
      const targetRotZ = -(mouseParallax.x * Math.PI) / 45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + 0.35, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 6 Square Base Terraces with Stepped Cornice Moldings & Balustrades */}
      {squareTerraces.map((terrace, idx) => (
        <group key={`sq-terrace-grp-${idx}`} position={[0, terrace.y + terrace.height / 2, 0]}>
          {/* Main Stone Brick Terrace Body */}
          <mesh material={templeMaterial}>
            <boxGeometry args={[terrace.size, terrace.height, terrace.size]} />
          </mesh>

          {/* Stepped Upper Cornice (Pelipit Atas yang menonjol) */}
          <mesh position={[0, terrace.height / 2 + 0.04, 0]} material={corniceMaterial}>
            <boxGeometry args={[terrace.size + 0.22, 0.08, terrace.size + 0.22]} />
          </mesh>

          {/* Stepped Lower Plinth (Pelipit Bawah) */}
          <mesh position={[0, -terrace.height / 2 + 0.04, 0]} material={corniceMaterial}>
            <boxGeometry args={[terrace.size + 0.16, 0.08, terrace.size + 0.16]} />
          </mesh>

          {/* Corner Miniature Stupas on Parapet (Stupa Sudut Khas Borobudur) */}
          {idx > 0 &&
            [-1, 1].map((cx) =>
              [-1, 1].map((cz) => {
                const cornerOffset = (terrace.size / 2) - 0.25;
                return (
                  <group
                    key={`corner-stupa-${idx}-${cx}-${cz}`}
                    position={[cx * cornerOffset, terrace.height / 2 + 0.15, cz * cornerOffset]}
                  >
                    <mesh material={corniceMaterial}>
                      <cylinderGeometry args={[0.06, 0.12, 0.22, 8]} />
                    </mesh>
                    <mesh position={[0, 0.16, 0]} material={corniceMaterial}>
                      <cylinderGeometry args={[0.015, 0.04, 0.12, 8]} />
                    </mesh>
                  </group>
                );
              })
            )}
        </group>
      ))}

      {/* 4 Cardinal Staircases with Carved Gate Arches (Gapura Makara) */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rotY, i) => (
        <group key={`stair-${i}`} rotation={[0, rotY, 0]}>
          {/* Stepped Stairway Slope */}
          <mesh position={[0, 0.18, 5.6]} material={templeMaterial}>
            <boxGeometry args={[1.3, 2.4, 3.6]} />
          </mesh>
          {/* Stair Side Parapets */}
          <mesh position={[-0.72, 0.35, 5.6]} material={corniceMaterial}>
            <boxGeometry args={[0.18, 2.7, 3.6]} />
          </mesh>
          <mesh position={[0.72, 0.35, 5.6]} material={corniceMaterial}>
            <boxGeometry args={[0.18, 2.7, 3.6]} />
          </mesh>
          {/* Gate Arch Header at Top of Stair */}
          <mesh position={[0, 1.85, 3.9]} material={corniceMaterial}>
            <boxGeometry args={[1.5, 0.3, 0.4]} />
          </mesh>
        </group>
      ))}

      {/* 3 Circular Upper Terraces with Carved Plinth Rings */}
      {circularTerraces.map((terrace, idx) => (
        <group key={`circ-terrace-grp-${idx}`} position={[0, terrace.y, 0]}>
          {/* Main Circular Terrace Cylinder */}
          <mesh material={templeMaterial}>
            <cylinderGeometry args={[terrace.radius, terrace.radius + 0.15, terrace.height, 48]} />
          </mesh>
          {/* Upper Ring Cornice */}
          <mesh position={[0, terrace.height / 2 + 0.02, 0]} material={corniceMaterial}>
            <cylinderGeometry args={[terrace.radius + 0.08, terrace.radius + 0.08, 0.05, 48]} />
          </mesh>
          {/* Lower Ring Plinth */}
          <mesh position={[0, -terrace.height / 2 + 0.02, 0]} material={corniceMaterial}>
            <cylinderGeometry args={[terrace.radius + 0.18, terrace.radius + 0.18, 0.05, 48]} />
          </mesh>
        </group>
      ))}

      {/* 72 Stupas via InstancedMesh with Perforated Diamond Lattice Texture */}
      <instancedMesh
        ref={instancedStupasRef}
        args={[undefined, undefined, stupaCount]}
        material={stupaMaterial}
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
        {/* Bell-shaped stupa geometry */}
        <cylinderGeometry args={[0.09, 0.24, 0.42, 14]} />
      </instancedMesh>

      {/* Spire Pin on each of the 72 Stupas */}
      {stupaPositions.map((pos, index) => (
        <mesh key={`stupa-spire-${index}`} position={[pos.x, pos.y + 0.28, pos.z]} material={corniceMaterial}>
          <cylinderGeometry args={[0.015, 0.045, 0.18, 8]} />
        </mesh>
      ))}

      {/* Puncak: Stupa Induk (Main Central Stupa) with Padmasana Lotus Cushion & Harmika */}
      <group position={[0, circularTerraces[2].y + 0.5, 0]}>
        {/* Padmasana / Lotus Cushion Base Ring */}
        <mesh position={[0, 0, 0]} material={corniceMaterial}>
          <cylinderGeometry args={[1.05, 1.15, 0.18, 36]} />
        </mesh>
        <mesh position={[0, 0.12, 0]} material={corniceMaterial}>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 36]} />
        </mesh>

        {/* Main Bell Body with Ashlar Stone Bricks */}
        <mesh position={[0, 0.6, 0]} material={mainStupaMaterial}>
          <cylinderGeometry args={[0.32, 0.95, 0.9, 32]} />
        </mesh>

        {/* Stupa Dome Hemisphere */}
        <mesh position={[0, 1.05, 0]} material={mainStupaMaterial}>
          <sphereGeometry args={[0.52, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>

        {/* Harmika (Square/Octagonal Collar atop the Dome) */}
        <mesh position={[0, 1.58, 0]} material={corniceMaterial}>
          <boxGeometry args={[0.32, 0.18, 0.32]} />
        </mesh>

        {/* Chatra Umbrella Rings (Pinnacle Discs) */}
        <mesh position={[0, 1.74, 0]} material={corniceMaterial}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 20]} />
        </mesh>
        <mesh position={[0, 1.84, 0]} material={corniceMaterial}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 20]} />
        </mesh>
        <mesh position={[0, 1.94, 0]} material={corniceMaterial}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 20]} />
        </mesh>

        {/* Yashti Pinnacle Spire Tip */}
        <mesh position={[0, 2.15, 0]} material={mainStupaMaterial}>
          <cylinderGeometry args={[0.02, 0.07, 0.45, 16]} />
        </mesh>
        <mesh position={[0, 2.4, 0]} material={mainStupaMaterial}>
          <sphereGeometry args={[0.065, 16, 16]} />
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
          size={0.065}
          color={new THREE.Color('#E3CFA6')}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
