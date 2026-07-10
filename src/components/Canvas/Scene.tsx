import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const count = 4000;

  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const color1 = new THREE.Color("#8BE9FD"); // Cyan
    const color2 = new THREE.Color("#FF79C6"); // Magenta

    for (let i = 0; i < count; i++) {
      // Create a long flowing ribbon/cloud
      const x = (Math.random() - 0.5) * 40; 
      const y = (Math.random() - 0.5) * 20; 
      const z = (Math.random() - 0.5) * 15; 

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      // Interpolate color based on x position
      const mixedColor = color1.clone().lerp(color2, (x + 20) / 40);
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return { positions: pos, originalPositions: origPos, colors: cols };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !groupRef.current) return;

    // 1. Particle Physics & Mouse Interaction
    const time = state.clock.elapsedTime;
    const posAttribute = particlesRef.current.geometry.attributes.position;
    const currentPositions = posAttribute.array as Float32Array;
    
    // Convert normalized device coordinates (state.pointer) to roughly world space
    const mouseX = state.pointer.x * 15; 
    const mouseY = state.pointer.y * 10;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      // Base wave movement
      let targetX = ox + Math.sin(time * 0.5 + oy * 0.5) * 1.5;
      let targetY = oy + Math.cos(time * 0.3 + ox * 0.5) * 1.5;
      let targetZ = oz + Math.sin(time * 0.4 + ox * 0.3 + oy * 0.3) * 2.0;

      // Mouse repulsion
      const dx = currentPositions[ix] - mouseX;
      const dy = currentPositions[iy] - mouseY;
      const distSq = dx * dx + dy * dy;
      const repelRadiusSq = 60; // Increased radius for wider reaction
      
      if (distSq < repelRadiusSq) {
        const force = (repelRadiusSq - distSq) / repelRadiusSq;
        // push outwards from mouse with increased multiplier
        const length = Math.sqrt(distSq) || 0.1;
        targetX += (dx / length) * force * 10;
        targetY += (dy / length) * force * 10;
        targetZ += force * 15; // Bulge towards camera much more
      }

      // Spring physics (lerp towards target)
      currentPositions[ix] += (targetX - currentPositions[ix]) * 0.1;
      currentPositions[iy] += (targetY - currentPositions[iy]) * 0.1;
      currentPositions[iz] += (targetZ - currentPositions[iz]) * 0.1;
    }
    
    posAttribute.needsUpdate = true;

    // 2. Global Scene Rotation based on Scroll
    const scrollY = window.scrollY;
    
    // Lerp values slightly for buttery smooth camera lag
    const targetY = scrollY * 0.03;
    const targetZ = scrollY * 0.015;
    
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.1;
    
    groupRef.current.rotation.y = (scrollY * 0.001) + (time * 0.05);
    groupRef.current.rotation.x = (scrollY * 0.0005) + (Math.PI * 0.1);
    groupRef.current.position.x = Math.sin(time * 0.2) * 1.5;
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const Scene = () => {
  return (
    <>
      <div className="aurora-bg"></div>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true, antialias: true }}>
          <Environment preset="city" />
          <InteractiveParticles />
        </Canvas>
      </div>
    </>
  );
};
