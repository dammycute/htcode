'use client';

import { useEffect, useState } from 'react';
import Terminal from './Terminal';

const Hero = () => {
    const terminalLines = [
        { prefix: "➜", text: "cat developer_profile.json", color: "text-blue-400" },
        { prefix: "", text: "{", color: "text-purple-400" },
        { prefix: "", text: "  \"name\": \"Damilola Olawoore\",", color: "text-slate-300" },
        { prefix: "", text: "  \"focus\": \"Scalable Backends\",", color: "text-yellow-400" },
        { prefix: "", text: "  \"languages\": [\"Python\", \"TypeScript\", \"SQL\"],", color: "text-slate-300" },
        { prefix: "", text: "  \"architecture\": \"Event-Driven\",", color: "text-green-400" },
        { prefix: "", text: "  \"status\": \"Building the future\"", color: "text-slate-300" },
        { prefix: "", text: "}", color: "text-purple-400" }
    ];

    return (
        <header className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-mesh">
            {/* Dynamic Background Elements */}
            <div className="aura-blob aura-primary"></div>
            <div className="aura-blob aura-secondary" style={{ bottom: '10%', right: '10%' }}></div>

            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
                    backgroundSize: "4rem 4rem"
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
                <div className="flex flex-col gap-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold w-fit mx-auto lg:mx-0 animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        AVAILABLE FOR NEW CHALLENGES
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-8xl font-black leading-[1] tracking-tight animate-fade-in-up delay-100">
                            Building <br />
                            <span className="text-gradient">Robust Systems.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200 font-mono italic">
              // Software Engineer specializing in backend architecture, AI integration, and high-performance web applications.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 animate-fade-in-up delay-300">
                        <a className="group relative flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-lg font-bold transition-all hover:bg-primary-dark hover:scale-105 shadow-xl shadow-primary/20 font-mono text-sm overflow-hidden" href="#projects">
                            <span className="relative z-10">EXPLORE WORK</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform relative z-10">rocket_launch</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
                        </a>
                        <a className="flex items-center justify-center gap-2 bg-slate-800/50 backdrop-blur-sm text-white border border-white/10 px-8 py-4 rounded-lg font-bold transition-all hover:bg-slate-700 hover:border-primary/50 font-mono text-sm" href="#contact">
                            GET IN TOUCH
                        </a>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 animate-fade-in-up delay-500">
                        <span className="uppercase tracking-[0.2em] text-[10px] text-slate-500 font-bold font-mono">Core Stack</span>
                        <div className="flex gap-6 opacity-60 flex-wrap justify-center lg:justify-start grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded">Django</span>
                            <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded">PostgreSQL</span>
                            <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded">Redis</span>
                            <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded">Next.js</span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative animate-fade-in-up delay-300">
                    <Terminal lines={terminalLines} title="stack.config.json" />

                    {/* Floating Stats Card */}
                    <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-xl border border-white/10 shadow-2xl flex items-center gap-6 animate-float z-20">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-mono mb-1">Experience</span>
                            <span className="text-2xl font-black text-primary font-mono leading-none">3+ Yrs</span>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-mono mb-1">Efficiency</span>
                            <span className="text-2xl font-black text-green-400 font-mono leading-none">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>

            <a className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-primary transition-colors animate-bounce cursor-pointer font-mono" href="#expertise">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
                <span className="material-symbols-outlined text-sm">keyboard_double_arrow_down</span>
            </a>
        </header>
    );
};

export default Hero;
