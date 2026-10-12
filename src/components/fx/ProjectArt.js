'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/boot';

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generative flow-field. Each project gets its own seed, so its own pattern.
export default function ProjectArt({ seed = 1, active = false }) {
  const ref = useRef(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue('--paper-2').trim();
    const fg = styles.getPropertyValue('--accent').trim();
    const rnd = mulberry32(seed * 9973);
    const f1 = 0.004 + (seed % 3) * 0.0018;
    const f2 = 0.005 + (seed % 4) * 0.0012;
    const swirl = 1.1 + (seed % 3) * 0.55;

    let w = 0, h = 0, particles = [], raf, visible = true, t = 0;

    const spawn = () => ({ x: rnd() * w, y: rnd() * h, life: 60 + rnd() * 160 });
    const angle = (x, y) => (Math.sin(x * f1 + seed) + Math.cos(y * f2 + seed * 1.7 + t * 0.0005)) * Math.PI * swirl;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      particles = Array.from({ length: 150 }, spawn);
    };

    const step = () => {
      t += 16;
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = fg;
      ctx.lineWidth = 1;
      const speed = activeRef.current ? 3.2 : 1.1;
      ctx.beginPath();
      for (const p of particles) {
        const a = angle(p.x, p.y);
        const nx = p.x + Math.cos(a) * speed;
        const ny = p.y + Math.sin(a) * speed;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        p.x = nx;
        p.y = ny;
        if (--p.life < 0 || p.x < 0 || p.y < 0 || p.x > w || p.y > h) Object.assign(p, spawn());
      }
      ctx.stroke();
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible) step();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    if (prefersReducedMotion()) {
      for (let i = 0; i < 260; i++) step();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [seed]);

  return <canvas ref={ref} aria-hidden="true" className="size-full" />;
}
