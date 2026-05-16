'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const GAME_BASE = 'https://color-fill-game.vercel.app';

const techStack = ['Next.js', 'Supabase', 'Real-time', 'WebSockets', 'TypeScript'];

export default function ColorFloodPage() {
  const [navHidden, setNavHidden] = useState(false);
  const [gameSrc, setGameSrc] = useState(GAME_BASE);
  const gameContainerRef = useRef(null);

  const toggleFullscreen = useCallback(() => {
    const el = gameContainerRef.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">
      {/* Navigation */}
      {!navHidden && (
        <nav className="fixed top-0 left-0 right-0 z-[100] py-3 bg-white/90 dark:bg-background-dark/90 border-b border-gray-200 dark:border-slate-800 backdrop-blur-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded text-white font-mono font-bold text-lg">
                &gt;_
              </div>
              <span className="text-xl font-bold tracking-tight font-mono">
                &lt;Ht-<span className="text-primary">code</span>/&gt;
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setNavHidden(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-primary transition-all active:scale-90 border border-slate-200 dark:border-slate-700"
                title="Hide navigation"
              >
                <span className="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {!navHidden && <div className="h-16" />}

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Show nav button when hidden */}
        {navHidden && (
          <button
            onClick={() => setNavHidden(false)}
            className="mb-6 flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">visibility</span>
            Show navigation
          </button>
        )}

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-3xl shrink-0">
              🎨
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Color Flood
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-1">
                Real-time multiplayer color flood puzzle game.
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono font-bold bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/dammycute/color-fill-game.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded text-sm font-bold font-mono hover:border-primary/50 hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-lg">code</span>
              GitHub
            </a>
            <a
              href={GAME_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded text-sm font-bold font-mono hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              Live Demo
            </a>
          </div>
        </div>

        {/* Play modes + toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setGameSrc(`${GAME_BASE}/?mode=solo`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded text-sm font-bold font-mono hover:bg-green-500/20 transition-all"
            >
              <span>▶</span>
              Play Solo
            </button>
            <button
              onClick={() => setGameSrc(`${GAME_BASE}/?mode=group`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded text-sm font-bold font-mono hover:bg-blue-500/20 transition-all"
            >
              <span>👥</span>
              Play Multiplayer
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-primary transition-all active:scale-90 border border-slate-200 dark:border-slate-700"
              title="Toggle fullscreen"
            >
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Game iframe */}
        <div
          ref={gameContainerRef}
          className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-2xl"
        >
          <iframe
            src={gameSrc}
            title="Color Flood Game"
            className="w-full"
            style={{ height: '700px' }}
            loading="lazy"
            allow="clipboard-write; fullscreen"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 pb-8 text-center">
          <p className="text-xs font-mono text-slate-500">
            Game by{' '}
            <a
              href="https://github.com/dammycute"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ht-code
            </a>
            {' · '}
            <Link href="/" className="text-primary hover:underline">
              Back to portfolio
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
