'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/boot';

const CHARS = '!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz0123456789';

function runScramble(el, text, duration) {
  const start = performance.now();
  let raf;
  const frame = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const reveal = Math.floor(p * text.length);
    let out = '';
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      out += c === ' ' || i < reveal ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

// Decodes its text when it scrolls into view (and optionally again on hover).
export default function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  duration = 800,
  onHover = false,
  ...rest
}) {
  const ref = useRef(null);
  const cancel = useRef(() => {});

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) ref.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t = setTimeout(() => {
        el.style.opacity = '1';
        cancel.current = runScramble(el, text, duration);
      }, delay);
      cancel.current = () => clearTimeout(t);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancel.current();
    };
  }, [text, delay, duration]);

  const handleEnter = () => {
    if (!onHover || prefersReducedMotion()) return;
    cancel.current();
    cancel.current = runScramble(ref.current, text, 450);
  };

  return (
    <Tag ref={ref} className={className} onMouseEnter={handleEnter} {...rest}>
      {text}
    </Tag>
  );
}
