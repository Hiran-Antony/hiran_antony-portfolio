import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

const CERT_WIDTH = 2.4;
const CERT_HEIGHT = 1.6;
const FRAME_DEPTH = 0.08;
const FRAME_BORDER = 0.12;

export default function CertFrame({
  cert,
  index,
  position,
  baseRotationY,
  mouseXRef,
  onViewFull,
  isActive,
}) {
  const groupRef = useRef();
  const glowRef = useRef();
  const borderRef = useRef();
  const { camera } = useThree();
  const texture = useTexture(cert.image);
  const revealedRef = useRef(false);
  const targetScale = useRef(1);
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useEffect(() => {
    if (!revealedRef.current && groupRef.current) {
      revealedRef.current = true;
      gsap.from(groupRef.current.position, {
        z: position[2] - 2,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, [position]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t + index) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.5 + index) * 0.008;

    const targetRotY = baseRotationY + (mouseXRef?.current ?? 0) * 0.05;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05,
    );

    // Scale up when active
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, isActive ? 1.05 : 1.0, 0.05)
    );

    // Glow intensity
    if (glowRef.current) {
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isActive ? 0.2 : 0,
        0.05
      );
    }

    // Frame border emissive
    if (borderRef.current) {
      borderRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        borderRef.current.material.emissiveIntensity,
        isActive ? 0.4 : 0.1,
        0.05
      );
    }
  });

  const glowW = CERT_WIDTH + 0.3;
  const glowH = CERT_HEIGHT + 0.3;

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[glowW, glowH]} />
        <meshBasicMaterial
          color="#c9a96e"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={borderRef} position={[0, 0, -FRAME_DEPTH / 2]}>
        <boxGeometry
          args={[
            CERT_WIDTH + FRAME_BORDER * 2,
            CERT_HEIGHT + FRAME_BORDER * 2,
            FRAME_DEPTH,
          ]}
        />
        <meshStandardMaterial
          color="#c9a96e"
          metalness={0.9}
          roughness={0.1}
          emissive="#c9a96e"
          emissiveIntensity={0}
        />
      </mesh>

      <mesh 
        position={[0, 0, 0.01]} 
        onClick={() => onViewFull(cert.image)}
      >
        <planeGeometry args={[CERT_WIDTH, CERT_HEIGHT]} />
        <meshStandardMaterial map={texture} roughness={0.3} metalness={0} />
      </mesh>

      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[CERT_WIDTH, CERT_HEIGHT]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.3}
          roughness={0.05}
          thickness={0.5}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

    </group>
  );
}
