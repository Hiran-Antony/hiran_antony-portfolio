import { useEffect, useState } from 'react';
import loadImg from '../assets/load.webp';

export default function Loader({ onComplete }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); 
    }, 1500); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'var(--cream)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <img 
        src={loadImg} 
        alt="Loading Background" 
        style={{ 
          opacity: 0.4,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }} 
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {/* HA Logo */}
        <div style={{
          background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%)',
          color: '#3D2B1F',
          width: '50px',
          height: '50px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '-0.02em',
          boxShadow: '0 0 20px rgba(201,169,110,0.6)'
        }}>
          HA
        </div>

        {/* Portfolio Text */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--espresso)',
          fontWeight: 600,
          fontSize: '1.5rem',
          letterSpacing: '0.05em',
          margin: 0
        }}>
          Portfolio
        </h2>

        {/* Loading Dots */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '8px'
          }}
          className="loading-dots"
        >
          <span className="dot-1"></span>
          <span className="dot-2"></span>
          <span className="dot-3"></span>
        </div>
      </div>

      <style>{`
        .loading-dots span {
          display: block;
          width: 8px;
          height: 8px;
          background-color: var(--espresso);
          border-radius: 50%;
          animation: dotWobble 1s infinite;
          filter: drop-shadow(0 0 4px rgba(61,43,31,0.5));
        }
        .loading-dots .dot-1 { animation-delay: 0s; }
        .loading-dots .dot-2 { animation-delay: 0.2s; }
        .loading-dots .dot-3 { animation-delay: 0.4s; }
        @keyframes dotWobble {
          0%, 80%, 100% { 
            transform: scale(0.8) translateY(0); 
            opacity: 0.5; 
          }
          40% { 
            transform: scale(1.3) translateY(-6px); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}
