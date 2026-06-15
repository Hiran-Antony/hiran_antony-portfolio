import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LINES = [
  { text: 'BIOS v2.0.1 — Hiran.dev System', delay: 0 },
  { text: 'Checking hardware integrity...', delay: 0.4 },
  { text: 'Loading creative modules...', delay: 0.9 },
  { text: 'Mounting project database...', delay: 1.4 },
  { text: 'Calibrating 3D render engine...', delay: 1.9 },
  { text: 'Applying premium aesthetics...', delay: 2.4 },
  { text: '> Boot complete. Welcome.', delay: 2.9, highlight: true },
];

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    // Show lines progressively
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay * 1000);
    });

    // Animate progress bar
    const start = Date.now();
    const duration = 3200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Fade out
    const timer = setTimeout(() => {
      gsap.to(wrapRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: onDone,
      });
    }, 3400);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: '#0A0704',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        padding: '2rem',
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 700,
          color: '#C9A96E',
          letterSpacing: '0.08em',
        }}>
          Hiran.dev
        </span>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          color: '#A07C45',
          letterSpacing: '0.15em',
          marginTop: '0.25rem',
        }}>
          SYSTEM BOOT SEQUENCE
        </p>
      </div>

      {/* Terminal lines */}
      <div style={{
        width: 'min(520px, 90vw)',
        background: 'rgba(61,43,31,0.4)',
        border: '1px solid rgba(201,169,110,0.2)',
        borderRadius: '12px',
        padding: '1.5rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
        minHeight: '200px',
      }}>
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              color: line.highlight ? '#C9A96E' : 'rgba(232,213,176,0.75)',
              marginBottom: '0.4rem',
              lineHeight: 1.5,
            }}
          >
            {line.highlight ? '' : '$ '}{line.text}
            {i === LINES.length - 1 && visibleLines.includes(i) && (
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '1em',
                background: '#C9A96E',
                marginLeft: '4px',
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'middle',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(520px, 90vw)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem',
          color: '#A07C45',
          marginBottom: '0.5rem',
        }}>
          <span>Initializing Hiran.dev...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{
          height: '4px',
          background: 'rgba(61,43,31,0.6)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #C9A96E, #E85D26)',
            borderRadius: '999px',
            transition: 'width 0.1s linear',
            boxShadow: '0 0 12px rgba(201,169,110,0.6)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity:1 } 50% { opacity:0 } }
      `}</style>
    </div>
  );
}
