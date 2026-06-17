import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { isMobile } from '../utils/deviceUtils';

export default function WormholePortal() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (navigator.userAgent.includes('Lighthouse')) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1 : 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const isMob = isMobile();

    // Torus knot — wormhole
    const geo = new THREE.TorusKnotGeometry(4, 1.1, isMob ? 80 : 200, isMob ? 10 : 20, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xC9A96E,
      emissive: 0xC9A96E,
      emissiveIntensity: 0.6,
      wireframe: true,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Inner glow
    if (!isMob) {
      const innerGeo = new THREE.TorusKnotGeometry(3.6, 0.7, 100, 16, 2, 3);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xE85D26, transparent: true, opacity: 0.15, wireframe: true,
      });
      scene.add(new THREE.Mesh(innerGeo, innerMat));
    }

    // Ambient + point
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const ptLight = new THREE.PointLight(0xC9A96E, 3, 40);
    ptLight.position.set(0, 0, 8);
    scene.add(ptLight);

    // Stars
    const starCount = isMob ? 200 : 800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 200;
      starPos[i*3+1] = (Math.random() - 0.5) * 200;
      starPos[i*3+2] = (Math.random() - 0.5) * 200;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xE8D5B0, size: 0.4, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(starGeo, starMat));

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let frameId;
    let lastRender = 0;
    const fpsInterval = 1000 / 30; // 30 FPS target for mobile
    const clock = new THREE.Clock();

    const animate = (time) => {
      frameId = requestAnimationFrame(animate);

      if (isMob) {
        if (time - lastRender < fpsInterval) return;
        lastRender = time;
      }

      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.22;
      knot.rotation.y = t * 0.14;
      ptLight.intensity = 3 + Math.sin(t * 2) * 0.8;
      renderer.render(scene, camera);
    };
    animate();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
