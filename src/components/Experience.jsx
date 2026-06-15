import { Briefcase, Clock } from 'lucide-react';

const EXP_PLACEHOLDERS = [
  { role: 'Freelance Web Developer', company: 'Self-employed', period: '2024 – Present', desc: 'Designed and deployed production websites for real clients including robertrajiah.in, handling end-to-end development, deployment on Vercel, and client communication.', tags: ['HTML','CSS','JavaScript','Vercel'], current: true },
  { role: 'Internship Opportunity', company: 'Open to offers', period: 'Seeking 2025', desc: 'Actively seeking internships in web development and software engineering. Available for remote or on-site opportunities.', tags: ['React','Node.js','Python'], current: false, placeholder: true },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-wrap"
      style={{
        background: 'var(--espresso)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Code rain overlay */}
      <CodeRain />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold)' }}>05 &mdash; Experience</p>
          <h2 className="section-title light">Work <span className="text-gradient">Timeline</span></h2>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {EXP_PLACEHOLDERS.map((exp, i) => (
            <div
              key={i}
              className="reveal exp-card"
              style={{
                background: 'rgba(250,247,242,0.05)',
                border: `1px solid ${exp.placeholder ? 'rgba(201,169,110,0.15)' : 'rgba(201,169,110,0.3)'}`,
                borderLeft: `3px solid ${exp.placeholder ? 'rgba(201,169,110,0.3)' : 'var(--gold)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 2.5rem',
                position: 'relative',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.3s var(--ease-spring), box-shadow 0.3s',
                opacity: exp.placeholder ? 0.6 : 1,
              }}
            >
              {exp.current && (
                <div style={{
                  position: 'absolute',
                  top: '1.5rem', right: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#4CAF50',
                  background: 'rgba(76,175,80,0.12)',
                  border: '1px solid rgba(76,175,80,0.3)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.6rem',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block', animation: 'pulseDot 1.5s ease-in-out infinite' }} />
                  Active
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'rgba(201,169,110,0.15)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {exp.placeholder ? <Clock size={18} color="var(--gold)" /> : <Briefcase size={18} color="var(--gold)" />}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: exp.placeholder ? 'rgba(232,213,176,0.5)' : 'var(--cream)',
                    marginBottom: '0.2rem',
                  }}>
                    {exp.role}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 600 }}>
                      {exp.company}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(232,213,176,0.45)',
                    }}>
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                color: 'rgba(232,213,176,0.65)',
                lineHeight: 1.75,
                marginBottom: '1.2rem',
              }}>
                {exp.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--gold)',
                    background: 'rgba(201,169,110,0.1)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    borderRadius: '4px',
                    padding: '0.18rem 0.5rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(201,169,110,0.1);
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform: scale(1); }
          50%     { opacity:0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}

/* Simple CSS code-rain canvas */
function CodeRain() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      opacity: 0.06,
      pointerEvents: 'none',
      zIndex: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: '#C9A96E',
      display: 'flex',
      gap: '28px',
    }}>
      {Array.from({ length: 20 }).map((_, col) => (
        <div
          key={col}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            animation: `rainFall ${3 + col * 0.3}s linear infinite`,
            animationDelay: `${col * 0.15}s`,
          }}
        >
          {Array.from({ length: 30 }).map((_, row) => (
            <span key={row}>
              {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
            </span>
          ))}
        </div>
      ))}
      <style>{`
        @keyframes rainFall {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
