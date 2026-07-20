import { Html } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { isMobile } from '../utils/deviceUtils';

export default function TechStar({ 
  name, icon, position 
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const isMob = isMobile();

  // Gentle twinkling + floating animation
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 
        position[1] + Math.sin(t * 0.4 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center>
        <div
          className={`tech-star ${hovered ? 'hovered' : ''}`}
          style={{ cursor: isMob ? 'default' : 'pointer' }}
          onMouseEnter={() => !isMob && setHovered(true)}
          onMouseLeave={() => !isMob && setHovered(false)}
        >
          <img 
            src={icon} 
            alt={name}
            className="tech-star-icon"
          />
          {hovered && !isMob && (
            <span className="tech-star-tooltip">
              {name}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}
