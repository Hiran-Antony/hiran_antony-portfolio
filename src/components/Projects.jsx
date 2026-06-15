import { useRef } from 'react';
import { ExternalLink, GitBranch, Zap } from 'lucide-react';

const PROJECTS = [
  {
    id: 'robertrajiah',
    title: 'robertrajiah.in',
    subtitle: 'Personal Portfolio — Client Project',
    description: 'Designed and deployed a professional personal portfolio website for a real client. Built with semantic HTML, custom CSS animations, and vanilla JavaScript.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
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
    description: 'Interactive admission landing page with SMS marketing integration, dynamic form validation, and conversion-optimized layout for a client campaign.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SMS API'],
    live: null,
    github: null,
    badge: 'Delivered',
    badgeColor: '#C9A96E',
    accent: '#E85D26',
    special: false,
  },
  {
    id: 'fashionverse',
    title: 'FashionVerse',
    subtitle: 'Full-Stack Fashion Platform — In Progress',
    description: 'A full-stack fashion e-commerce platform with AI-assisted recommendations, a modern storefront, user accounts, and a product management dashboard.',
    stack: ['React', 'Supabase', 'PostgreSQL', 'Python'],
    live: null,
    github: null,
    badge: 'In Progress',
    badgeColor: '#E85D26',
    accent: '#E85D26',
    special: true, // Gets the runway light sweep
  },
];

export default function Projects() {
  const cardRefs = useRef([]);

  return (
    <section
      id="projects"
      className="section-wrap"
      style={{
        background: 'linear-gradient(180deg, #1a0f08 0%, #0A0704 100%)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="reveal" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold)' }}>04 &mdash; Projects</p>
          <h2 className="section-title light">Things I've <span className="text-gradient">shipped</span></h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.75rem',
        }}>
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
          ))}
        </div>

        {/* More coming soon */}
        <div
          className="reveal"
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            border: '1px dashed rgba(201,169,110,0.25)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'rgba(201,169,110,0.5)',
          }}>
            // More projects coming soon — currently in active development
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ proj, index }) {
  return (
    <div
      className={`project-card reveal ${proj.special ? 'project-special' : ''}`}
      style={{
        position: 'relative',
        background: 'rgba(61,43,31,0.4)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${proj.accent}30`,
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        animationDelay: `${index * 0.1}s`,
        transition: 'transform 0.35s var(--ease-spring), box-shadow 0.35s, border-color 0.35s',
      }}
    >
      {/* Runway light (FashionVerse special) */}
      {proj.special && <div className="runway-light" />}

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Number */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: `${proj.accent}90`,
          letterSpacing: '0.1em',
        }}>
          0{index + 1}
        </span>
        {/* Badge */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          fontWeight: 600,
          color: proj.badgeColor,
          background: `${proj.badgeColor}18`,
          border: `1px solid ${proj.badgeColor}40`,
          borderRadius: '999px',
          padding: '0.2rem 0.7rem',
          letterSpacing: '0.06em',
        }}>
          {proj.badge}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          marginBottom: '0.3rem',
          lineHeight: 1.15,
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
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        color: 'rgba(232,213,176,0.68)',
        lineHeight: 1.7,
        flex: 1,
      }}>
        {proj.description}
      </p>

      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {proj.stack.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--gold-light)',
            background: 'rgba(201,169,110,0.1)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '4px',
            padding: '0.2rem 0.55rem',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
        {proj.live && (
          <a
            href={proj.live}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
            style={{ color: proj.accent }}
          >
            <ExternalLink size={15} /> Live Site
          </a>
        )}
        {proj.github && (
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
            style={{ color: 'rgba(201,169,110,0.7)' }}
          >
            <GitBranch size={15} /> GitHub
          </a>
        )}
        {proj.special && (
          <span className="proj-link" style={{ color: '#E85D26' }}>
            <Zap size={15} /> In Dev
          </span>
        )}
      </div>

      {/* Hover glow border */}
      <div className="card-glow-border" style={{ '--glow': proj.accent }} />

      <style>{`
        .project-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,169,110,0.15);
          border-color: rgba(201,169,110,0.45) !important;
        }
        .proj-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .proj-link:hover { opacity: 0.7; }

        /* Runway light sweep for FashionVerse */
        .runway-light {
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 3px;
          background: linear-gradient(90deg, transparent, #E85D26, #C9A96E, transparent);
          animation: runwaySweep 3s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
        @keyframes runwaySweep {
          0%   { left: -60%; }
          100% { left: 110%; }
        }
      `}</style>
    </div>
  );
}
