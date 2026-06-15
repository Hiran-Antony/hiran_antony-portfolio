import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SolarSystem from '../three/SolarSystem';

const SKILL_CATEGORIES = [
  { name: 'Frontend',  color: '#E85D26', skills: ['HTML5','CSS3','JavaScript','Responsive Design'] },
  { name: 'Backend',   color: '#4A9EFF', skills: ['Python','MySQL','Supabase','PostgreSQL'] },
  { name: 'Systems',   color: '#A8E063', skills: ['C Programming','IoT','Embedded Systems'] },
  { name: 'DevOps',    color: '#C9A96E', skills: ['Git','GitHub','Vercel','CI/CD'] },
  { name: 'Security',  color: '#FF6B9D', skills: ['Kali Linux','OSINT','Network Security'] },
];

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2 }); // Trigger when 20% visible

  const [focusedIdx, setFocusedIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false); // start false

  // Auto-rotation system
  useEffect(() => {
    let timer1, timer2;
    
    if (isInView) {
      if (isFocused) {
        // Keep focused for 2.5s
        timer1 = setTimeout(() => {
          setIsFocused(false);
        }, 2500);
      } else {
        // 0.3s gap for crossfade before next planet activates
        timer2 = setTimeout(() => {
          setFocusedIdx(prev => (prev + 1) % SKILL_CATEGORIES.length);
          setIsFocused(true);
        }, 300);
      }
    } else {
      // Reset when scrolled out of view
      setIsFocused(false);
      setFocusedIdx(0); // Optional: restarts from Frontend when they scroll back
    }
    
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [isFocused, focusedIdx, isInView]);

  const handleManualSelect = (idx) => {
    setFocusedIdx(idx);
    setIsFocused(true);
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-wrap skills-section"
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 3D Solar System */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <SolarSystem 
          focusedIdx={focusedIdx} 
          isFocused={isFocused} 
          onManualSelect={handleManualSelect} 
        />
      </div>

      {/* Overlay content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
        <div className="reveal" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold)' }}>03 &mdash; Skills</p>
          <h2 className="section-title light">My Skill <span className="text-gradient">Universe</span></h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(232,213,176,0.65)',
            marginTop: '0.75rem',
            fontStyle: 'italic',
          }}>
            Watch the system rotate or click a category to explore
          </p>
        </div>
      </div>

      {/* Info Card Centered Below */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        width: '280px',
        height: '140px', // Prevents layout shift during crossfade
      }}>
        <AnimatePresence mode="wait">
          {isFocused && (
            <motion.div
              key={focusedIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                background: 'rgba(61,43,31,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201,169,110,0.25)',
                borderRadius: '16px',
                padding: '20px 24px',
                width: '100%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ 
                  width: 10, height: 10, borderRadius: '50%', 
                  background: SKILL_CATEGORIES[focusedIdx].color, 
                  boxShadow: `0 0 10px ${SKILL_CATEGORIES[focusedIdx].color}` 
                }} />
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '18px', fontWeight: 600, margin: 0 }}>
                  {SKILL_CATEGORIES[focusedIdx].name}
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SKILL_CATEGORIES[focusedIdx].skills.map(skill => (
                  <span key={skill} style={{
                    background: 'rgba(250,247,242,0.1)',
                    color: 'var(--cream)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend / Manual Selectors */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 12,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.75rem',
      }}>
        {SKILL_CATEGORIES.map((cat, i) => {
          const active = isFocused && focusedIdx === i;
          return (
            <div
              key={cat.name}
              onClick={() => handleManualSelect(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: active ? 'var(--gold)' : 'rgba(61,43,31,0.7)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${active ? 'var(--gold)' : cat.color + '40'}`,
                borderRadius: '999px',
                padding: '0.35rem 0.9rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: active ? 'var(--espresso)' : cat.color,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ 
                width: 8, height: 8, borderRadius: '50%', 
                background: active ? 'var(--espresso)' : cat.color,
                transition: 'all 0.3s ease',
              }} />
              {cat.name}
            </div>
          );
        })}
      </div>

      <style>{`
        .skills-section {
          position: relative;
          background-image: url('/src/assets/skills-nebula.jpeg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .skills-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(10, 5, 2, 0.52);
          z-index: 0;
        }
        .skills-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: rgba(10,5,2,0.95);
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
