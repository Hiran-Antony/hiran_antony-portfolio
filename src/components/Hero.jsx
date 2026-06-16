import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ParticleField from '../three/ParticleField';
import { Mail, ArrowDown, Eye } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

const ROLES = ['Full Stack Developer', 'Web Designer', 'Creative Technologist'];
const NAME   = 'Hiran Antony R';

export default function Hero({ introComplete }) {
  const lettersRef   = useRef([]);
  const roleRef      = useRef(null);
  const bioRef       = useRef(null);
  const ctaRef       = useRef(null);
  const arrowRef     = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);

  // Initial Entry Animations
  useEffect(() => {
    if (!introComplete) return;
    const letters = lettersRef.current.filter(Boolean);
    gsap.fromTo(
      letters,
      { opacity: 0, y: -60, rotateX: -90 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.7,
        stagger: 0.055,
        ease: 'back.out(1.7)',
        delay: 0.3,
      }
    );

    // Bio + CTA fade-in
    gsap.fromTo(
      [bioRef.current, ctaRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 1.6, stagger: 0.15 }
    );

    // Arrow bounce
    gsap.to(arrowRef.current, {
      y: 12, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut',
    });
  }, [introComplete]);

  // Role switcher
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(roleRef.current, {
        opacity: 0, y: -18, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          setRoleIdx(i => (i + 1) % ROLES.length);
          gsap.fromTo(roleRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0,  duration: 0.45, ease: 'power2.out' }
          );
        }
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E8DC 50%, #FAF7F2 100%)',
        overflow: 'hidden',
      }}
    >
      <ParticleField />

      {/* Content */}
      <div
        className="container hero-content-wrapper"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '7rem',
          paddingBottom: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="hero-text-content" style={{ position: 'relative', zIndex: 3, flex: '1.2', marginTop: '-120px' }}>
        {/* Mono label */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          letterSpacing: '0.18em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '1.2rem',
          opacity: 0,
          animation: 'fadeInUp 0.6s 0.1s forwards',
        }}>
          Portfolio 2026 · Open to Internships
        </p>

        {/* Name */}
        <h1 className="hero-name">
          {NAME.split('').map((char, i) => (
            <span
              key={i}
              ref={el => lettersRef.current[i] = el}
              style={{
                display: 'inline-block',
                opacity: 0,
                color: char === 'H' || char === 'A' ? 'var(--gold)' : 'var(--espresso)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Role switcher */}
        <div style={{
          height: '2.6rem',
          marginBottom: '1.8rem',
          overflow: 'hidden',
        }}>
          <p
            ref={roleRef}
            className="hero-role"
          >
            {ROLES[roleIdx]}
          </p>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="hero-subtitle"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'var(--espresso-mid)',
            maxWidth: '560px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            opacity: 0,
            animation: 'fadeInUp 0.6s 0.3s forwards',
          }}
        >
          Second-year B.Tech CSE student at Karunya Institute | Shipping
          real-world client websites and exploring ambitious ideas
          through code, design, and 3D.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            opacity: 0,
          }}
        >
          <button
            className="btn-gold"
            onClick={() => scrollToSection('#projects')}
          >
            <Eye size={16} /> View My Work
          </button>
          <button
            className="btn-outline"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail size={16} /> Contact Me
          </button>
        </div>
        </div>

        <div className="hero-image-wrapper">
          <img src={avatarImg} alt="Hiran Antony R" className="hero-image-img" />
        </div>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>SCROLL</span>
        <ArrowDown size={20} color="var(--gold)" />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-name {
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--espresso);
          margin-bottom: 1.2rem;
          display: flex;
          flex-wrap: wrap;
          perspective: 600px;
          gap: 0 0.05em;
          letter-spacing: -0.02em;
          font-size: 72px;
          line-height: 1.1;
          width: 100%;
          max-width: 100%;
        }
        @media (max-width: 1279px) {
          .hero-name {
            font-size: 64px;
            max-width: 100%;
          }
        }
        @media (max-width: 1023px) {
          .hero-name {
            font-size: 48px;
            line-height: 1.15;
            max-width: 100%;
          }
        }
        @media (max-width: 767px) {
          .hero-name {
            font-size: 36px;
            line-height: 1.2;
            max-width: 100%;
          }
        }
        .hero-role {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--ember);
          font-size: 28px;
        }
        @media (max-width: 767px) {
          .hero-role {
            font-size: 22px;
          }
        }
        .hero-image-wrapper {
          flex: 0.8;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          z-index: 1;
          margin-top: -180px;
        }
        .hero-image-img {
          width: 100%;
          max-width: 520px;
          height: auto;
          transform: scale(1.1);
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          opacity: 0;
          animation: fadeInUp 1s 0.4s forwards;
        }
        
        @media (max-width: 1023px) {
          .hero-content-wrapper {
            flex-direction: column;
            justify-content: center;
          }
          .hero-text-content {
            flex: none;
            width: 100%;
          }
          .hero-image-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            justify-content: center;
            opacity: 0.25;
            pointer-events: none;
          }
          .hero-image-img {
            max-width: 120%;
            min-width: 600px;
            mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
            -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
          }
        }
      `}</style>
    </section>
  );
}
