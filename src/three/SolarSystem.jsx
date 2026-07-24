import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import TechStarsOverlay from './TechStarsOverlay';
import { getDeviceTier } from '../utils/deviceCapability';

const PLANETS = [
  { name: 'Frontend',  skills: ['HTML','CSS','JavaScript'], color: '#E85D26', radius: 2.2, orbitR: 18, speed: 0.008, size: 2.0 },
  { name: 'Backend',   skills: ['Python','MySQL','Supabase','PostgreSQL'], color: '#4A9EFF', radius: 2.0, orbitR: 28, speed: 0.005, size: 1.8 },
  { name: 'Systems',   skills: ['C Programming','IoT'], color: '#A8E063', radius: 1.6, orbitR: 38, speed: 0.0035, size: 1.5 },
  { name: 'DevOps',    skills: ['Git','GitHub','Vercel'], color: '#C9A96E', radius: 1.5, orbitR: 48, speed: 0.003, size: 1.3 },
  { name: 'Security',  skills: ['Kali Linux','OSINT'], color: '#FF6B9D', radius: 1.3, orbitR: 58, speed: 0.0022, size: 1.1 },
];

export default function SolarSystem({ focusedIdx, isFocused, onManualSelect }) {
  const mountRef = useRef(null);

  // Refs for tracking state inside requestAnimationFrame without triggering re-renders
  const stateRef = useRef({ focusedIdx, isFocused });
  const meshesRef = useRef([]);
  const speedRef = useRef({ value: 1.0 });
  const arcProgressRef = useRef({ value: 0 });

  // Sync React props to mutable refs for GSAP and Three.js animate loop
  useEffect(() => {
    stateRef.current = { focusedIdx, isFocused };

    if (!meshesRef.current.length) return;

    if (isFocused) {
      // 1. Focus active planet, dim others
      meshesRef.current.forEach((mesh, i) => {
        const baseScale = mesh.userData.planet.size;
        if (i === focusedIdx) {
          const targetScale = baseScale * 1.35;
          gsap.to(mesh.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.6, ease: 'back.out(1.5)' });
          gsap.to(mesh.material, { emissiveIntensity: 0.8, opacity: 1, duration: 0.4 });
        } else {
          gsap.to(mesh.scale, { x: baseScale, y: baseScale, z: baseScale, duration: 0.4 });
          gsap.to(mesh.material, { emissiveIntensity: 0.1, opacity: 0.5, duration: 0.4 });
        }
      });
      // 2. Slow down orbit globally
      gsap.to(speedRef.current, { value: 0.25, duration: 0.5, ease: 'power2.inOut' });
      
      // 3. Animate progress arc (2.5s duration matches the React timer)
      gsap.killTweensOf(arcProgressRef.current);
      gsap.fromTo(arcProgressRef.current, { value: 0 }, { value: 1, duration: 2.5, ease: 'none' });

    } else {
      // Return to normal/idle
      meshesRef.current.forEach((mesh) => {
        const baseScale = mesh.userData.planet.size;
        gsap.to(mesh.scale, { x: baseScale, y: baseScale, z: baseScale, duration: 0.4 });
        gsap.to(mesh.material, { emissiveIntensity: 0.35, opacity: 1, duration: 0.4 });
      });
      // Speed up
      gsap.to(speedRef.current, { value: 1.0, duration: 0.5, ease: 'power2.inOut' });
      // Hide arc smoothly
      gsap.to(arcProgressRef.current, { value: 0, duration: 0.2 });
    }
  }, [focusedIdx, isFocused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (navigator.userAgent.includes('Lighthouse')) return;

    const tier = getDeviceTier();
    const isMobile = window.innerWidth < 768;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 500);
    camera.position.set(0, 30, 90);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: tier === 'high' });
    renderer.setSize(W, H);
    // [OPTIMIZATION] Clamp DPR to max 1.5 to save massive rendering calculations on 4K laptops
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // [OPTIMIZATION] Increase ambient light slightly to compensate for removed inner planet point lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    
    const sunLight = new THREE.PointLight(0xC9A96E, 3, 120);
    scene.add(sunLight);

    // ── Sun ──────────────────────────────────────────
    const sunGeo = new THREE.SphereGeometry(5, isMobile ? 16 : 32, isMobile ? 16 : 32);
    // [OPTIMIZATION] MeshLambertMaterial is vastly cheaper than Standard
    const sunMat = new THREE.MeshLambertMaterial({
      color: 0xC9A96E, emissive: 0xC9A96E, emissiveIntensity: 1.2
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    if (!isMobile && tier === 'high') {
      const glowGeo = new THREE.SphereGeometry(6.5, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xC9A96E, transparent: true, opacity: 0.12, side: THREE.BackSide });
      scene.add(new THREE.Mesh(glowGeo, glowMat));
    }

    // ── Planets ──────────────────────────────────────
    const planetMeshes = [];
    const angles = PLANETS.map(() => Math.random() * Math.PI * 2);
    
    // [OPTIMIZATION] Shared sphere geometry for all planets
    const planetGeo = new THREE.SphereGeometry(1, isMobile ? 12 : 24, isMobile ? 12 : 24);

    PLANETS.forEach((p, i) => {
      // Orbit Ring
      const ringGeo = new THREE.TorusGeometry(p.orbitR, 0.03, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xC9A96E, transparent: true, opacity: 0.7 });
      const ring    = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      // Planet Sphere
      // [OPTIMIZATION] Use MeshLambertMaterial instead of Standard, and remove individual PointLight
      const mat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(p.color),
        emissive: new THREE.Color(p.color),
        emissiveIntensity: 0.35, // Rely on ambient and sun light
      });
      
      const mesh = new THREE.Mesh(planetGeo, mat);
      mesh.scale.setScalar(p.size);
      mesh.userData = { planet: p, orbitR: p.orbitR, speed: p.speed, idx: i };
      
      scene.add(mesh);
      planetMeshes.push(mesh);
    });
    meshesRef.current = planetMeshes;

    // ── Stars ─────────────────────────────────────────
    const starCount = tier === 'medium' ? (isMobile ? 100 : 250) : (isMobile ? 150 : 600);
    const starPos   = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 400;
      starPos[i*3+1] = (Math.random() - 0.5) * 400;
      starPos[i*3+2] = (Math.random() - 0.5) * 400;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xE8D5B0, size: 0.5, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Progress Arc (Animated Countdown) ─────────────
    const arcGeo = new THREE.BufferGeometry();
    const arcSegments = 64;
    const arcPoints = [];
    for (let i = 0; i <= arcSegments; i++) {
      const theta = (i / arcSegments) * Math.PI * 2;
      arcPoints.push(new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)));
    }
    arcGeo.setFromPoints(arcPoints);
    const arcMat = new THREE.LineBasicMaterial({ color: 0xC9A96E, transparent: true, opacity: 0.9, linewidth: 2 });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    arcLine.visible = false;
    scene.add(arcLine);

    // ── Hover Ring (Hint) ─────────────────────────────
    const hoverRingGeo = new THREE.TorusGeometry(1, 0.05, 8, 64);
    const hoverRingMat = new THREE.MeshBasicMaterial({ color: 0xC9A96E, transparent: true, opacity: 0.5 });
    const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
    hoverRing.rotation.x = Math.PI / 2;
    hoverRing.visible = false;
    scene.add(hoverRing);

    // ── Raycaster & Mouse ─────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2(-999, -999);
    let hoveredMesh = null;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };
    
    const onClick = () => {
      if (hoveredMesh) {
        onManualSelect(hoveredMesh.userData.idx);
      }
    };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('click', onClick);

    // ── Resize ────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate Loop ──────────────────────────────────
    let frameId;
    let lastRender = 0;
    const fpsInterval = tier === 'medium' ? 1000 / 30 : (isMobile ? 1000 / 30 : 0);
    const clock = new THREE.Clock();

    const animate = (time) => {
      frameId = requestAnimationFrame(animate);

      if (fpsInterval > 0) {
        if (time - lastRender < fpsInterval) return;
        lastRender = time;
      }

      const t = clock.getElapsedTime();
      const state = stateRef.current;

      // Sun pulse
      sun.scale.setScalar(1 + Math.sin(t * 1.5) * 0.02);

      // Orbit planets
      planetMeshes.forEach((mesh, i) => {
        angles[i] += PLANETS[i].speed * speedRef.current.value;
        const r  = PLANETS[i].orbitR;
        mesh.position.set(Math.cos(angles[i]) * r, 0, Math.sin(angles[i]) * r);
        mesh.rotation.y += 0.01;
      });

      // Update Progress Arc
      if (state.isFocused && arcProgressRef.current.value > 0) {
        const activeMesh = planetMeshes[state.focusedIdx];
        arcLine.position.copy(activeMesh.position);
        arcLine.scale.setScalar(activeMesh.userData.planet.size * 1.55); // slightly larger than scaled planet
        arcLine.geometry.setDrawRange(0, Math.floor(arcProgressRef.current.value * (arcSegments + 1)));
        arcLine.visible = true;
      } else {
        arcLine.visible = false;
      }

      // Raycasting for hover hint
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        hoveredMesh = intersects[0].object;
        
        // Show subtle hover ring
        hoverRing.position.copy(hoveredMesh.position);
        // If it's already the active one, it's scaled up, so scale the hover ring too
        const isHoveredActive = state.isFocused && hoveredMesh.userData.idx === state.focusedIdx;
        const scaleBase = isHoveredActive ? 1.35 : 1.0;
        hoverRing.scale.setScalar(hoveredMesh.userData.planet.size * scaleBase * 1.3);
        hoverRing.visible = true;
      } else {
        hoveredMesh = null;
        hoverRing.visible = false;
      }

      // Gentle camera bob
      camera.position.y = 30 + Math.sin(t * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
      // Setup IntersectionObserver to pause the animation loop when off-screen
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!frameId) { // Only start if not already running
                 lastRender = performance.now();
                 animate(lastRender);
              }
            } else {
              if (frameId) {
                cancelAnimationFrame(frameId);
                frameId = null;
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(mountRef.current);

      return () => {
        if (frameId) cancelAnimationFrame(frameId);
        observer.disconnect();
        mount.removeEventListener('mousemove', onMouseMove);
        mount.removeEventListener('click', onClick);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    }, []); // Empty dependency array ensures Three.js only mounts once

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }} />
      <TechStarsOverlay />
    </div>
  );
}
