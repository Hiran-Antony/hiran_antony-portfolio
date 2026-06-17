import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader          from './components/Loader';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Education       from './components/Education';
import Skills          from './components/Skills';
import Projects        from './components/Projects';
import Experience      from './components/Experience';
import Certifications  from './components/Certifications';
import Contact         from './components/Contact';

import useCursor           from './hooks/useCursor';
import useScrollAnimation  from './hooks/useScrollAnimation';
import ScrollMouse         from './components/ScrollMouse';

gsap.registerPlugin(ScrollTrigger);

// ── Scroll Trigger for Confetti ──────────────────────────────
function ConfettiBurst() {
  const colors = ['#C9A96E','#E85D26','#E8D5B0','#3D2B1F','#A07C45','#FAF7F2'];
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    width:  `${6 + Math.random() * 8}px`,
    height: `${10 + Math.random() * 14}px`,
    delay: `${Math.random() * 0.6}s`,
    duration: `${1.2 + Math.random() * 1.5}s`,
    rotate: `${Math.random() * 720}deg`,
  }));
  return (
    <div style={{ position:'fixed', inset:0, zIndex:999999, pointerEvents:'none', overflow:'hidden' }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:'absolute', top:'-20px', left:p.left,
          width:p.width, height:p.height,
          background:p.color, borderRadius:'2px',
          animation:`confettiFall ${p.duration} ease-in forwards`,
          animationDelay:p.delay,
          transform:`rotate(${p.rotate})`,
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);    opacity:1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const progressRef = useRef(null);
  const lenisRef    = useRef(null);

  // Custom cursor
  useCursor();

  // Scroll animations (runs after load)
  useScrollAnimation();

  // Trigger confetti when reaching Certifications section
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#certifications',
      start: 'top 50%',
      onEnter: () => {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      },
      once: true
    });
    return () => trigger.kill();
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (!introComplete) return;
    let lenis;
    const initLenis = () => {
      lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    if (document.readyState === 'complete') {
      initLenis();
    } else {
      window.addEventListener('load', initLenis);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(time => lenis.raf(time * 1000));
      }
      window.removeEventListener('load', initLenis);
    };
  }, [introComplete]);

  return (
    <>
      {/* Custom cursor elements */}
      <div className="cursor-dot"  />
      <div className="cursor-ring" />

      {/* Custom wired mouse progress indicator */}
      <ScrollMouse />

      {/* Loader plays first */}
      {!introComplete && (
        <Loader onComplete={() => setIntroComplete(true)} />
      )}

      {/* Konami confetti */}
      {confetti && <ConfettiBurst />}

      {/* Portfolio always rendered underneath, instantly ready when loader finishes */}
      <div style={{ 
        opacity: introComplete ? 1 : 0,
        transition: "opacity 0.5s ease",
        visibility: introComplete ? 'visible' : 'hidden'
      }}>
        <Navbar hidden={!introComplete} />
        <main>
          <Hero introComplete={introComplete} />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
        </main>

        {/* Floating Resume Button */}
        <a
          href="/resume.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            background: "#3D2B1F",
            color: "#FAF7F2",
            border: "0.5px solid #C9A96E",
            padding: "10px 22px",
            borderRadius: "40px",
            fontSize: "13px",
            fontWeight: "500",
            textDecoration: "none",
            zIndex: 999,
            boxShadow: "0 4px 20px rgba(61,43,31,0.25)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#C9A96E";
            e.currentTarget.style.color = "#3D2B1F";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#3D2B1F";
            e.currentTarget.style.color = "#C9A96E";
          }}
        >
          ↓ Resume
        </a>
      </div>
    </>
  );
}
