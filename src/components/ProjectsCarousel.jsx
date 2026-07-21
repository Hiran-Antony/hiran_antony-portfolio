import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import projectsBgImg from '../assets/projects-bg.webp';
import { usePerformanceTier } from '../context/PerformanceContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsCarousel({ projects, renderCard, header }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tier = usePerformanceTier();

  const handleScroll = (e) => {
    const track = e.target;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, index)));
  };

  const scrollPrev = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const newIndex = Math.max(0, activeIndex - 1);
    track.scrollTo({ left: newIndex * track.clientWidth, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const newIndex = Math.min(projects.length - 1, activeIndex + 1);
    track.scrollTo({ left: newIndex * track.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    // Force GSAP to recalculate pinned scroll metrics when the tab becomes visible again or on resize
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }
    };
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150); // Debounce to allow DOM layout to settle before recalculating
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = gsap.utils.toArray(track.children);
    const totalCards = cards.length;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Horizontal pin-scroll only runs on tablet/desktop.
      // Mobile keeps a normal vertical stack (see className below).
      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const cards = track.children;
          if (cards.length < 2) return 0;
          let amt = cards[cards.length - 1].offsetLeft - cards[0].offsetLeft;
          // Fallback: If browser returns 0 or negative because the tab is hidden, calculate an estimate
          // so GSAP doesn't assign 0 padding and immediately unpin, which skips sections.
          if (amt <= 0) {
            const cardWidth = window.innerWidth >= 768 ? window.innerWidth * 0.5 : window.innerWidth;
            amt = (cards.length - 1) * cardWidth;
          }
          return amt;
        };

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getScrollAmount(),
            scrub: tier === 'low' ? 0.5 : 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              if (tier !== 'low') {
                gsap.set(".proj-card-shell", { willChange: "transform" });
              }
            },
            onLeave: () => {
              gsap.set(".proj-card-shell", { willChange: "auto" });
            },
            onLeaveBack: () => {
              gsap.set(".proj-card-shell", { willChange: "auto" });
            }
          },
        });

        // Subtle emphasis on whichever card is centered — driven by
        // the same scroll, not a separate trigger. Content opacity
        // never drops below 0.85, so nothing ever looks "empty".
        const updateEmphasis = () => {
          const viewportCenter = window.innerWidth / 2;
          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            const proximity = gsap.utils.clamp(0, 1, 1 - distance / viewportCenter);
            gsap.set(card, {
              scale: gsap.utils.interpolate(0.94, 1, proximity),
              opacity: gsap.utils.interpolate(0.85, 1, proximity),
            });
          });
        };

        tween.eventCallback("onUpdate", updateEmphasis);
        updateEmphasis();

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-0 overflow-hidden flex flex-col h-auto md:h-screen" 
      style={{ width: '100%' }}
    >
      
      {/* Background Media */}
      <div 
        className="absolute inset-0 z-0 projects-section"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Combined Static Image Background and Dark Overlay */}
        <div 
          className="projects-bg-image"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 8, 5, 0.55), rgba(10, 8, 5, 0.55)), url(${projectsBgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            inset: 0,
          }}
        />
      </div>

      <div className="projects-content" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {header}
      
      <style>{`
        @media (min-width: 768px) {
          .desktop-pad {
            padding-left: calc(50vw - min(25vw, 325px)) !important;
            padding-right: calc(50vw - min(25vw, 325px)) !important;
          }
        }
      `}</style>
      
      {/* Wrapper to perfectly center the track vertically in the remaining space and push it UP */}
      <div 
        className="flex-1 flex flex-col justify-center w-full relative z-10"
        style={{ marginTop: '-8vh' }} // Use margin instead of transform to prevent Android backdrop-filter ghosting bug
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex items-center overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:gap-10 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full desktop-pad"
        >
          {projects.map((project, i) => (
            <div key={project.id ?? i} className="snap-center shrink-0 w-full md:w-[50vw] md:max-w-[650px] proj-card-wrapper flex justify-center px-4 md:px-0">
              <div className="w-full max-w-[420px] md:max-w-none">
                {renderCard(project, i)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-[#1a0f08]/40 border border-[#C9A96E]/20 text-[#C9A96E] rounded-full backdrop-blur-md transition-opacity disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous Project"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={scrollNext}
          disabled={activeIndex === projects.length - 1}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-[#1a0f08]/40 border border-[#C9A96E]/20 text-[#C9A96E] rounded-full backdrop-blur-md transition-opacity disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next Project"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Mobile Index Indicator */}
        <div className="md:hidden flex justify-center mt-6">
          <span className="text-[#C9A96E] font-mono text-xs font-bold tracking-[0.2em] bg-[#1a0f08]/80 px-5 py-2 rounded-full border border-[#C9A96E]/30 backdrop-blur-md">
            0{activeIndex + 1} / 0{projects.length}
          </span>
        </div>
      </div>
      </div>
    </section>
  );
}
