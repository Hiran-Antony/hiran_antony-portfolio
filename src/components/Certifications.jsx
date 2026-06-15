import { motion } from 'framer-motion';
import { CheckCircle, Award, Shield, Code2, Globe } from 'lucide-react';

const CERTS = [
  { title: 'Web Development Fundamentals', issuer: 'To be added', date: '2025', icon: Globe,   color: '#C9A96E' },
  { title: 'Python Programming',           issuer: 'To be added', date: '2025', icon: Code2,   color: '#E85D26' },
  { title: 'Cybersecurity Awareness',      issuer: 'To be added', date: '2025', icon: Shield,  color: '#A07C45' },
  { title: 'AI & Machine Learning Basics', issuer: 'To be added', date: '2025', icon: Award,   color: '#E8D5B0' },
];

function CertCard({ cert, index }) {
  const Icon = cert.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      style={{ perspective: '800px' }}
    >
      <div
        className="cert-card"
        style={{
          position: 'relative',
          background: 'rgba(61,43,31,0.55)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${cert.color}35`,
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 1.75rem',
          textAlign: 'center',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* Shine overlay */}
        <div className="cert-shine" />

        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: `${cert.color}18`,
          border: `2px solid ${cert.color}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.2rem',
          boxShadow: `0 0 20px ${cert.color}30`,
        }}>
          <Icon size={26} color={cert.color} />
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem', fontWeight: 700,
          color: 'var(--cream)', marginBottom: '0.4rem', lineHeight: 1.3,
        }}>
          {cert.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: cert.color, marginBottom: '0.4rem', opacity: 0.85 }}>
          {cert.issuer}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(232,213,176,0.4)', marginBottom: '1.25rem' }}>
          {cert.date}
        </p>

        {/* Animated SVG checkmark */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.35rem', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'#4CAF50' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="1.5" opacity="0.4"/>
            <path d="M7.5 12l3 3 6-6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-path"/>
          </svg>
          Verified
        </div>

        <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'rgba(201,169,110,0.3)', marginTop:'0.75rem' }}>
          // Add certificate details later
        </p>
      </div>
    </motion.div>
  );
}

function ParticleRain() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left:     `${(i / 24) * 100 + Math.sin(i) * 4}%`,
    size:     `${2 + (i % 3)}px`,
    duration: `${5 + (i % 5)}s`,
    delay:    `${(i * 0.25) % 6}s`,
    opacity:  0.12 + (i % 4) * 0.06,
  }));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:'absolute', top:'-10px', left:p.left,
          width:p.size, height:p.size,
          background:'var(--gold)', borderRadius:'50%',
          opacity:p.opacity,
          boxShadow:'0 0 6px rgba(201,169,110,0.4)',
          animation:`particleFall ${p.duration} linear infinite`,
          animationDelay:p.delay,
        }} />
      ))}
      <style>{`
        @keyframes particleFall {
          from { transform: translateY(-20px); opacity: 0.3; }
          to   { transform: translateY(100vh);  opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-wrap" style={{
      background: 'linear-gradient(180deg, #0A0704 0%, #1a0f08 50%, #0A0704 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleRain />

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div className="reveal" style={{ marginBottom:'4rem', textAlign:'center' }}>
          <p className="section-label" style={{ color:'var(--gold)' }}>06 &mdash; Certifications</p>
          <h2 className="section-title light">Earned <span className="text-gradient">Badges</span></h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'rgba(232,213,176,0.5)', marginTop:'0.75rem', fontStyle:'italic' }}>
            Certificates will be added as they are earned
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap:'1.5rem',
        }}>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .cert-card { transition: box-shadow 0.35s, border-color 0.35s; }
        .cert-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(201,169,110,0.15);
          border-color: rgba(201,169,110,0.4) !important;
        }
        .cert-card:hover .cert-shine { left: 100%; }
        .cert-shine {
          position: absolute; top:0; left:-80%;
          width:60%; height:100%;
          background: linear-gradient(100deg, transparent, rgba(201,169,110,0.12), transparent);
          transform: skewX(-15deg);
          transition: left 0.6s var(--ease-out);
          pointer-events: none;
        }
        .check-path {
          stroke-dasharray: 20; stroke-dashoffset: 20;
          animation: drawCheck 0.5s ease 0.3s forwards;
        }
        @keyframes drawCheck { to { stroke-dashoffset: 0; } }
      `}</style>
    </section>
  );
}
