import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--ember), var(--gold))',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(232, 93, 38, 0.4)'
      }}
    />
  );
}
