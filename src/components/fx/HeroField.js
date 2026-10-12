'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/boot';

// Interactive dot grid: dots flee the cursor, click sends a shockwave.
export default function HeroField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const styles = getComputedStyle(document.documentElement);
    const base = styles.getPropertyValue('--ink-3').trim();
    const accent = styles.getPropertyValue('--accent').trim();
    const reduce = prefersReducedMotion();

    const GAP = 30;
    let w = 0, h = 0, dots = [], raf, visible = true;
    const mouse = { x: -9999, y: -9999 };
    const ripples = [];

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let j = 0; j <= Math.ceil(h / GAP); j++)
        for (let i = 0; i <= Math.ceil(w / GAP); i++)
          dots.push({ bx: i * GAP, by: j * GAP, ox: 0, oy: 0, vx: 0, vy: 0 });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        let tx = 0, ty = 0, energy = 0;

        const mdx = d.bx - mouse.x, mdy = d.by - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 170) {
          const f = 1 - md / 170;
          tx += (mdx / md) * f * 42;
          ty += (mdy / md) * f * 42;
          energy = Math.max(energy, f);
        }

        for (const r of ripples) {
          const rd = Math.hypot(d.bx - r.x, d.by - r.y) || 1;
          const diff = Math.abs(rd - r.r);
          if (diff < 70) {
            const f = (1 - diff / 70) * r.a;
            tx += ((d.bx - r.x) / rd) * f * 36;
            ty += ((d.by - r.y) / rd) * f * 36;
            energy = Math.max(energy, f);
          }
        }

        const wave = Math.sin(t / 1100 + d.bx / 140 + d.by / 220);
        ty += wave * 3;
        energy = Math.max(energy, (wave + 1) * 0.05);

        d.vx += (tx - d.ox) * 0.12;
        d.vy += (ty - d.oy) * 0.12;
        d.vx *= 0.78;
        d.vy *= 0.78;
        d.ox += d.vx;
        d.oy += d.vy;

        ctx.globalAlpha = 0.35 + energy * 0.65;
        ctx.fillStyle = energy > 0.12 ? accent : base;
        const s = 1.4 + energy * 2.6;
        ctx.fillRect(d.bx + d.ox - s / 2, d.by + d.oy - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 9;
        ripples[i].a *= 0.975;
        if (ripples[i].a < 0.03) ripples.splice(i, 1);
      }
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (visible) draw(t);
    };

    const rectOf = () => canvas.getBoundingClientRect();
    const onMove = (e) => {
      const r = rectOf();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onDown = (e) => {
      if (e.target.closest?.('a, button')) return;
      const r = rectOf();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, a: 1 });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerdown', onDown);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
}
