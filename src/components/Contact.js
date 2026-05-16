'use client';

const Contact = () => {
    return (
        <section className="py-32 relative bg-mesh overflow-hidden border-t border-white/5" id="contact">
            <div className="aura-blob aura-primary" style={{ top: 'auto', bottom: '-20%', left: '20%' }}></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card text-primary mb-10 shadow-2xl">
                    <span className="material-symbols-outlined text-4xl">terminal</span>
                </div>

                <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Ready to <span className="text-gradient">Collaborate?</span></h2>

                <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-mono leading-relaxed">
          // Whether you're looking for a lead developer, a consultant for system architecture, or a partner for your next MVP, I'm just a command away.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
                    <a
                        className="group relative inline-flex items-center justify-center gap-4 bg-primary text-white text-lg font-black px-10 py-5 rounded-2xl hover:bg-primary-dark transition-all shadow-2xl shadow-primary/40 font-mono uppercase tracking-tighter overflow-hidden"
                        href="mailto:damilolaolawoore@gmail.com"
                    >
                        <span className="relative z-10">Initialize Chat</span>
                        <span className="material-symbols-outlined text-2xl group-hover:translate-x-2 transition-transform relative z-10">send</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    </a>

                    <a
                        className="inline-flex items-center justify-center gap-4 glass-card text-white border border-white/10 text-lg font-black px-10 py-5 rounded-2xl hover:bg-white/5 hover:border-primary/50 transition-all font-mono uppercase tracking-tighter"
                        href="/Damilola-Olawoore-Resume.pdf"
                        download
                    >
                        <span>Read CV</span>
                        <span className="material-symbols-outlined text-2xl">download</span>
                    </a>
                </div>

                <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center glass-card rounded-xl text-primary font-mono font-black text-xl border border-white/10">
                            &gt;_
                        </div>
                        <span className="font-black text-2xl font-mono text-white tracking-tighter">
                            &lt;Ht-<span className="text-primary">code</span>/&gt;
                        </span>
                    </div>

                    <div className="flex gap-10 font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                        <a className="hover:text-primary transition-colors" href="https://github.com/dammycute" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a className="hover:text-primary transition-colors" href="https://x.com/ht__code" target="_blank" rel="noopener noreferrer">X / Twitter</a>
                        <a className="hover:text-primary transition-colors" href="https://www.linkedin.com/in/htcode/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>

                    <p className="text-slate-600 text-[10px] font-mono font-bold uppercase tracking-widest">
                        © 2026 Ht-code • Built for Scale
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
