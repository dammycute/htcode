'use client';

import { motion } from 'motion/react';
import { useBooted } from '@/lib/boot';

const container = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const char = {
  hidden: { y: '115%', rotate: 8, opacity: 0 },
  show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.9, ease: [0.2, 0.75, 0.2, 1] } },
};

// Kinetic headline: every letter rises out of a mask.
// parts: array of { text, accent? } or { br: true }
export default function SplitText({
  parts,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.028,
  waitForBoot = false,
}) {
  const booted = useBooted();
  const label = parts.map((p) => (p.br ? ' ' : p.text)).join(' ').replace(/\s+/g, ' ').trim();

  const trigger = waitForBoot
    ? { animate: booted ? 'show' : 'hidden' }
    : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } };

  let key = 0;
  const nodes = [];
  parts.forEach((part) => {
    if (part.br) {
      nodes.push(<br key={`br-${key++}`} />);
      return;
    }
    part.text.split(' ').forEach((word) => {
      nodes.push(
        <span key={`w-${key++}`} className={`inline-block whitespace-nowrap ${part.accent ? 'text-accent' : ''}`}>
          {[...word].map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.01em]">
              <motion.span variants={char} className="inline-block will-change-transform">
                {ch}
              </motion.span>
            </span>
          ))}
        </span>
      );
      nodes.push(' ');
    });
  });

  return (
    <Tag aria-label={label} className={className}>
      <motion.span aria-hidden="true" className="block" variants={container(stagger, delay)} initial="hidden" {...trigger}>
        {nodes}
      </motion.span>
    </Tag>
  );
}
