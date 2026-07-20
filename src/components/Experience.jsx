import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Use a timeline for better performance (one ScrollTrigger instead of two)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".exp-panels",
          start: "top 75%",
          // Prevent it from re-triggering if not needed, or let it play once cleanly
          toggleActions: "play none none none" 
        }
      });

      tl.from(".exp-panels", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out"
      })
      .from(".exp-panel", {
        opacity: 0,
        x: (i) => i === 0 ? -30 : 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.4"); // Overlap to make it snappy and seamless

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      
      {/* Section Header */}
      <div className="exp-header">
        <p className="exp-label">05 — EXPERIENCE</p>
        <h2 className="exp-heading">
          What I've <span className="text-gradient">Been Doing</span>
        </h2>
      </div>

      {/* Two Status Panels */}
      <div className="exp-panels">

        {/* Panel 1 — Freelancing */}
        <div className="exp-panel">
          <div className="exp-panel-icon">💼</div>
          <p className="exp-panel-tag">Currently</p>
          <h3 className="exp-panel-title">Freelancing</h3>
          <p className="exp-panel-since">Since 2025</p>
          <p className="exp-panel-desc">
            Building and deploying real client websites 
            independently — from design to deployment.
          </p>
          <div className="exp-panel-stat">
            <span className="stat-number">2+</span>
            <span className="stat-label">
              Client Sites Delivered
            </span>
          </div>
          <div className="exp-status-dot active">
            <span className="dot-pulse" />
            Live & Taking Projects
          </div>
        </div>

        {/* Divider */}
        <div className="exp-divider" />

        {/* Panel 2 — Internship */}
        <div className="exp-panel">
          <div className="exp-panel-icon">🚀</div>
          <p className="exp-panel-tag">Completed</p>
          <h3 className="exp-panel-title">Internship</h3>
          <p className="exp-panel-since">
            June 01–20, 2026
          </p>
          <p className="exp-panel-desc">
            Completed an offline Full Stack Development internship at QAROO India Pvt. Ltd., Coimbatore — gaining hands-on industry experience.
          </p>
          <div className="exp-panel-stat">
            <span className="stat-number">Full Stack</span>
            <span className="stat-label">
              Developer Role
            </span>
          </div>
          <div className="exp-status-dot completed">
            <span className="dot-pulse completed" />
            Internship Completed ✅
          </div>
        </div>

      </div>

      <style>{`
        .experience-section {
          padding: 100px 5%;
          background: #FAF7F2;
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* HEADER */
        .experience-section .exp-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .experience-section .exp-label {
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #C9A96E;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-family: 'JetBrains Mono', monospace;
        }
        .experience-section .exp-heading {
          font-size: 48px;
          font-weight: 700;
          color: #3D2B1F;
          letter-spacing: -0.5px;
        }

        /* PANELS WRAPPER */
        .experience-section .exp-panels {
          display: flex;
          align-items: stretch;
          gap: 0;
          max-width: 860px;
          width: 100%;
          background: #FFFFFF;
          border-radius: 24px;
          border: 0.5px solid #E0D8CC;
          box-shadow: 0 8px 48px rgba(61,43,31,0.07);
          overflow: hidden;
        }

        /* SINGLE PANEL */
        .experience-section .exp-panel {
          flex: 1;
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* VERTICAL DIVIDER */
        .experience-section .exp-divider {
          width: 0.5px;
          background: linear-gradient(
            to bottom,
            transparent,
            #C9A96E55 20%,
            #C9A96E55 80%,
            transparent
          );
          flex-shrink: 0;
        }

        /* PANEL CONTENT */
        .experience-section .exp-panel-icon {
          font-size: 32px;
          margin-bottom: 4px;
        }
        .experience-section .exp-panel-tag {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C9A96E;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }
        .experience-section .exp-panel-title {
          font-size: 36px;
          font-weight: 700;
          color: #3D2B1F;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .experience-section .exp-panel-since {
          font-size: 13px;
          color: #E85D26;
          font-weight: 600;
        }
        .experience-section .exp-panel-desc {
          font-size: 14px;
          color: #3D2B1Faa;
          line-height: 1.7;
          margin-top: 4px;
        }

        /* STAT BLOCK */
        .experience-section .exp-panel-stat {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-top: 8px;
          padding: 14px 18px;
          background: #FAF7F2;
          border-radius: 12px;
          border: 0.5px solid #E0D8CC;
        }
        .experience-section .stat-number {
          font-size: 26px;
          font-weight: 700;
          color: #3D2B1F;
        }
        .experience-section .stat-label {
          font-size: 12px;
          color: #3D2B1F88;
        }

        /* STATUS DOT */
        .experience-section .exp-status-dot {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
          color: #3D2B1Faa;
        }
        .experience-section .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22C55E;
          display: inline-block;
          position: relative;
        }
        .experience-section .dot-pulse::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: inherit;
          animation: pulseDotScale 2s ease-out infinite;
          z-index: -1;
        }
        .experience-section .dot-pulse.seeking {
          background: #C9A96E;
        }
        .experience-section .dot-pulse.completed {
          background: #22C55E;
        }
        .experience-section .dot-pulse.completed::after {
          display: none;
        }
        
        @keyframes pulseDotScale {
          0% { 
            transform: scale(1);
            opacity: 0.7;
          }
          100% { 
            transform: scale(3.5);
            opacity: 0;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .experience-section .exp-panels {
            flex-direction: column;
          }
          .experience-section .exp-divider {
            width: 100%;
            height: 0.5px;
            background: linear-gradient(
              to right,
              transparent,
              #C9A96E55 20%,
              #C9A96E55 80%,
              transparent
            );
          }
          .experience-section .exp-panel {
            padding: 24px 20px;
          }
          .experience-section .exp-heading {
            font-size: 36px;
          }
        }
      `}</style>
    </section>
  );
}
