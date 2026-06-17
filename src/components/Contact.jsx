import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, GitBranch, Send, MapPin } from 'lucide-react';
import WormholePortal from '../three/WormholePortal';
import { ParticleRain } from './Certifications';
import { isMobile } from '../utils/deviceUtils';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { icon: Mail,     label: 'Email',    href: 'mailto:hiranantony@karunya.edu.in', value: 'hiranantony@karunya.edu.in' },
  { icon: Phone,    label: 'Phone',    href: 'tel:+919360276068',                 value: '+91 9360276068' },
  { icon: GitBranch, label: 'GitHub',   href: 'https://github.com/Hiran-Antony',   value: 'github.com/Hiran-Antony' },
  { icon: MapPin,   label: 'Location', href: null,                                value: 'Coimbatore, India' },
];

export default function Contact() {
  const [form, setForm]         = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [burst, setBurst]       = useState(false);
  const btnRef = useRef(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setBurst(true);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyc5xwnTpSyLnu4dFfDRR2-bS9ARASK6jcOnBNByWtujdsbqjmFg7biFohzekWJpsz4vw/exec';
    const formData = new FormData();
    formData.append('Name', form.name);
    formData.append('Phone No', form.phone);
    formData.append('Email', form.email);
    formData.append('Message', form.message);

    try {
      await fetch(scriptURL, { method: 'POST', body: formData });
      setSending(false);
      setSent(true);
      setTimeout(() => { 
        setBurst(false); 
        setSent(false); 
        setForm({ name:'', phone:'', email:'', message:'' }); 
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSending(false);
      setBurst(false);
      alert('Oops! Something went wrong while sending the message.');
    }
  };

  useEffect(() => {
    const mobile = isMobile();
    if (mobile) {
      gsap.globalTimeline.timeScale(1.5);
    }

    // LEFT SIDE — staggered fade in from left
    gsap.fromTo(
      ".contact-left-item",
      {
        opacity: 0,
        x: mobile ? 0 : -40,
        y: mobile ? 20 : 0,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-left",
          start: "top 80%",
          end: "top 30%",
          scrub: mobile ? 0.5 : 1.5,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // RIGHT SIDE — form fades in from right
    gsap.fromTo(
      ".contact-form-card",
      {
        opacity: 0,
        x: mobile ? 0 : 40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-card",
          start: "top 80%",
          end: "top 25%",
          scrub: mobile ? 0.5 : 1.5,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // FORM FIELDS — stagger fade up one by one
    gsap.fromTo(
      ".contact-field",
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-form-card",
          start: "top 70%",
          end: "top 15%",
          scrub: mobile ? 0.5 : 1.2,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // HEADING — fades in from bottom
    gsap.fromTo(
      ".contact-find-heading",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
          end: "top 40%",
          scrub: mobile ? 0.5 : 1,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // SOCIAL ICONS — fade in last, from bottom
    gsap.fromTo(
      ".contact-social-icons",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-social-icons",
          start: "top 90%",
          end: "top 60%",
          scrub: mobile ? 0.5 : 1,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      className="section-wrap contact-section"
      style={{
        background: 'linear-gradient(180deg, #0A0704 0%, #1a0f08 60%, #0A0704 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Wormhole portal background */}
      {!isMobile() ? (
        <WormholePortal />
      ) : (
        <div className="mobile-contact-bg" />
      )}

      {/* Gold particle rain */}
      {!isMobile() && <ParticleRain count={60} />}

      {/* Dark overlay so text is readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,7,4,0.75) 80%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--gold)' }}>07 &mdash; Contact</p>
          <h2 className="section-title light">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'rgba(232,213,176,0.6)',
            marginTop: '0.75rem',
            maxWidth: '480px',
            margin: '0.75rem auto 0',
            lineHeight: 1.7,
          }}>
            Open to internships, freelance projects, and collaboration.<br />
            Drop a message — I respond fast.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)',
          gap: '3rem',
          alignItems: 'start',
        }}
          className="contact-grid"
        >
          {/* LEFT — Social links */}
          <div className="contact-left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 className="contact-find-heading" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--cream)',
              marginBottom: '0.5rem',
            }}>
              Find me at
            </h3>
            {SOCIALS.map(({ icon: Icon, label, href, value }) => (
              <div
                key={label}
                className="contact-left-item"
              >
                <a
                  href={href || undefined}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: 'rgba(61,43,31,0.5)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(201,169,110,0.18)',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  className="social-link"
                >
                  <div style={{
                    width: 40, height: 40,
                    background: 'rgba(201,169,110,0.12)',
                    border: '1px solid rgba(201,169,110,0.25)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'rgba(201,169,110,0.55)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.1rem',
                    }}>{label}</p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--cream)',
                      wordBreak: 'break-all',
                    }}>{value}</p>
                  </div>
                </a>
              </div>
            ))}

            {/* Social Media Buttons */}
            <div className="contact-social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <motion.a
                href="https://linkedin.com/in/hiranantony15"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: 'rgba(201,169,110,0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  background: 'rgba(20,20,20,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(201,169,110,0.18)',
                  borderRadius: '16px',
                  color: '#0A66C2',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'border-color 0.25s',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://instagram.com/hiran_antony15"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: 'rgba(201,169,110,0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  background: 'rgba(20,20,20,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(201,169,110,0.18)',
                  borderRadius: '16px',
                  color: '#E1306C',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'border-color 0.25s',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div className="contact-form-card">
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(61,43,31,0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201,169,110,0.18)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Burst particles overlay */}
              {burst && <BurstEffect />}

              {['name', 'phone', 'email'].map(field => (
                <div key={field} className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,169,110,0.65)',
                    fontWeight: 'bold',
                  }}>
                    {field === 'name' ? 'Your Name' : field === 'phone' ? 'Phone Number' : 'Email Address'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    placeholder={field === 'name' ? 'John Doe' : field === 'phone' ? '+91 9360276068' : 'john@example.com'}
                    className="contact-input"
                    style={{
                      background: 'rgba(61,43,31,0.5)',
                      border: '1px solid rgba(201,169,110,0.18)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.8rem 1rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--cream)',
                      outline: 'none',
                      transition: 'border-color 0.25s, box-shadow 0.25s',
                      width: '100%',
                    }}
                  />
                </div>
              ))}

              <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,169,110,0.65)',
                  fontWeight: 'bold',
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Hey Hiran, I'd love to discuss..."
                  rows={5}
                  className="contact-input"
                  style={{
                    background: 'rgba(61,43,31,0.5)',
                    border: '1px solid rgba(201,169,110,0.18)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.8rem 1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--cream)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                    width: '100%',
                  }}
                />
              </div>

              <div className="contact-field">
                <button
                  ref={btnRef}
                  type="submit"
                  disabled={sending || sent}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 2rem',
                    background: sent
                      ? 'linear-gradient(135deg,#4CAF50,#2E7D32)'
                      : 'linear-gradient(135deg, var(--gold), var(--ember))',
                    color: sent ? '#fff' : 'var(--espresso)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    cursor: sending || sent ? 'default' : 'none',
                    transition: 'transform 0.25s var(--ease-spring), box-shadow 0.25s, background 0.4s',
                    boxShadow: '0 0 24px rgba(201,169,110,0.35)',
                    width: '100%',
                  }}
                  onMouseEnter={e => { if (!sending && !sent) e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {sent ? '✓ Message Sent!' : sending ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </div>
            </form>
          </div>
          </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        marginTop: '5rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(201,169,110,0.1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'rgba(201,169,110,0.4)',
          letterSpacing: '0.08em',
        }}>
          © 2025 Hiran Antony R — Built with React, Three.js & GSAP

        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'rgba(201,169,110,0.25)',
          marginTop: '0.4rem',
        }}>
          Designed & developed from scratch — no templates
        </p>
      </div>

      <style>{`
        .contact-grid { }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .contact-input:focus {
          border-color: var(--gold) !important;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.15), 0 0 20px rgba(201,169,110,0.2) !important;
        }
        .contact-input::placeholder { color: rgba(232,213,176,0.25); }
        .social-link:hover {
          border-color: rgba(201,169,110,0.4) !important;
          boxShadow: 0 0 20px rgba(201,169,110,0.12) !important;
        }
      `}</style>
    </section>
  );
}

function BurstEffect() {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle  = (i / 20) * 360;
    const dist   = 60 + Math.random() * 60;
    const x      = Math.cos((angle * Math.PI) / 180) * dist;
    const y      = Math.sin((angle * Math.PI) / 180) * dist;
    const colors = ['#C9A96E','#E85D26','#E8D5B0','#A07C45'];
    return { id: i, x, y, color: colors[i % colors.length] };
  });

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 20,
      overflow: 'hidden',
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: p.color,
            animation: `burst 0.9s ease-out forwards`,
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes burst {
          0%   { transform: translate(0,0) scale(1); opacity:1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity:0; }
        }
      `}</style>
    </div>
  );
}
