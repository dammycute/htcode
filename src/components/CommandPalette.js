'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { getProjects, hasCaseStudy, nav, site } from '@/lib/site';

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const returnFocus = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setIndex(0);
    returnFocus.current?.focus?.();
  }, []);

  const commands = useMemo(() => {
    const go = (href) => () => router.push(href);
    const ext = (href) => () => window.open(href, '_blank', 'noopener');
    const list = nav.map((n) => ({ group: 'Go to', label: n.label, run: go(`/#${n.id}`) }));
    getProjects().forEach((p) =>
      list.push({
        group: 'Projects',
        label: p.title,
        hint: hasCaseStudy(p) ? 'case study' : 'live site',
        run: hasCaseStudy(p) ? go(`/case-study/${p.slug}`) : ext(p.demo || p.github),
      })
    );
    list.push(
      { group: 'Do', label: 'Play Color Flood', hint: 'opens in new tab', run: ext(site.colorFlood) },
      { group: 'Do', label: 'Download résumé', run: () => window.open(site.resume, '_blank') },
      {
        group: 'Do',
        label: 'Copy email address',
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
      },
      ...site.socials.map((s) => ({ group: 'Links', label: s.label, hint: 'opens in new tab', run: ext(s.href) }))
    );
    return list;
  }, [router]);

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));
  const active = Math.min(index, Math.max(results.length - 1, 0));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        returnFocus.current = document.activeElement;
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      returnFocus.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  const run = (c) => {
    if (!c) return;
    if (!c.keepOpen) close();
    c.run();
  };

  const onInputKey = (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((active + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((active - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') run(results[active]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-(--z-boot) flex items-start justify-center bg-paper/70 px-4 pt-[16vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-md border border-line bg-paper-2 shadow-2xl"
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.75, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="tabular text-accent">&gt;</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-ink-3"
              />
              <kbd className="tabular text-xs text-ink-3">esc</kbd>
            </div>
            <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-3">Nothing matches “{query}”.</li>}
              {results.map((c, i) => (
                <li
                  key={`${c.group}-${c.label}`}
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(c)}
                  className={`flex cursor-pointer items-center justify-between rounded-sm px-3 py-2.5 text-sm ${i === active ? 'bg-accent text-accent-ink' : 'text-ink-2'}`}
                >
                  <span>
                    <span className={`tabular mr-3 text-xs ${i === active ? 'opacity-70' : 'text-ink-3'}`}>{c.group}</span>
                    {c.label === 'Copy email address' && copied ? 'Copied to clipboard' : c.label}
                  </span>
                  {c.hint && <span className={`tabular text-xs ${i === active ? 'opacity-70' : 'text-ink-3'}`}>{c.hint}</span>}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
