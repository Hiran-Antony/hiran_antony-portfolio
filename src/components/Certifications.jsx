import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { isMobile } from '../utils/deviceUtils';

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
  const typeClass = cert.type.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay: index * 0.1 }}
      className={`cert-card ${cert.featured ? 'featured' : ''}`}
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
        <img src={cert.image} loading="lazy" alt={cert.title} />
        <div className="cert-image-overlay">
          <div style={{ background: 'rgba(10,7,4,0.7)', padding: '12px', borderRadius: '50%', display: 'flex' }}>
            <Maximize2 size={20} color="#FAF7F2" />
          </div>
        </div>
      </div>

      {/* Text details */}
      <div className="cert-text-wrap">
        <span className={`cert-type-pill ${typeClass}`}>
          {cert.type}
        </span>
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">
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

export function ParticleRain({ count = 80 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left:     `${(i / count) * 100 + Math.sin(i) * 2}%`,
    size:     `${3 + (i % 4)}px`,
    duration: `${4 + (i % 5)}s`,
    delay:    `${(i * 0.1) % 6}s`,
    opacity:  0.4 + (i % 4) * 0.15,
  }));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex: 10 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:'absolute', top:'-20px', left:p.left,
          width:p.size, height:p.size,
          background:'#C9A96E', borderRadius:'50%',
          opacity:p.opacity,
          boxShadow:'0 0 10px rgba(201,169,110,0.8)',
          animation:`particleFall ${p.duration} linear infinite`,
          animationDelay:p.delay,
        }} />
      ))}
      <style>{`
        @keyframes particleFall {
          from { transform: translateY(-20px); opacity: 0.8; }
          to   { transform: translateY(100vh); opacity: 0; }
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
      {!isMobile() && <ParticleRain count={window.innerWidth < 1024 ? 20 : 50} />}

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div className="cert-section-header">
          <p className="section-label">06 — CERTIFICATIONS</p>
          <h2 className="section-title">
            Earned <span className="text-gradient">Badges</span>
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
            className="cert-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div 
              className="cert-lightbox-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={lightboxImg}
                style={{
                  maxWidth: "90vw", 
                  maxHeight: "90vh",
                  borderRadius: "12px",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </motion.div>
            <button
              className="cert-lightbox-close"
              onClick={() => setLightboxImg(null)}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .certifications-section {
            background: radial-gradient(ellipse at top, #C9A96E11 0%, transparent 60%), #0D0804 !important;
          }
        }
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
          .cert-card.featured .cert-image-wrap,
          .cert-card:not(.featured) .cert-image-wrap {
            min-height: auto !important;
          }
        }

        /* ═══════════════════════════════════════
           🃏 REGULAR CARDS
           ═══════════════════════════════════════ */
        .cert-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          
          border: 1px solid rgba(201, 169, 110, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.35),
            0 1px 0 rgba(255, 255, 255, 0.05) inset,
            0 0 0 1px rgba(201, 169, 110, 0.08);
          
          border-radius: 20px;
          padding: 20px;
          position: relative;
          overflow: hidden;
          
          transition: 
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
            
          display: flex;
          flex-direction: column;
        }

        .cert-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(201, 169, 110, 0.35);
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(201, 169, 110, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 30px rgba(201, 169, 110, 0.08);
          transform: translateY(-6px);
        }

        .cert-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
        }

        /* ═══════════════════════════════════════
           🃏 FEATURED CARD
           ═══════════════════════════════════════ */
        .cert-card.featured {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 32px;
          
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          
          border: 1px solid rgba(201, 169, 110, 0.25);
          border-top: 1px solid rgba(201, 169, 110, 0.4);
          border-left: 1px solid rgba(201, 169, 110, 0.4);
          
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(201, 169, 110, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 0 40px rgba(201, 169, 110, 0.03);
          
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .cert-card.featured::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(201, 169, 110, 0.6) 30%,
            rgba(232, 93, 38, 0.4) 50%,
            rgba(201, 169, 110, 0.6) 70%,
            transparent
          );
        }

        .cert-card.featured::after {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(201, 169, 110, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .cert-card.featured {
            grid-template-columns: 1fr;
            padding: 24px;
            gap: 24px;
          }
        }

        /* ═══════════════════════════════════════
           🖼️ CERTIFICATE IMAGE AREA
           ═══════════════════════════════════════ */
        .cert-card.featured .cert-image-wrap {
          width: 100%;
          height: auto;
          min-height: 320px;
          display: flex;
          align-items: flex-start;
          cursor: pointer;
        }
        .cert-card:not(.featured) .cert-image-wrap {
          width: 100%;
          height: auto;
          min-height: 130px;
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          cursor: pointer;
        }
        
        .cert-image-wrap {
          border-radius: 12px;
          overflow: hidden;
          
          /* Glass frame around image */
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          
          position: relative;
        }

        .cert-image-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          pointer-events: none;
        }

        .cert-image-wrap img {
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
          z-index: 5;
        }
        .cert-image-wrap:hover .cert-image-overlay {
          opacity: 1;
        }

        .cert-text-wrap {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* ═══════════════════════════════════════
           💊 TYPE PILLS — GLASS VERSION
           ═══════════════════════════════════════ */
        .cert-type-pill {
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          display: inline-block;
          align-self: flex-start;
          margin-bottom: 16px;
        }
        .cert-type-pill.certification {
          background: rgba(201, 169, 110, 0.15);
          border: 1px solid rgba(201, 169, 110, 0.4);
          color: #C9A96E;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .cert-type-pill.attendance {
          background: rgba(232, 93, 38, 0.15);
          border: 1px solid rgba(232, 93, 38, 0.4);
          color: #E85D26;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .cert-type-pill.participation {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(250, 247, 242, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* ═══════════════════════════════════════
           📝 TEXT COLORS INSIDE GLASS CARDS
           ═══════════════════════════════════════ */
        .cert-title {
          color: #FAF7F2;
          font-size: 18px;
          font-weight: 700;
          text-shadow: 0 1px 4px rgba(0,0,0,0.3);
          font-family: var(--font-display);
          margin: 16px 0 6px;
          line-height: 1.3;
        }
        .cert-issuer {
          color: rgba(201, 169, 110, 0.9);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .cert-subtitle {
          color: rgba(250, 247, 242, 0.5);
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 8px;
          line-height: 1.5;
        }
        .cert-date-wrap {
          margin-bottom: 16px;
        }
        .cert-date {
          color: rgba(250, 247, 242, 0.6);
          font-size: 12px;
          font-family: var(--font-mono);
        }

        .cert-buttons {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        /* ═══════════════════════════════════════
           🔘 BUTTONS — GLASS VERSION
           ═══════════════════════════════════════ */
        .btn-view {
          background: rgba(201, 169, 110, 0.12);
          border: 1px solid rgba(201, 169, 110, 0.3);
          color: #C9A96E;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 8px 18px;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }
        .btn-view:hover {
          background: rgba(201, 169, 110, 0.25);
          border-color: rgba(201, 169, 110, 0.6);
          box-shadow: 0 0 16px rgba(201, 169, 110, 0.2);
        }

        .btn-verify {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(250, 247, 242, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 8px 18px;
          border-radius: 40px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-body);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .btn-verify:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          color: #FAF7F2;
        }

        /* ═══════════════════════════════════════
           ✨ LIGHTBOX — GLASS VERSION
           ═══════════════════════════════════════ */
        .cert-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(13, 8, 4, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .cert-lightbox-content {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 169, 110, 0.25);
          border-radius: 20px;
          padding: 8px;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.1);
          cursor: default;
        }

        .cert-lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #FAF7F2;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          backdrop-filter: blur(8px);
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .cert-lightbox-close:hover {
          background: rgba(201,169,110,0.2);
          border-color: rgba(201,169,110,0.4);
        }

        /* ═══════════════════════════════════════
           📱 MOBILE GLASS OPTIMIZATION
           ═══════════════════════════════════════ */
        @media (max-width: 768px) {
          .cert-card {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          .cert-card.featured {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </section>
  );
}
