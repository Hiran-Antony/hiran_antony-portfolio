import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import BorderGlow from './ui/BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const EDU_ITEMS = [
  {
    year: '2025–Present',
    degree: 'B.Tech Computer Science & Engineering',
    school: 'Karunya Institute of Technology & Sciences',
    location: 'Coimbatore, Tamil Nadu',
    detail: 'Semester 2 SGPA: 8.29',
    icon: GraduationCap,
    color: '#C9A96E',
  },
  {
    year: '2025',
    degree: 'Higher Secondary — Class XII (CBSE)',
    school: 'Percentage: 70%',
    location: '',
    detail: 'Science stream with Computer Science',
    icon: BookOpen,
    color: '#E85D26',
  },
  {
    year: '2023',
    degree: 'Secondary School — Class X (CBSE)',
    school: 'Percentage: 78%',
    location: '',
    detail: 'Foundation in Mathematics & Science',
    icon: Award,
    color: '#A07C45',
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [...leftRefs.current, ...rightRefs.current].filter(Boolean);
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section-wrap" style={{ background: 'var(--cream)' }}>
      {/* Subtle dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.8,
        backgroundImage: 'radial-gradient(circle, #C9A96E 1.05px, transparent 1.05px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <p className="section-label">02 &mdash; Education</p>
          <h2 className="section-title">Academic <span className="text-gradient">Journey</span></h2>
        </div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          maxWidth: '760px',
          margin: '0 auto',
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0, bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, transparent, var(--gold), var(--ember), transparent)',
            opacity: 0.4,
          }} />

          {EDU_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 60px 1fr',
                  alignItems: 'center',
                  marginBottom: '3.5rem',
                  gap: '0',
                }}
                className="edu-timeline-row"
              >
                {/* Left content */}
                <div 
                  className="edu-col-left" 
                  ref={el => leftRefs.current[i] = el}
                  style={{ textAlign: 'right', paddingRight: '2rem' }}
                >
                  {isLeft ? (
                    <EduCard item={item} />
                  ) : (
                    <YearBadge year={item.year} color={item.color} align="right" />
                  )}
                </div>

                {/* Node */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  <div className="edu-node" style={{
                    width: '52px', height: '52px',
                    borderRadius: '50%',
                    background: 'var(--cream)',
                    border: `3px solid ${item.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 15px ${item.color}40`, // static shadow
                    position: 'relative',
                  }}>
                    {/* Hardware-accelerated pulse ring */}
                    <div style={{
                      position: 'absolute', inset: -2, borderRadius: '50%',
                      border: `2px solid ${item.color}`,
                      animation: 'nodePulse 2s ease-in-out infinite',
                      animationDelay: `${i * 0.7}s`,
                      pointerEvents: 'none',
                    }} />
                    <Icon size={20} color={item.color} style={{ position: 'relative', zIndex: 2 }} />
                  </div>
                </div>

                {/* Right content */}
                <div 
                  className="edu-col-right" 
                  ref={el => rightRefs.current[i] = el}
                  style={{ paddingLeft: '2rem' }}
                >
                  {isLeft ? (
                    <YearBadge year={item.year} color={item.color} align="left" />
                  ) : (
                    <EduCard item={item} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50%       { transform: scale(1.35); opacity: 0; }
        }
        .edu-col-left, .edu-col-right {
          will-change: transform, opacity;
        }
        .edu-card {
          contain: layout style paint;
          transition: transform 0.3s var(--ease-spring), box-shadow 0.3s;
        }
        .edu-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-gold);
        }
        @media (max-width: 768px) {
          .edu-timeline-row {
            grid-template-columns: 1fr 40px 1fr !important;
            margin-bottom: 2rem !important;
          }
          .edu-col-left {
            padding-right: 0.5rem !important;
          }
          .edu-col-right {
            padding-left: 0.5rem !important;
          }
          .edu-node {
            width: 36px !important;
            height: 36px !important;
          }
          .edu-node svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </section>
  );
}

function EduCard({ item }) {
  return (
      <div
        className="edu-card"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '1.5rem 1.75rem',
          borderRadius: '16px',
          textAlign: 'left',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          border: '1px solid rgba(201, 169, 110, 0.2)',
        }}
      >
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--espresso)',
          marginBottom: '0.35rem',
          lineHeight: 1.3,
        }}>
          {item.degree}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: item.color,
          fontWeight: 600,
          marginBottom: '0.2rem',
        }}>
          {item.school}
        </p>
        {item.location && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--espresso-mid)', marginBottom: '0.3rem' }}>
            {item.location}
          </p>
        )}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--espresso-light)',
          marginTop: '0.5rem',
        }}>
          {item.detail}
        </p>
      </div>
  );
}

function YearBadge({ year, color, align }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      background: color,
      color: '#FAF7F2',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      fontWeight: 600,
      padding: '0.4rem 0.9rem',
      borderRadius: 'var(--radius-full)',
      letterSpacing: '0.06em',
      boxShadow: `0 0 16px ${color}60`,
    }}>
      {year}
    </div>
  );
}
