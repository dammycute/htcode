'use client';

import { useSyncExternalStore } from 'react';

// Tiny store so hero animations can wait for the boot sequence to finish.
let done = false;
const subs = new Set();

export const bootStore = {
  get: () => done,
  finish() {
    if (done) return;
    done = true;
    subs.forEach((fn) => fn());
  },
  subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  },
};

export function useBooted() {
  return useSyncExternalStore(bootStore.subscribe, bootStore.get, () => false);
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
