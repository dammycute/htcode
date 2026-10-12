'use client';

import { MotionConfig } from 'motion/react';
import Boot from './fx/Boot';
import Cursor from './fx/Cursor';
import ScrollProgress from './fx/ScrollProgress';
import SmoothScroll from './fx/SmoothScroll';
import CommandPalette from './CommandPalette';

export default function Shell({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Boot />
      <CommandPalette />
      {children}
    </MotionConfig>
  );
}
