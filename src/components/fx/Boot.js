'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { bootStore, prefersReducedMotion } from '@/lib/boot';

const LINES = [
  'ht-code os v1.0',
  'mounting /work ............ ok',
  'starting background workers  ok',
  'compiling interface ....... ok',
  'ready.',
];

export default function Boot() {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('booted') === '1';
    } catch {}

    const timers = [];
    let raf;
    const finish = () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem('booted', '1');
      } catch {}
      bootStore.finish();
      setVisible(false);
    };

    if (seen || prefersReducedMotion()) {
      timers.push(setTimeout(finish, 0));
      return () => timers.forEach(clearTimeout);
    }

    document.body.style.overflow = 'hidden';
    LINES.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), 200 + i * 330)));
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1900, 1);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    timers.push(setTimeout(finish, 2100));

    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-(--z-boot) bg-paper grid place-items-center px-6"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-full max-w-md tabular text-sm text-ink-2">
            {LINES.slice(0, shown).map((l, i) => (
              <p key={l} className={i === LINES.length - 1 ? 'text-accent' : ''}>
                <span className="text-ink-3">$ </span>
                {l}
              </p>
            ))}
            {shown < LINES.length && <span className="caret" />}
            <div className="mt-8 h-px bg-line">
              <div className="h-px bg-accent" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-right text-ink-3">{pct}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
