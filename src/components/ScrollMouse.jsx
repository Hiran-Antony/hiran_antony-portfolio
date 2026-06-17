import { useEffect, useRef, useState } from 'react';

const MOUSE_WIDTH = 18;
const MOUSE_HEIGHT = 26;

export default function ScrollMouse() {
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const [pathData, setPathData] = useState('');
  const [dashArray, setDashArray] = useState(0);
  const [dashOffset, setDashOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 20 });
  const [isMobile, setIsMobile] = useState(false);

  // Generate SVG path dynamically based on screen width
  const updatePath = () => {
    const w = window.innerWidth;
    const mobile = w < 768;
    const tablet = w >= 768 && w < 1024;
    setIsMobile(mobile);

    const amp = mobile ? 4 : tablet ? 5 : 6;
    const waveLength = 120;
    const segments = Math.ceil(w / waveLength);

    let d = `M 0 20 `;
    for (let i = 0; i < segments; i++) {
      const startX = i * waveLength;
      d += `Q ${startX + 30} ${20 - amp * 2}, ${startX + 60} 20 T ${startX + 120} 20 `;
    }
    setPathData(d);
  };

  // Setup path and resize listener
  useEffect(() => {
    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  // Update dash array when path changes
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setDashArray(length);
      setDashOffset(length);
    }
  }, [pathData]);

  // Scroll tracking
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!pathRef.current) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(Math.max(window.scrollY / docHeight, 0), 1) || 0;

      const totalLength = pathRef.current.getTotalLength();
      if (totalLength === 0) return;

      const currentLength = scrollPercent * totalLength;
      setDashOffset(totalLength - currentLength);

      // Get point for mouse icon
      const point = pathRef.current.getPointAtLength(currentLength);
      
      // Wire progress path ends AT point
      // Mouse top-center = point
      setMousePos({ x: point.x, y: point.y });
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dashArray, pathData]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '40px',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'visible'
      }}
    >
      <svg width="100%" height="40px" style={{ overflow: 'visible' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="mouseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E85D26" />
          </filter>
        </defs>

        {/* Background faint path (hidden on mobile) */}
        {!isMobile && (
          <path
            d={pathData}
            fill="none"
            stroke="#C9A96E"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
        )}

        {/* Progress Wire */}
        <path
          ref={pathRef}
          id="mousePath"
          d={pathData}
          fill="none"
          stroke="#E85D26"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />

        {/* Emoji Mouse Fallback */}
        <foreignObject
          x={mousePos.x - 12}
          y={mousePos.y - 20}
          width="40"
          height="40"
          style={{ overflow: 'visible' }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            transform: 'rotate(-90deg)',
            filter: 'drop-shadow(0 0 4px #E85D26)',
            lineHeight: 1
          }}>
            🖱️
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
