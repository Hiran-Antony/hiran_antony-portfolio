import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function MobileCertCard({ cert, index, onView }) {
  const typeClass = cert.type.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`mobile-cert-card ${cert.featured ? 'featured' : ''}`}
    >
      {cert.featured && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            background: 'linear-gradient(to right, #C9A96E, #E8D5B0)',
            color: '#3D2B1F',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '0.7rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          ⭐ Featured
        </div>
      )}

      <div className="mobile-cert-image-wrap" onClick={() => onView(cert.image)}>
        <img src={cert.image} loading="lazy" alt={cert.title} />
      </div>

      <span className={`mobile-cert-type-pill ${typeClass}`}>{cert.type}</span>
      <h3 className="mobile-cert-title">{cert.title}</h3>
      <p className="mobile-cert-issuer">{cert.issuer}</p>
      {cert.subtitle && (
        <p className="mobile-cert-issuer" style={{ fontSize: '12px', opacity: 0.7 }}>
          {cert.subtitle}
        </p>
      )}
      <p className="mobile-cert-date">📅 {cert.date}</p>

      <div className="mobile-cert-buttons">
        <button type="button" onClick={() => onView(cert.image)}>
          View Full
        </button>
        {cert.verifyUrl && (
          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
            Verify <ExternalLink size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function MobileCertGrid({ certs, onView }) {
  return (
    <div className="mobile-certs-grid">
      {certs.map((cert, i) => (
        <MobileCertCard key={cert.title} cert={cert} index={i} onView={onView} />
      ))}
    </div>
  );
}
