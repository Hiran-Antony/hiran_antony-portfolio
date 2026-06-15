import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function WormholePortal() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Torus knot — wormhole
    const geo = new THREE.TorusKnotGeometry(4, 1.1, 200, 20, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xC9A96E,
      emissive: 0xC9A96E,
      emissiveIntensity: 0.6,
      wireframe: true,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Inner glow
    const innerGeo = new THREE.TorusKnotGeometry(3.6, 0.7, 150, 16, 2, 3);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xE85D26, transparent: true, opacity: 0.15, wireframe: true,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    // Ambient + point
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const ptLight = new THREE.PointLight(0xC9A96E, 3, 40);
    ptLight.position.set(0, 0, 8);
    scene.add(ptLight);

    // Stars
    const starPos = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
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
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.22;
      knot.rotation.y = t * 0.14;
      ptLight.intensity = 3 + Math.sin(t * 2) * 0.8;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
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
