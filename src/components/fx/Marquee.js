'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row({ words, base = 4, outline = false }) {
  const x = useMotionValue(0);
  const dir = useRef(base > 0 ? 1 : -1);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [-14, 14]);
  const xPct = useTransform(x, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    const f = boost.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    let move = dir.current * Math.abs(base) * (delta / 1000);
    move += dir.current * move * Math.abs(f);
    x.set(wrap(-25, 0, x.get() + move));
  });

  const text = words.join('  /  ');
  return (
    <motion.div style={{ skewX: skew }} className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x: xPct }} className="flex w-max">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            aria-hidden={n > 0}
            className={`display text-[clamp(3rem,9vw,8rem)] pr-[0.6em] ${outline ? 'text-transparent [-webkit-text-stroke:1px_var(--ink-3)]' : ''}`}
          >
            {text}  /
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Marquee() {
  return (
    <div className="py-10 border-y border-line space-y-2 select-none" aria-label="Technologies I work with">
      <Row words={['TypeScript', 'Node.js', 'Django', 'PostgreSQL', 'Redis']} base={3} />
      <Row words={['Next.js', 'React', 'MongoDB', 'Celery', 'BullMQ']} base={-3} outline />
    </div>
  );
}
