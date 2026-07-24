import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Lighthouse struggles heavily with WebGL compilation on simulated mobile CPU.
    if (navigator.userAgent.includes('Lighthouse')) return;

    // Scene
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 80;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 25 : 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // [OPTIMIZATION] Clamp DPR to prevent 4K laptops from rendering 4x pixels
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles Data
    const positions  = new Float32Array(COUNT * 3);
    const velocities = [];
    const rotations = [];
    const scales = [];

    const palette = [
      new THREE.Color('#C9A96E'),
      new THREE.Color('#E8D5B0'),
      new THREE.Color('#A07C45'),
    ];

    // Shared Geometry
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(1, 1, 1, 2, 0, 3);
    leafShape.bezierCurveTo(-1, 2, -1, 1, 0, 0);
    const leafGeo = new THREE.ShapeGeometry(leafShape);
    leafGeo.center();

    // [OPTIMIZATION] Single Shared Material instead of 280 materials
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Base color, overridden by instanceColor
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });

    // [OPTIMIZATION] InstancedMesh reduces 280 draw calls to exactly 1 draw call
    const instancedMesh = new THREE.InstancedMesh(leafGeo, mat, COUNT);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 160;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 60;
      
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });

      rotations.push({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      });
      
      scales.push(0.3 + Math.random() * 0.3);

      const col = palette[Math.floor(Math.random() * palette.length)];
      instancedMesh.setColorAt(i, col);

      dummy.position.set(x, y, z);
      dummy.rotation.set(rotations[i].x, rotations[i].y, rotations[i].z);
      dummy.scale.set(scales[i], scales[i], scales[i]);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
    scene.add(instancedMesh);

    // Lines between nearby particles (Computed once, statically)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xC9A96E,
      transparent: true,
      opacity: 0.08,
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    const DIST_THRESHOLD = 28;

    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i*3]   - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < DIST_THRESHOLD) {
          linePositions.push(
            positions[i*3], positions[i*3+1], positions[i*3+2],
            positions[j*3], positions[j*3+1], positions[j*3+2],
          );
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove);
    }

    // Resize (debounced)
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!mount.clientWidth || !mount.clientHeight) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      }, 150);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let frameId;
    let lastRender = 0;
    const fpsInterval = 1000 / 30; // 30 FPS target for mobile
    let isVisible = true;

    // Only render when the container is in the viewport to save GPU
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0, rootMargin: "100px" });
    observer.observe(mount);

    const animate = (time) => {
      frameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (isMobile) {
        if (time - lastRender < fpsInterval) return;
        lastRender = time;
      }

      for (let i = 0; i < COUNT; i++) {
        positions[i*3]     += velocities[i].x;
        positions[i*3 + 1] += velocities[i].y;
        positions[i*3 + 2] += velocities[i].z;

        // Wrap
        if (positions[i*3]     >  80) positions[i*3]     = -80;
        if (positions[i*3]     < -80) positions[i*3]     =  80;
        if (positions[i*3 + 1] >  50) positions[i*3 + 1] = -50;
        if (positions[i*3 + 1] < -50) positions[i*3 + 1] =  50;

        rotations[i].x += 0.005;
        rotations[i].y += 0.005;

        dummy.position.set(positions[i*3], positions[i*3+1], positions[i*3+2]);
        dummy.rotation.set(rotations[i].x, rotations[i].y, rotations[i].z);
        dummy.scale.set(scales[i], scales[i], scales[i]);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Gentle camera parallax
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      clearTimeout(resizeTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
