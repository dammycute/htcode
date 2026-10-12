'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import ScrambleText from './fx/ScrambleText';
import { nav, site } from '@/lib/site';

const openPalette = () => window.dispatchEvent(new Event('open-palette'));

export default function Header({ home = false }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const prefix = home ? '' : '/';

  useEffect(() => {
    if (!home) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-(--z-skip) bg-accent text-accent-ink px-3 py-2 text-sm"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-(--z-header) bg-paper/70 backdrop-blur-md border-b border-line/70">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="tabular text-sm font-medium tracking-tight" aria-label="Ht-code home">
            <span className="text-accent">&gt;_</span> ht-code<span className="caret ml-1 h-3.5 w-1.5" />
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`${prefix}#${n.id}`}
                aria-current={active === n.id ? 'location' : undefined}
                className={`tabular transition-colors hover:text-accent ${active === n.id ? 'text-accent' : 'text-ink-2'}`}
              >
                <ScrambleText text={n.label.toLowerCase()} onHover />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5 text-sm">
            <button
              type="button"
              onClick={openPalette}
              className="tabular inline-flex items-center gap-2 rounded-sm border border-line px-2.5 py-1.5 text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              Menu <kbd>⌘K</kbd>
            </button>
            <a href={site.resume} className="link-line">Résumé</a>
          </div>

          <button
            type="button"
            className="md:hidden size-11 -mr-2 grid place-items-center"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`md:hidden fixed inset-0 z-(--z-menu) bg-paper pt-20 px-5 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          className="absolute right-3 top-2.5 size-11 grid place-items-center"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`${prefix}#${n.id}`}
              onClick={() => setOpen(false)}
              className="display text-5xl py-3 border-b border-line"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <p className="mt-8 text-sm">
          <a href={site.resume} className="link-line">Résumé</a>
        </p>
      </div>
    </>
  );
}
