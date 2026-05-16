'use client';

const Expertise = () => {
    const skills = [
        {
            title: "Languages",
            desc: "Robust logic and modern interfaces using industry standards.",
            icon: "code",
            color: "blue",
            tags: ["Python", "Next.js", "SQL", "Go"]
        },
        {
            title: "Data Store",
            desc: "Architecting high-availability and persistent data layers.",
            icon: "database",
            color: "purple",
            tags: ["PostgreSQL", "MongoDB", "Redis", "Pinecone"]
        },
        {
            title: "Async Systems",
            desc: "Handling distributed tasks and real-time communications.",
            icon: "hub",
            color: "emerald",
            tags: ["Celery", "RabbitMQ", "WebSockets", "Kafka"]
        },
        {
            title: "AI Integration",
            desc: "Leveraging LLMs and RAG for augmented developer workflows.",
            icon: "smart_toy",
            color: "orange",
            tags: ["OpenAI", "LangChain", "VectorDB", "AutoGPT"]
        }
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-background-dark border-t border-white/5" id="expertise">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col gap-4 mb-20 text-center lg:text-left">
                    <span className="text-primary font-mono text-sm font-bold tracking-[0.3em] uppercase">Specialization</span>
                    <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">Expertise & <br /><span className="text-gradient">Core Tech Stack.</span></h2>
                    <p className="text-slate-400 max-w-2xl font-mono text-sm leading-relaxed mt-4">
            // Building scalable digital products requires a deep understanding of the entire stack. Here are my primary tools of choice.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, idx) => (
                        <div
                            key={idx}
                            className="group p-8 rounded-2xl glass-card border border-white/5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-all duration-500 bg-${skill.color}-500/10 text-${skill.color}-500 group-hover:bg-${skill.color}-500 group-hover:text-white group-hover:shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.5)]`}>
                                <span className="material-symbols-outlined text-3xl">{skill.icon}</span>
                            </div>
                            <h3 className="text-xl font-black mb-4 font-mono text-white group-hover:text-primary transition-colors">{skill.title}</h3>
                            <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">{skill.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {skill.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="text-[10px] font-bold font-mono px-2.5 py-1 bg-white/5 rounded-md text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
