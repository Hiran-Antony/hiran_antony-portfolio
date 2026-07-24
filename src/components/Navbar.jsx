import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Education',href: '#education' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar(props) {
  const navRef  = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const underlineRef = useRef(null);


  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Native scroll listener is much more reliable for navbars on page refresh
    // especially when dealing with intro screens that lock the scroll position.
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    // Check immediately on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {

    // Active section detection
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach(s => obs.observe(s));

    return () => obs.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  if (props.hidden) return null;

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
        {/* Logo */}
        <a href="#hero" onClick={e => handleNavClick(e, '#hero')} className="nav-logo" aria-label="Home">
          <span>HA</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => handleNavClick(e, href)}
                className={`nav-link ${active === href.slice(1) ? 'active' : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>



        {/* Hamburger */}
        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        <ul>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={e => handleNavClick(e, href)}>{label}</a>
            </li>
          ))}
          <li>
            <a href="mailto:rhiranantony15@gmail.com" className="drawer-cta">Hire Me</a>
          </li>
        </ul>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9990;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem clamp(1.25rem, 5vw, 3rem);
          transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
        }
        .navbar.nav-scrolled {
          padding-top: 0.7rem;
          padding-bottom: 0.7rem;
          background: rgba(250,247,242,0.55);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 2px 30px rgba(61,43,31,0.05);
          border-bottom: 1px solid rgba(250,247,242,0.3);
        }
        .navbar.nav-scrolled .nav-link {
          color: var(--espresso);
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(250,247,242, 0.8);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          background: var(--espresso);
          color: var(--gold);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.04em;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 0 16px rgba(201,169,110,0.3);
          transition: box-shadow 0.3s, transform 0.3s var(--ease-spring);
        }
        .nav-logo:hover { transform: scale(1.08); box-shadow: 0 0 28px rgba(201,169,110,0.55); }
        .nav-links { 
          list-style: none; 
          display: flex; 
          gap: 0.5rem; 
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .nav-link {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--espresso-mid);
          text-decoration: none;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%; height: 2px;
          background: var(--gold);
          border-radius: 2px;
          transition: transform 0.3s var(--ease-spring);
        }
        .nav-link:hover, .nav-link.active { color: var(--espresso); }
        .nav-link:hover::after, .nav-link.active::after { transform: translateX(-50%) scaleX(1); }
        .nav-cta {
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          color: #FAF7F2;
          background: var(--espresso);
          border-radius: var(--radius-full);
          padding: 0.5rem 1.4rem;
          text-decoration: none;
          transition: transform 0.2s var(--ease-spring), box-shadow 0.2s;
        }
        .nav-cta:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(201,169,110,0.4); }

        /* Hamburger */
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: none; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--espresso); border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0;
          width: min(300px, 80vw);
          height: 100vh;
          background: rgba(250,247,242,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 9985;
          transform: translateX(100%);
          transition: transform 0.4s var(--ease-out);
          padding: 6rem 2rem 2rem;
          border-left: 1px solid rgba(201,169,110,0.2);
        }
        .mobile-drawer.open { transform: translateX(0); }
        .mobile-drawer ul { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
        .mobile-drawer a {
          display: block;
          font-family: var(--font-body);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--espresso);
          text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(201,169,110,0.15);
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-drawer a:hover { color: var(--gold-dark); padding-left: 0.5rem; }
        .drawer-cta { color: var(--gold-dark) !important; font-weight: 700 !important; border: none !important; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
