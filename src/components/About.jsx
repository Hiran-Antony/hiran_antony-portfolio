import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Cpu, Shield, Phone, Mail, GraduationCap, MapPin } from 'lucide-react';
import hiranImg from '../assets/hiran.jpeg';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: Users,  value: 2,      suffix: '+', label: 'Client Websites Deployed' },
  { icon: Award,  value: 8.05,   suffix: '',  label: 'Semester CGPA' },
  { icon: Cpu,    value: 2,      suffix: '+', label: 'Technical Hackathons' },
  { icon: Shield, value: 'Cyber',suffix: '',  label: 'Security Awareness' },
];

const BIO_LINES = [
  "Hey, I'm Hiran Antony R — a second-year B.Tech CSE student at Karunya Institute of Technology & Sciences, Coimbatore.",
  "I build production-grade, responsive websites for real clients, combining clean code with premium design sensibilities.",
  "Passionate about tackling real-world problems by building practical IoT systems, smart automations, and hardware integrations.",
  "Currently exploring advanced Web Development, IoT architecture, and Cybersecurity fundamentals.",
  "Actively seeking internships in web development and software engineering."
];

function AnimatedCounter({ target, suffix, duration = 1.8 }) {
  const ref  = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    if (typeof target !== 'number') return;
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(numRef, {
          duration,
          ease: 'power2.out',
          onUpdate() {
            if (ref.current) {
              const prog = this.progress();
              ref.current.textContent = (target * prog).toFixed(target % 1 !== 0 ? 2 : 0) + suffix;
            }
          }
        });
      }
    });
  }, [target, suffix, duration]);

  return <span ref={ref}>{typeof target === 'number' ? '0' + suffix : target + suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const linesRef   = useRef([]);
  const photoRef   = useRef(null);

  useEffect(() => {
    // Terminal type-in per line
    const lines = linesRef.current.filter(Boolean);
    lines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
          delay: i * 0.08,
        }
      );
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-wrap" style={{ background: 'var(--linen)' }}>
      <div className="container">
        {/* Heading */}
        <div className="reveal" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label">01 &mdash; About Me</p>
          <h2 className="section-title">The person behind<br /><span className="text-gradient">the code</span></h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
          gap: '4rem',
          alignItems: 'start',
        }}
          className="about-grid"
        >
          {/* LEFT — Photo + shimmer */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              ref={photoRef}
              className="photo-shimmer"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '4/5',
                background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 50%, var(--espresso) 100%)',
                boxShadow: 'var(--shadow-espresso)',
              }}
            >
              <img
                src={hiranImg}
                alt="Hiran Antony R"
                loading="lazy"
                width="600"
                height="800"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Shimmer sweep */}
              <div className="shimmer-overlay" />
            </div>

            {/* Contact quick-info */}
            <div className="glass" style={{ padding: '1.25rem 1.5rem' }}>
              {[
                [Phone, '+91 9360276068'],
                [Mail, 'hiranantony@karunya.edu.in'],
                [GraduationCap, 'Karunya Institute of Technology & Sciences'],
                [MapPin, 'Coimbatore, India'],
              ].map(([Icon, text]) => (
                <div key={text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.45rem 0',
                  borderBottom: '1px solid rgba(201,169,110,0.12)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--espresso-mid)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', background: 'rgba(201,169,110,0.1)', borderRadius: '6px' }}>
                    <Icon size={14} color="var(--gold)" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Bio + stats */}
          <div>
            {/* Terminal bio */}
            <div
              className="reveal glass"
              style={{
                padding: '2rem',
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.78rem, 1.3vw, 0.9rem)',
                lineHeight: 1.85,
                color: 'var(--espresso-mid)',
                position: 'relative',
              }}
            >
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                marginBottom: '1rem',
              }}>
                {['#E85D26','#C9A96E','#A07C45'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              {BIO_LINES.map((line, i) => (
                <div
                  key={i}
                  ref={el => linesRef.current[i] = el}
                  style={{ minHeight: line === '' ? '0.8rem' : 'auto', opacity: 0 }}
                >
                  {line && <><span style={{ color: 'var(--gold)', marginRight: '0.5rem' }}>›</span>{line}</>}
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}>
              {STATS.map(({ icon: Icon, value, suffix, label }) => (
                <div
                  key={label}
                  className="reveal glass stat-card"
                  style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}
                >
                  <Icon size={22} color="var(--gold)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    color: 'var(--espresso)',
                    lineHeight: 1.1,
                    marginBottom: '0.3rem',
                  }}>
                    <AnimatedCounter target={value} suffix={suffix} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: 'var(--espresso-mid)',
                    lineHeight: 1.3,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { 
            grid-template-columns: 1fr !important; 
            gap: 2rem !important;
          }
        }

        .photo-shimmer:hover .shimmer-overlay {
          opacity: 1;
        }
        .shimmer-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 25%, rgba(201,169,110,0.18) 50%, transparent 75%);
          background-size: 200% 100%;
          animation: shimmerMove 2s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        @keyframes shimmerMove {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        .stat-card { transition: transform 0.25s var(--ease-spring), box-shadow 0.25s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-gold); }
      `}</style>
    </section>
  );
}
