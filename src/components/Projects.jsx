import { ExternalLink, GitBranch, Zap } from 'lucide-react';
import ProjectsCarousel from './ProjectsCarousel';

const PROJECTS = [
  {
    id: 'robertrajiah',
    title: 'robertrajiah.in',
    subtitle: 'Personal Portfolio — Client Project',
    description: 'Designed and deployed a professional personal portfolio website for a real client. Built with semantic HTML, custom CSS animations, and vanilla JavaScript. Features smooth scroll animations, responsive design, contact form integration, and deployed on Vercel with custom domain.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'Responsive Design', 'CSS Animations'],
    live: 'https://robertrajiah.in',
    github: null,
    badge: 'Live',
    badgeColor: '#4CAF50',
    accent: '#C9A96E',
    special: false,
  },
  {
    id: 'admission',
    title: 'College Admission Campaign',
    subtitle: 'Landing Page — Client Project',
    description: 'Interactive admission landing page with SMS marketing integration, dynamic form validation, and conversion-optimized layout for a client campaign. Features real-time form validation, SMS API integration, mobile-first responsive design, and lead capture system.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SMS API', 'Responsive Design', 'Form Validation'],
    live: null,
    github: null,
    badge: 'Delivered',
    badgeColor: '#C9A96E',
    accent: '#C9A96E',
    special: false,
  },
  {
    id: 'fashionverse',
    title: 'FashionVerse',
    subtitle: 'Full-Stack Fashion E-Commerce Platform',
    description: 'A premium full-stack e-commerce platform with AI virtual try-on, fashionverse AI assistant, Razorpay integration, blockchain order verification on Polygon network, cinematic dark UI, delivery management with live map and PIN confirmation, NFT product certificates, 7-layer security system, and real-time admin dashboard with sales analytics.',
    stack: [
      'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion',
      'GSAP', 'Solidity', 'Ethers.js', 'three.js', 'Polygon', 'Cloudinary', 'Vercel',
    ],
    live: 'https://fashionverseonline.vercel.app',
    github: null,
    badge: 'Live',
    badgeColor: '#4CAF50',
    accent: '#C9A96E',
    special: false,
  },
  {
    id: 'n1729academy',
    title: 'N-1729 Academy',
    subtitle: 'Client Project — Tuition Center',
    description: 'Designed and developed a professional website for a tuition center. Focuses on an engaging user experience with smooth scroll animations and modern web aesthetics.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Vercel'],
    live: null,
    github: null,
    badge: 'In Progress',
    badgeColor: '#E85D26',
    accent: '#C9A96E',
    special: true,
  },
  {
    id: 'reciperemixer',
    title: 'Recipe Remixer',
    subtitle: 'AI-Powered Recipe Generator',
    description: 'A full-stack AI web application that transforms your available ingredients into personalized recipes instantly. Built with real LLM integration using Groq API and Llama3, featuring secure authentication, MongoDB recipe storage, and a stunning dark gradient UI with animated chef mascot and glassmorphism design.',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Groq AI', 'Llama3', 'NextAuth.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    live: 'https://reciperemixer.vercel.app',
    github: null,
    badge: 'Live',
    badgeColor: '#4CAF50',
    accent: '#C9A96E',
    special: false,
    achievement: '🏆 Top 5 — Conesta Forge AI Sprint',
  },
];

const TOTAL = PROJECTS.length;

export default function Projects() {
  return (
    <>
      <div
        id="projects"
        style={{
          background: 'linear-gradient(180deg, #1a0f08 0%, #0A0704 100%)',
        }}
      >
        {/* Integrated Carousel Component */}
        <ProjectsCarousel 
          projects={PROJECTS} 
          header={
            <div style={{
              textAlign: 'center',
              paddingTop: '6rem',
              paddingBottom: '3rem',
              position: 'relative',
              zIndex: 20,
            }}>
              <p className="section-label" style={{ color: 'var(--gold)' }}>04 &mdash; Projects</p>
              <h2 className="section-title light">
                Things I&apos;ve <span className="text-gradient">shipped</span>
              </h2>
              <p 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'rgba(201,169,110,0.4)',
                  marginTop: '0.5rem',
                  letterSpacing: '0.1em',
                }}
              >
                scroll to explore all {TOTAL} projects ↓
              </p>
            </div>
          }
          renderCard={(proj, index) => <CardInner proj={proj} index={index} />} 
        />
      </div>

      <style>{`
        /* Stable wrapper to prevent hover flicker and elevate stacking context */
        .proj-card-wrapper {
          position: relative;
          z-index: 1;
          transition: z-index 0s 0.4s;
        }
        .proj-card-wrapper:hover {
          z-index: 50;
          transition: z-index 0s 0s;
        }

        /* Card Sizing: Auto height on mobile to prevent clipping, fixed height on desktop for uniformity */
        .proj-card-shell {
          height: auto;
          min-height: 410px;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.33, 1, 0.68, 1);
        }
        
        @media (min-width: 768px) {
          .proj-card-shell {
            height: 410px !important;
            transform: translateZ(0); /* Force GPU layer ONLY on desktop to prevent background flickering from GSAP, avoiding Android mobile text-doubling bug */
            backface-visibility: hidden;
          }
          .proj-card-wrapper:hover .proj-card-shell {
            transform: translateY(-12px);
            box-shadow: 0 25px 45px rgba(0,0,0,0.5), 0 0 30px rgba(201,169,110,0.15) !important;
            border-color: rgba(255,255,255,0.3) !important;
          }
        }

        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(76,175,80,0.55); }
          50%       { box-shadow: 0 0 0 6px rgba(76,175,80,0); }
        }
        .badge-live { animation: livePulse 2.2s infinite; }

        .runway-light {
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 3px;
          background: linear-gradient(90deg, transparent, #E85D26, #C9A96E, transparent);
          animation: runwaySweep 3s linear infinite;
          pointer-events: none; z-index: 10;
        }
        @keyframes runwaySweep {
          0%   { left: -60%; }
          100% { left: 110%; }
        }

        .proj-link {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: var(--font-mono); font-size: 0.8rem;
          text-decoration: none; font-weight: 500; transition: opacity 0.2s;
        }
        .proj-link:hover { opacity: 0.7; }
      `}</style>
    </>
  );
}

function CardInner({ proj, index }) {
  return (
    <div
      className="proj-card-shell"
      style={{
        position: 'relative',
        border: `1px solid ${proj.accent}30`,
        borderRadius: '24px',
        padding: '1.75rem', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {proj.special && <div className="runway-light" />}

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="proj-num-badge text-gradient" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '2rem', 
          fontWeight: 800,
          lineHeight: 1,
          userSelect: 'none',
        }}>
          0{index + 1}
        </span>
        <span
          className={proj.badge === 'Live' ? 'badge-live' : ''}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: proj.badgeColor,
            background: `${proj.badgeColor}18`,
            border: `1px solid ${proj.badgeColor}50`,
            borderRadius: '999px',
            padding: '0.3rem 0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {proj.badge}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          marginBottom: '0.35rem',
          lineHeight: 1.2,
        }}>
          {proj.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: proj.accent,
          letterSpacing: '0.05em',
        }}>
          {proj.subtitle}
        </p>
        {proj.achievement && (
          <div style={{ marginTop: '0.6rem' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#F59E0B',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid #F59E0B',
              borderRadius: '999px',
              padding: '0.2rem 0.6rem',
              fontWeight: 500,
            }}>
              {proj.achievement}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        fontWeight: 500,
        color: 'rgba(232,213,176,0.85)',
        lineHeight: 1.7,
      }}>
        {proj.description}
      </p>

      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
        {proj.stack.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--gold-light)',
            background: 'rgba(201,169,110,0.1)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '6px',
            padding: '0.2rem 0.6rem',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.25rem' }}>
        {proj.live && (
          <a href={proj.live} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ color: '#4CAF50' }}>
            <ExternalLink size={15} /> Live Site
          </a>
        )}
        {proj.github && (
          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ color: 'rgba(201,169,110,0.7)' }}>
            <GitBranch size={15} /> GitHub
          </a>
        )}
        {proj.special && (
          <span className="proj-link" style={{ color: '#E85D26' }}>
            <Zap size={15} /> In Dev
          </span>
        )}
      </div>

      {/* Inner glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(201,169,110,0.04) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
