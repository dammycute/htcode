'use client';

import Terminal from './Terminal';

const About = () => {
    const terminalLines = [
        { prefix: "➜", text: "cat philosophy.txt", color: "text-blue-400" },
        { prefix: "", text: "I believe in building fast and architecting for scale. Every project is an opportunity to push the boundaries of backend engineering.", color: "text-slate-400" },
        { prefix: "➜", text: "ls skills/backend", color: "text-blue-400" },
        { prefix: "", text: "Python  Django  Celery  PostgreSQL  Redis  RabbitMQ", color: "text-green-400" },
        { prefix: "➜", text: "cat current_focus.json", color: "text-blue-400" },
        { prefix: "", text: "{", color: "text-purple-400" },
        { prefix: "", text: "  \"role\": \"Software Engineer\",", color: "text-slate-300" },
        { prefix: "", text: "  \"interest\": \"Decentralized Systems & AI\",", color: "text-slate-300" },
        { prefix: "", text: "  \"location\": \"Remote / Hybrid\"", color: "text-slate-300" },
        { prefix: "", text: "}", color: "text-purple-400" }
    ];

    return (
        <section className="py-32 relative bg-background-dark overflow-hidden border-t border-white/5" id="about">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <span className="text-primary font-mono text-sm font-bold tracking-[0.3em] uppercase underline underline-offset-8 decoration-primary/30">Philosophy</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">The "Build Fast, Scale Smart" <span className="text-gradient">Mindset.</span></h2>
                        </div>

                        <p className="text-lg text-slate-400 leading-relaxed font-medium">
                            I specialize in transforming complex business requirements into high-performance, scalable backend architectures. My approach combines rigorous engineering principles with the agility of modern AI-augmented development.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <h3 className="text-xl font-black text-white font-mono uppercase tracking-tighter">Performance</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">Optimizing every millisecond with efficient data structures and asynchronous processing workflows.</p>
                            </div>
                            <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-3xl">security</span>
                                </div>
                                <h3 className="text-xl font-black text-white font-mono uppercase tracking-tighter">Reliability</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">Architecting for high availability and fault tolerance in distributed cloud environments.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <Terminal lines={terminalLines} title="identity.sh" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
