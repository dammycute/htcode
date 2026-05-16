'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Expertise', href: '#expertise' },
        { name: 'Work', href: '#projects' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4 glass-nav shadow-2xl' : 'py-8 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-xl text-white font-mono font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            &gt;_
                        </div>
                        <span className="text-2xl font-black tracking-tighter font-mono group-hover:text-primary transition-colors">
                            &lt;Ht-<span className="text-primary">code</span>/&gt;
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2 glass-card px-2 py-1.5 rounded-full border border-white/5 shadow-inner">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                className="text-xs font-bold px-5 py-2 rounded-full hover:bg-white/5 hover:text-primary transition-all font-mono uppercase tracking-widest text-slate-400"
                                href={link.href}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="/Damilola-Olawoore-Resume.pdf"
                            download
                            className="hidden md:flex items-center gap-3 bg-white text-black hover:bg-primary hover:text-white px-6 py-2.5 rounded-full text-xs font-black transition-all transform hover:scale-105 shadow-xl shadow-white/5 font-mono uppercase tracking-tighter"
                        >
                            <span>Resume</span>
                            <span className="material-symbols-outlined text-sm">download</span>
                        </a>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl glass-card text-white active:scale-90 transition-all relative z-[210]"
                            aria-label="Toggle Menu"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-slate-950 z-[9999] flex flex-col transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex items-center justify-between p-8">
                    <span className="font-mono font-black text-primary tracking-[0.3em] text-sm">MENU</span>
                    <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 rounded-xl glass-card flex items-center justify-center">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex flex-col p-10 gap-4 flex-1 overflow-y-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-4xl font-black font-mono hover:text-primary transition-all flex items-center justify-between group py-6 border-b border-white/5"
                            href={link.href}
                        >
                            <span>{link.name}</span>
                            <span className="material-symbols-outlined text-primary text-4xl opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">arrow_right_alt</span>
                        </a>
                    ))}

                    <a
                        href="/Damilola-Olawoore-Resume.pdf"
                        download
                        className="mt-12 flex items-center justify-between bg-primary text-white p-6 rounded-2xl text-xl font-black font-mono shadow-2xl shadow-primary/40 uppercase tracking-tighter"
                    >
                        <span>Download Resume</span>
                        <span className="material-symbols-outlined text-2xl">download</span>
                    </a>
                </div>

                <div className="mt-auto flex justify-center gap-8 pb-16 text-slate-500 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                    <a href="https://github.com/dammycute" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
                    <a href="https://x.com/ht__code" target="_blank" rel="noopener noreferrer" className="hover:text-primary">X / Twitter</a>
                    <a href="https://www.linkedin.com/in/htcode/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
