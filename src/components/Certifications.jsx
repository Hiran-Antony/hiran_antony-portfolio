import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';

import certCloudLeader from '../assets/certificates/cert-google-cloud-leader.png';
import certRedHat from '../assets/certificates/cert-redhat-sysadmin.png';
import certHackSprint from '../assets/certificates/cert-google-hacksprint.png';
import certAiBootcamp from '../assets/certificates/cert-ai-bootcamp.jpeg';

const CERTS = [
  {
    image: certCloudLeader,
    title: "Cloud Digital Leader",
    issuer: "Google Cloud",
    date: "May 09, 2026",
    expires: "May 09, 2029",
    type: "Certification",
    featured: true,
    verifyUrl: "https://www.credly.com/badges/4a2d8b20-dc1e-4c48-8a27-d081d650e420"
  },
  {
    image: certRedHat,
    title: "Red Hat System Administration I",
    subtitle: "RH124 · RHA · Ver. 10 · 40 Credit Hours",
    issuer: "Red Hat",
    date: "March 30, 2026",
    type: "Attendance",
    verifyUrl: "https://www.credly.com/badges/4ff21322-a822-4b3f-8921-8ea8f577dd3a"
  },
  {
    image: certHackSprint,
    title: "Digital Campus 2.0 on Google Cloud",
    subtitle: "HackSprint · #G-K Hacks 2025",
    issuer: "Google Cloud × Karunya University",
    date: "2025",
    type: "Participation"
  },
  {
    image: certAiBootcamp,
    title: "3-Day AI Innovation Bootcamp",
    subtitle: "24-Hour Aurelion Hackathon",
    issuer: "Karunya University · IEEE · ACM",
    date: "Feb 26–28, 2026",
    type: "Participation",
    sponsors: "Eleven Labs × featherless.ai"
  }
];

function CertCard({ cert, index, setLightboxImg }) {
  let pillBg, pillColor, pillBorder = 'none';
  if (cert.type === 'Certification') {
    pillBg = '#C9A96E'; pillColor = '#3D2B1F';
  } else if (cert.type === 'Attendance') {
    pillBg = '#E85D26'; pillColor = '#FAF7F2';
  } else {
    pillBg = '#3D2B1F'; pillColor = '#C9A96E';
    pillBorder = '0.5px solid #C9A96E44';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay: index * 0.1 }}
      className={`cert-card ${cert.featured ? 'featured-cert' : ''}`}
    >
      {cert.featured && (
        <div style={{
          position: 'absolute', top: '24px', left: '24px', zIndex: 10,
          background: 'linear-gradient(to right, #C9A96E, #E8D5B0)', color: '#3D2B1F',
          padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem',
          fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
          boxShadow: '0 4px 12px rgba(201,169,110,0.3)'
        }}>
          ⭐ Featured
        </div>
      )}

      {/* Image Preview */}
      <div className="cert-image-wrap" onClick={() => setLightboxImg(cert.image)}>
        <img src={cert.image} alt={cert.title} />
        <div className="cert-image-overlay">
          <div style={{ background: 'rgba(10,7,4,0.7)', padding: '12px', borderRadius: '50%', display: 'flex' }}>
            <Maximize2 size={20} color="#FAF7F2" />
          </div>
        </div>
      </div>

      {/* Text details */}
      <div className="cert-text-wrap">
        <span className="cert-type-pill" style={{
          background: pillBg, color: pillColor, border: pillBorder
        }}>
          {cert.type}
        </span>
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-subtitle" style={{ color: 'rgba(232,213,176,0.6)', fontWeight: 600, fontSize: '13px' }}>
          {cert.issuer}
        </p>
        
        {(cert.subtitle || cert.sponsors) && (
          <p className="cert-subtitle">
            {cert.subtitle}
            {cert.sponsors && <><br/>{cert.sponsors}</>}
          </p>
        )}
        
        <div className="cert-date-wrap">
          <span className="cert-date">📅 {cert.date}</span>
          {cert.expires && <span className="cert-date" style={{ marginLeft: '10px' }}>Valid till: {cert.expires}</span>}
        </div>

        <div className="cert-buttons">
          <button className="btn-view" onClick={() => setLightboxImg(cert.image)}>
            View Full
          </button>
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn-verify">
              Verify <ExternalLink size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />
            </a>
          )}
        </div>
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
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    if (lightboxImg) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  return (
    <section id="certifications" className="certifications-section" style={{
      background: 'linear-gradient(180deg, #0A0704 0%, #1a0f08 50%, #0A0704 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleRain />

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div className="cert-section-header">
          <p className="section-label">06 — CERTIFICATIONS</p>
          <h2 className="section-title">
            Earned <span style={{color:"#E85D26"}}>Badges</span>
          </h2>
          <p className="section-subtitle">
            Verified credentials from global tech leaders
          </p>
        </div>

        <div className="certs-grid">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} setLightboxImg={setLightboxImg} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, 
              background: "rgba(0,0,0,0.92)",
              zIndex: 10000, display: "flex",
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)"
            }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
              src={lightboxImg}
              style={{
                maxWidth: "90vw", 
                maxHeight: "90vh",
                borderRadius: "12px",
                objectFit: "contain",
                border: "0.5px solid #C9A96E44",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)"
              }}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxImg(null)}
              style={{
                position: "absolute", top: "24px", right: "24px",
                background: "#C9A96E22", border: "0.5px solid #C9A96E",
                color: "#C9A96E", borderRadius: "50%",
                width: "40px", height: "40px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#C9A96E44'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A96E22'}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .certifications-section {
          padding: 100px 5%;
          min-height: 100vh;
        }

        .certifications-section .cert-section-header {
          text-align: center;
          margin-bottom: 60px;
          padding-top: 80px;
        }
        .certifications-section .section-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #C9A96E;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .certifications-section .section-title {
          font-family: var(--font-display);
          font-size: 52px;
          font-weight: 700;
          color: #FAF7F2;
          margin-bottom: 12px;
          line-height: 1.1;
        }
        .certifications-section .section-subtitle {
          font-family: var(--font-body);
          font-size: 14px;
          color: #C9A96E99;
          font-style: italic;
        }

        .certs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .certs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .certs-grid { grid-template-columns: 1fr; }
        }

        .cert-card {
          background: #2A1A0E;
          border-radius: 16px;
          padding: 24px;
          border: 0.5px solid #C9A96E22;
          transition: transform 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .cert-card:hover {
          transform: translateY(-6px);
          border-color: #C9A96E55;
        }

        .cert-card.featured-cert {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
          padding: 40px;
          margin-bottom: 32px;
          border-radius: 20px;
          background: #2A1A0E;
          border: 0.5px solid #C9A96E55;
          box-shadow: 0 0 40px #C9A96E12;
        }
        @media (max-width: 1024px) {
          .cert-card.featured-cert {
            grid-template-columns: 1fr;
            padding: 24px;
            gap: 24px;
          }
        }

        /* Featured card image */
        .featured-cert .cert-image-wrap {
          width: 100%;
          height: auto;
          min-height: 320px;
          border-radius: 12px;
          overflow: hidden;
          background: #FAF7F2;
          border: 0.5px solid #C9A96E22;
          display: flex;
          align-items: flex-start;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
          position: relative;
          cursor: pointer;
        }

        .featured-cert .cert-image-wrap img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: top;
          display: block;
          transition: transform 0.4s ease;
        }

        /* Regular cards image */
        .cert-card:not(.featured-cert) .cert-image-wrap {
          width: 100%;
          height: auto;
          min-height: 200px;
          border-radius: 10px;
          overflow: hidden;
          background: #FAF7F2;
          border: 0.5px solid #C9A96E22;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
          position: relative;
          cursor: pointer;
          margin-bottom: 16px;
          display: flex;
          align-items: flex-start;
        }

        .cert-card:not(.featured-cert) .cert-image-wrap img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: top;
          display: block;
          transition: transform 0.4s ease;
        }

        .cert-card:hover .cert-image-wrap img {
          transform: scale(1.04);
        }
        
        .cert-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 7, 4, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cert-image-wrap:hover .cert-image-overlay {
          opacity: 1;
        }

        .cert-text-wrap {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cert-type-pill {
          display: inline-block;
          align-self: flex-start;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .cert-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: #FAF7F2;
          margin: 16px 0 6px;
          line-height: 1.3;
        }

        .cert-subtitle {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #C9A96E99;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .cert-date-wrap {
          margin-bottom: 16px;
        }

        .cert-date {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #FAF7F2aa;
        }

        .cert-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .btn-view {
          font-family: var(--font-body);
          background: #3D2B1F;
          color: #C9A96E;
          border: 0.5px solid #C9A96E55;
          padding: 8px 18px;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-view:hover {
          background: #C9A96E;
          color: #3D2B1F;
        }

        .btn-verify {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          background: transparent;
          color: #C9A96E;
          border: 0.5px solid #C9A96E55;
          padding: 8px 18px;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .btn-verify:hover {
          border-color: #C9A96E;
        }
      `}</style>
    </section>
  );
}
