export function ParticleRain({ count = 80 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i / count) * 100 + Math.sin(i) * 2}%`,
    size: `${3 + (i % 4)}px`,
    duration: `${4 + (i % 5)}s`,
    delay: `${(i * 0.1) % 6}s`,
    opacity: 0.4 + (i % 4) * 0.15,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: p.left,
            width: p.size,
            height: p.size,
            background: '#C9A96E',
            borderRadius: '50%',
            opacity: p.opacity,
            boxShadow: '0 0 10px rgba(201,169,110,0.8)',
            animation: `particleFall ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
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
