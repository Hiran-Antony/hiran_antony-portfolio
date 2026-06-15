import { useEffect, useRef } from 'react';

export default function useCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    dot.current = document.querySelector('.cursor-dot');
    ring.current = document.querySelector('.cursor-ring');

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top  = e.clientY + 'px';
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.left = ringPos.current.x + 'px';
        ring.current.style.top  = ringPos.current.y + 'px';
      }
      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    const onDown = () => dot.current?.classList.add('clicking');
    const onUp   = () => dot.current?.classList.remove('clicking');

    const addHover = () => ring.current?.classList.add('hovered');
    const removeHover = () => ring.current?.classList.remove('hovered');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);
}
