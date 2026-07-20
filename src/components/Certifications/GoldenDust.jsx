import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceTier } from '../../context/PerformanceContext';

export default function GoldenDust() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tier = usePerformanceTier();

  const rainCount = tier === 'medium' ? (isMobile ? 50 : 150) : (isMobile ? 80 : 350);
  const moteCount = tier === 'medium' ? (isMobile ? 30 : 100) : (isMobile ? 60 : 250);

  // Layer 1 - Falling Golden Rain
  const rainPositions = useMemo(() => {
    const positions = new Float32Array(rainCount * 3);
    const speeds = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      positions[i*3] = (Math.random()-0.5) * 18;
      positions[i*3+1] = Math.random() * 12 - 2;
      positions[i*3+2] = (Math.random()-0.5) * 28 - 10;
      speeds[i] = 0.003 + Math.random() * 0.004;
    }
    return { positions, speeds };
  }, []);

  const rainRef = useRef();

  useFrame(() => {
    if (!rainRef.current) return;
    const positions = rainRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < rainCount; i++) {
      positions[i*3+1] -= rainPositions.speeds[i];
      // Slight horizontal sway
      positions[i*3] += Math.sin(Date.now() * 0.0002 + i) * 0.0015;
      
      // Reset to top when falls below view
      if (positions[i*3+1] < -6) {
        positions[i*3+1] = 6;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Layer 2 - Floating Fine Motes
  const motePositions = useMemo(() => {
    const positions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      positions[i*3] = (Math.random()-0.5) * 16;
      positions[i*3+1] = (Math.random()-0.5) * 9;
      positions[i*3+2] = (Math.random()-0.5) * 28 - 12;
    }
    return positions;
  }, []);

  const moteRef = useRef();

  useFrame((state) => {
    if (moteRef.current) {
      moteRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  // Layer 3 - Soft Bokeh Orbs
  const bokehTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const bokehPositionsBase = [
    [5, 2, -5], [-5, 1.5, -9], [4, -1.5, -13],
    [-4, 2, -17], [5, -0.5, -21]
  ];
  const bokehPositions = tier === 'medium' ? bokehPositionsBase.slice(0, 2) : (isMobile ? bokehPositionsBase.slice(0, 2) : bokehPositionsBase);

  const bokehRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    bokehRefs.current.forEach((sprite, i) => {
      if (sprite) {
        sprite.position.y += Math.sin(t * 0.2 + i) * 0.0006;
        sprite.material.opacity = 0.08 + Math.sin(t * 0.4 + i) * 0.04;
      }
    });
  });

  return (
    <>
      <points ref={rainRef} renderOrder={-1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rainCount}
            array={rainPositions.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#E8D4A0"
          size={0.018}
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
        />
      </points>

      <points ref={moteRef} renderOrder={-1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={moteCount}
            array={motePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#C9A96E"
          size={0.01}
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
        />
      </points>

      {bokehPositions.map((pos, i) => (
        <sprite 
          key={i} 
          position={pos} 
          scale={[2, 2, 2]}
          ref={(el) => (bokehRefs.current[i] = el)}
          renderOrder={-1}
        >
          <spriteMaterial
            map={bokehTexture}
            color="#C9A96E"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
          />
        </sprite>
      ))}
    </>
  );
}
