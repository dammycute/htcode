'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import ProjectArt from './fx/ProjectArt';
import ScrambleText from './fx/ScrambleText';

const subscribeWide = (cb) => {
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useWide = () =>
  useSyncExternalStore(subscribeWide, () => window.matchMedia('(min-width: 768px)').matches, () => false);

function ProjectLink({ href, children, external = true }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const Cmp = external ? 'a' : Link;
  return (
    <Cmp href={href} className="link-line inline-flex items-center gap-1" {...props}>
      {children}
    </Cmp>
  );
}

function Card({ p, i, n, progress }) {
  const [hover, setHover] = useState(false);
  const wide = useWide();
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035]);
  const study = Boolean(p.caseStudy);

  return (
    <div className="md:sticky md:mb-[8vh]" style={{ top: wide ? `calc(5.5rem + ${i * 18}px)` : undefined }}>
      <motion.article
        style={{ scale: wide ? scale : 1, transformOrigin: 'top center' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group mb-6 grid overflow-hidden rounded-md border border-line bg-paper-2 transition-colors duration-300 hover:border-accent/60 md:mb-0 md:min-h-[26rem] md:grid-cols-12"
      >
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-9 md:col-span-7">
          <div>
            <div className="tabular flex items-center justify-between text-xs text-ink-3">
              <ScrambleText text={String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0')} />
              <span>{p.dateRange}</span>
            </div>
            <h3 className="display mt-6 text-4xl sm:text-5xl">
              {study ? (
                <Link href={`/case-study/${p.slug}`} className="transition-colors hover:text-accent">
                  {p.title}
                </Link>
              ) : (
                p.title
              )}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-ink-2">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.techStack.map((t) => (
                <li key={t} className="tag">{t}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {study && (
              <ProjectLink href={`/case-study/${p.slug}`} external={false}>
                Project notes <ArrowRight size={14} />
              </ProjectLink>
            )}
            {p.demo && (
              <ProjectLink href={p.demo}>
                {p.id === 'color-flood' ? 'Play it' : 'Live site'} <ArrowUpRight size={14} />
              </ProjectLink>
            )}
            {p.github && (
              <ProjectLink href={p.github}>
                <GithubLogo size={14} /> {p.frontend_github ? 'Backend' : 'Source'}
              </ProjectLink>
            )}
            {p.frontend_github && (
              <ProjectLink href={p.frontend_github}>
                <GithubLogo size={14} /> Frontend
              </ProjectLink>
            )}
          </div>
        </div>

        <div className="relative min-h-56 border-t border-line md:col-span-5 md:border-l md:border-t-0">
          {p.image ? (
            <>
              <Image
                src={p.image}
                alt={`Screenshot of ${p.title}`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-paper/80 via-transparent to-transparent" />
            </>
          ) : (
            <ProjectArt seed={i + 2} active={hover} />
          )}
          <div className="tabular pointer-events-none absolute bottom-3 left-4 text-xs text-ink-2">
            {p.role} · {p.company}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function WorkStack({ projects }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="relative">
      {projects.map((p, i) => (
        <Card key={p.id} p={p} i={i} n={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}
