import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile } from '../../utils/deviceUtils';
import { CERTS } from './certData';
import MobileCertGrid from './MobileCertGrid';
import CertDetails from './CertDetails';
import './certGallery.css';

export { ParticleRain } from './ParticleRain';

gsap.registerPlugin(ScrollTrigger);

const GalleryScene = lazy(() => import('./GalleryScene'));

export default function Certifications() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeCert, setActiveCert] = useState(0);
  const [prevCert, setPrevCert] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [shouldMountCanvas, setShouldMountCanvas] = useState(false);
  const [mobile, setMobile] = useState(isMobile);

  const sectionRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const mouseXRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prevCert !== activeCert) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setPrevCert(activeCert);
        setIsTransitioning(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeCert, prevCert]);

  useEffect(() => {
    if (!mobile) {
      const timer = setTimeout(() => setShouldMountCanvas(true), 500);
      return () => clearTimeout(timer);
    }
    setShouldMountCanvas(false);
  }, [mobile]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || mobile) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
            setHintVisible(self.progress <= 0.05);
          },
        });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      });
    }, section);

    return () => ctx.revert();
  }, [mobile]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    if (lightboxImg) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleActiveCertChange = useCallback((index) => {
    setActiveCert(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className={`cert-gallery-section ${mobile ? 'cert-gallery-section--mobile' : 'cert-gallery-section--desktop'}`}
    >
      <div className="cert-gallery-header">
        <p className="section-label">06 — CERTIFICATIONS</p>
        <h2>
          Earned <span className="text-gradient">Badges</span>
        </h2>
        <p className="section-subtitle">Scroll to explore the gallery</p>
      </div>

      {!mobile && shouldMountCanvas && (
        <Canvas
          camera={{ position: [0, 0, 3], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <GalleryScene
              scrollProgressRef={scrollProgressRef}
              certificates={CERTS}
              onCertClick={setLightboxImg}
              onActiveCertChange={handleActiveCertChange}
              mouseXRef={mouseXRef}
              activeCert={activeCert}
            />
          </Suspense>
        </Canvas>
      )}

      {mobile && <MobileCertGrid certs={CERTS} onView={setLightboxImg} />}

      {!mobile && CERTS.map((cert, i) => (
        <CertDetails
          key={i}
          cert={{...cert, index: i}}
          isActive={activeCert === i}
          isLeaving={prevCert === i && isTransitioning}
          totalCerts={CERTS.length}
          onView={setLightboxImg}
        />
      ))}

      {!mobile && (
        <>
          <div className="gallery-progress">
            {CERTS.map((cert, i) => (
              <div 
                key={i} 
                className={`gallery-dot-wrap ${activeCert === i ? 'active' : ''}`}
                title={cert.title}
              >
                <div className="gallery-dot" />
                {activeCert === i && (
                  <span className="dot-label">{i + 1}</span>
                )}
              </div>
            ))}
          </div>

          <div className="gallery-scroll-hint" style={{ opacity: hintVisible ? 1 : 0 }}>
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </>
      )}

      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="cert-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              className="cert-lightbox-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImg}
                alt="Certificate"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '75vh',
                  borderRadius: '12px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </motion.div>
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={() => setLightboxImg(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
