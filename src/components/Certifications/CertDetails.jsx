import React from 'react';

export default function CertDetails({ cert, isActive, isLeaving, totalCerts, onView }) {
  return (
    <div className={`cert-details ${isActive ? 'active' : ''} ${isLeaving ? 'leaving' : ''}`}>
      {/* Type pill */}
      <div className={`cert-detail-pill ${cert.type.toLowerCase()}`}>
        {cert.type}
      </div>

      {/* Title — big and bold */}
      <h2 className="cert-detail-title">
        {cert.title}
      </h2>

      {/* Issuer */}
      <p className="cert-detail-issuer">
        {cert.issuer}
      </p>

      {/* Divider line */}
      <div className="cert-detail-line" />

      {/* Meta info */}
      <div className="cert-detail-meta">
        <div className="cert-meta-item">
          <span className="meta-label">DATE</span>
          <span className="meta-value">{cert.date}</span>
        </div>
        {cert.expires && (
          <div className="cert-meta-item">
            <span className="meta-label">VALID TILL</span>
            <span className="meta-value">{cert.expires}</span>
          </div>
        )}
        {cert.subtitle && (
          <div className="cert-meta-item">
            <span className="meta-label">DETAILS</span>
            <span className="meta-value">{cert.subtitle}</span>
          </div>
        )}
      </div>

      {/* Special stats (Conesta Forge) */}
      {cert.score && (
        <div className="cert-detail-stats">
          <div className="cert-stat-block">
            <span className="stat-big">
              {cert.score.split(':')[1]?.trim() || cert.score.replace(/[^0-9,]/g, '')}
            </span>
            <span className="stat-small">Forge Score</span>
          </div>
          <div className="stat-divider" />
          <div className="cert-stat-block">
            <span className="stat-big purple">{cert.rank}</span>
            <span className="stat-small">Leaderboard</span>
          </div>
        </div>
      )}

      {/* Counter */}
      <div className="cert-counter">
        {cert.index + 1} / {totalCerts}
      </div>

      {/* Action buttons */}
      <div className="cert-detail-actions">
        <button 
          className="cert-btn-primary"
          onClick={() => onView(cert.image)}
        >
          View Certificate
        </button>
        {cert.verifyUrl && (
          <a 
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-btn-secondary"
          >
            Verify ↗
          </a>
        )}
      </div>
    </div>
  );
}
