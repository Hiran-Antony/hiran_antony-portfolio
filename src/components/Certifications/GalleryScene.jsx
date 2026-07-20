import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import CertFrame from './CertFrame';
import GalleryLights from './GalleryLights';
import GoldenDust from './GoldenDust';
import { cameraFocusPoints } from './certData';

const totalCerts = 5;

export default function GalleryScene({
  scrollProgressRef,
  certificates,
  onCertClick,
  onActiveCertChange,
  mouseXRef,
  activeCert,
}) {
  const { camera } = useThree();
  const lastReportedRef = useRef(-1);

  useFrame(() => {
    const p = scrollProgressRef.current ?? 0;
    const certIndex = p * (totalCerts - 1);
    const currentCert = Math.floor(certIndex);
    const nextCert = Math.min(currentCert + 1, totalCerts - 1);
    
    const t = certIndex - currentCert;
    // Use a continuous smooth easing curve instead of hard-stopping
    const smoothT = gsap.parseEase('power2.inOut')(t);

    camera.position.x = THREE.MathUtils.lerp(
      cameraFocusPoints[currentCert].cam[0],
      cameraFocusPoints[nextCert].cam[0],
      smoothT
    );
    camera.position.y = THREE.MathUtils.lerp(
      cameraFocusPoints[currentCert].cam[1],
      cameraFocusPoints[nextCert].cam[1],
      smoothT
    );
    camera.position.z = THREE.MathUtils.lerp(
      cameraFocusPoints[currentCert].cam[2],
      cameraFocusPoints[nextCert].cam[2],
      smoothT
    );

    const lookAtCurrent = cameraFocusPoints[currentCert].lookAt;
    const lookAtNext = cameraFocusPoints[nextCert].lookAt;
      
    camera.lookAt(
      THREE.MathUtils.lerp(lookAtCurrent[0], lookAtNext[0], smoothT),
      THREE.MathUtils.lerp(lookAtCurrent[1], lookAtNext[1], smoothT),
      THREE.MathUtils.lerp(lookAtCurrent[2], lookAtNext[2], smoothT)
    );

    const closestCert = Math.round(certIndex);
    const distToClosest = Math.abs(certIndex - closestCert);
    const active = distToClosest < 0.2 ? closestCert : null;

    if (lastReportedRef.current !== active) {
      lastReportedRef.current = active;
      onActiveCertChange(active);
    }
  });

  return (
    <>
      <GalleryLights activeCert={activeCert} />
      <GoldenDust />
      <fog attach="fog" args={['#050818', 8, 25]} />

      {certificates.map((cert, i) => {
        const [x, y, z] = cameraFocusPoints[i].pos;

        return (
          <CertFrame
            key={cert.title}
            cert={cert}
            index={i}
            position={[x, y, z]}
            baseRotationY={0}
            mouseXRef={mouseXRef}
            onViewFull={onCertClick}
            isActive={activeCert === i}
          />
        );
      })}
    </>
  );
}
