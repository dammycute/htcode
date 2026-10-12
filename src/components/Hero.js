'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/lib/site';
import { motion, useScroll, useTransform } from 'motion/react';
import HeroField from './fx/HeroField';
import SplitText from './fx/SplitText';
import Magnetic from './fx/Magnetic';
import CountUp from './fx/CountUp';
import { prefersReducedMotion, useBooted } from '@/lib/boot';

const PHRASES = ['AI job classification', 'background workers', 'secure APIs', 'payment integrations', 'things that ship'];

function Typed() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion()) {
      el.textContent = PHRASES[0];
      return;
    }
    let i = 0, j = 0, deleting = false, timer;
    const tick = () => {
      const phrase = PHRASES[i];
      j += deleting ? -1 : 1;
      el.textContent = phrase.slice(0, j);
      let wait = deleting ? 28 : 60;
      if (!deleting && j === phrase.length) {
        deleting = true;
        wait = 1500;
      } else if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % PHRASES.length;
        wait = 300;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, []);
  return <span ref={ref} className="text-ink" />;
}

export default function Hero() {
  const root = useRef(null);
  const booted = useBooted();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: booted ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.2, 0.75, 0.2, 1] },
  });

  return (
    <section ref={root} className="relative min-h-[100dvh] overflow-hidden">
      <HeroField />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-paper to-transparent" />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-between px-5 pb-14 pt-36 sm:px-8 sm:pt-44"
      >
        <div>
          <motion.p {...fadeUp(0.1)} className="tabular flex items-center gap-2.5 text-sm text-ink-2">
            <span className="pulse-dot size-2 rounded-full bg-accent" aria-hidden="true" />
            Taking on new projects
          </motion.p>
          <SplitText
            as="h1"
            waitForBoot
            delay={0.15}
            className="display mt-8 text-[clamp(3.4rem,11.5vw,10.5rem)]"
            parts={[{ text: 'Backend depth.' }, { br: true }, { text: 'Frontend care.', accent: true }]}
          />
          <motion.p {...fadeUp(0.9)} className="tabular mt-8 text-sm text-ink-3 sm:text-base">
            <span className="text-accent">$</span> now building <Typed />
            <span className="caret ml-1" />
          </motion.p>
        </div>

        <div className="mt-20 grid items-end gap-10 md:grid-cols-12">
          <motion.p {...fadeUp(1.0)} className="text-lg leading-relaxed text-ink-2 sm:text-xl md:col-span-5">
            I’m a full-stack and backend developer based in Ibadan, Nigeria. Right now I ship production features for CVtoCareer, a career advisory platform used by real clients.
          </motion.p>

          <motion.dl {...fadeUp(1.1)} className="tabular grid grid-cols-2 gap-6 md:col-span-3 md:col-start-7">
            <div>
              <dd className="display text-5xl text-ink"><CountUp to={3} /></dd>
              <dt className="mt-2 text-xs text-ink-3">years in production</dt>
            </div>
            <div>
              <dd className="display text-5xl text-ink"><CountUp to={4} suffix="" /></dd>
              <dt className="mt-2 text-xs text-ink-3">codebases shipped at CVtoCareer</dt>
            </div>
          </motion.dl>

          <motion.div {...fadeUp(1.2)} className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm md:col-span-3 md:justify-end">
            <Magnetic>
              <a href="#work" className="inline-block rounded-sm bg-accent px-5 py-3 font-medium text-accent-ink">
                See the work
              </a>
            </Magnetic>
            <a href={site.colorFlood} target="_blank" rel="noopener noreferrer" className="link-line">Play Color Flood</a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
