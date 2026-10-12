'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    document.documentElement.classList.add('cursor-on');

    let x = -100, y = -100, rx = -100, ry = -100, grow = 1, target = 1, raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = ring.style.opacity = '1';
      const hit = e.target.closest?.('a, button, [data-cursor]');
      target = hit ? 2.4 : 1;
    };
    const onLeave = () => {
      dot.style.opacity = ring.style.opacity = '0';
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      grow += (target - grow) * 0.2;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${grow})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('cursor-on');
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-(--z-cursor) -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-accent opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-(--z-cursor) -ml-[18px] -mt-[18px] size-9 rounded-full border border-accent/70 opacity-0 mix-blend-difference"
      />
    </div>
  );
}
