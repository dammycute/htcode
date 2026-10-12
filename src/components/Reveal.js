'use client';

import { motion } from 'motion/react';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', y = 28 }) {
  const M = motion[Tag];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.75, 0.2, 1] }}
    >
      {children}
    </M>
  );
}
