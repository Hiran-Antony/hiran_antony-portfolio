import { useState } from 'react';
import reactIcon from '../assets/tech-icons/react.svg';
import framerIcon from '../assets/tech-icons/framer.svg';
import gsapIcon from '../assets/tech-icons/gsap.svg';
import nodeIcon from '../assets/tech-icons/nodejs.svg';
import supabaseIcon from '../assets/tech-icons/supabase.svg';
import threeIcon from '../assets/tech-icons/threejs.svg';
import nextIcon from '../assets/tech-icons/nextjs.svg';
import tsIcon from '../assets/tech-icons/typescript.svg';
import tailwindIcon from '../assets/tech-icons/tailwindcss.svg';
import viteIcon from '../assets/tech-icons/vite.svg';

const techStars = [
  { name: 'React', icon: reactIcon, top: '28%', left: '12%', delay: 0, scale: 1 },
  { name: 'Framer Motion', icon: framerIcon, top: '35%', left: '88%', delay: 0.5, scale: 1 },
  { name: 'GSAP', icon: gsapIcon, top: '70%', left: '15%', delay: 1.2, scale: 1.4 },
  { name: 'Node.js', icon: nodeIcon, top: '75%', left: '85%', delay: 0.8, scale: 1 },
  { name: 'Supabase', icon: supabaseIcon, top: '32%', left: '18%', delay: 1.5, scale: 1 },
  { name: 'Three.js', icon: threeIcon, top: '50%', left: '90%', delay: 0.2, scale: 1 },
  { name: 'Next.js', icon: nextIcon, top: '45%', left: '8%', delay: 1.8, scale: 1 },
  { name: 'TypeScript', icon: tsIcon, top: '18%', left: '82%', delay: 0.7, scale: 1 },
  { name: 'Tailwind CSS', icon: tailwindIcon, top: '60%', left: '10%', delay: 1.1, scale: 1 },
  { name: 'Vite', icon: viteIcon, top: '85%', left: '25%', delay: 0.4, scale: 1 },
];

function TechStar({ name, icon, top, left, delay, scale = 1, isMob }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`tech-star ${hovered ? 'hovered' : ''}`}
      style={{ 
        position: 'absolute',
        top, left, 
        cursor: isMob ? 'default' : 'pointer',
        animationDelay: `${delay}s`,
        zIndex: 10
      }}
      onMouseEnter={() => !isMob && setHovered(true)}
      onMouseLeave={() => !isMob && setHovered(false)}
    >
      <div style={{ animation: `starFloat 4s ease-in-out infinite ${delay}s`, width: '100%', height: '100%', display: 'flex' }}>
        <img 
          src={icon} 
          alt={name}
          className="tech-star-icon"
          style={{ transform: `scale(${scale})` }}
        />
        {hovered && !isMob && (
          <span className="tech-star-tooltip">
            {name}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TechStarsOverlay() {
  const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
  const visibleTechStars = isMob ? techStars.slice(0, 5) : techStars;
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'auto' }}>
        {visibleTechStars.map((tool, i) => (
          <TechStar 
            key={i}
            name={tool.name}
            icon={tool.icon}
            top={tool.top}
            left={tool.left}
            delay={tool.delay}
            scale={tool.scale}
            isMob={isMob}
          />
        ))}
      </div>
    </div>
  );
}
