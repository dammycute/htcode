'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CaseStudyPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const monthId = params.monthId;
                const projectIndex = parseInt(params.projectIndex);

                if (monthId === 'work') {
                    const response = await fetch('/api/work-projects');
                    const data = await response.json();
                    if (data[projectIndex]) {
                        setProject(data[projectIndex]);
                    }
                } else {
                    const response = await fetch('/api/monthly-updates');
                    const data = await response.json();
                    const month = data.monthlyProjects.find(m => m.id === monthId);
                    if (month && month.projects[projectIndex]) {
                        setProject(month.projects[projectIndex]);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project:', error);
                setLoading(false);
            }
        };

        fetchProject();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0f19] flex items-center justify-center">
                <div className="animate-pulse text-primary font-mono text-xl">Loading Case Study...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0c0f19] flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/updates" className="text-primary hover:underline">Back to Updates</Link>
                </div>
            </div>
        );
    }

    const { title, description, techStack, tags, sections, caseStudy } = project;

    return (
        <div className="bg-[#0c0f19] min-h-screen text-slate-300 font-sans selection:bg-primary/30">
            {/* Header Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0c0f19]/80 border-b border-slate-800">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/#projects" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="font-mono text-sm uppercase tracking-widest">Back to Projects</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em]">Technical Deep Dive</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {techStack?.map((tech, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono text-primary uppercase tracking-wider">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar / Context */}
                    <aside className="lg:col-span-4 space-y-12 order-2 lg:order-1">
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 mb-4">Metadata</h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-white text-sm font-bold">Timeline</dt>
                                    <dd className="text-slate-400 text-sm mt-1">{project.dateRange}</dd>
                                </div>
                                <div>
                                    <dt className="text-white text-sm font-bold">Role</dt>
                                    <dd className="text-slate-400 text-sm mt-1">{project.role || (monthId === 'work' ? 'Lead Developer' : 'Developer')}</dd>
                                </div>
                                <div>
                                    <dt className="text-white text-sm font-bold">Status</dt>
                                    <dd className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                                        <span className={`size-2 rounded-full ${project.status === 'complete' ? 'bg-green-500' : 'bg-primary'}`}></span>
                                        <span className="capitalize">{project.status}</span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 mb-4">Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags?.map((tag, i) => (
                                    <span key={i} className="text-sm text-slate-400">#{tag.replace('#', '')}</span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Content Section */}
                    <div className="lg:col-span-8 space-y-16 order-1 lg:order-2">
                        {/* Summary / Challenge */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-primary font-mono text-lg">01.</span> The Challenge
                            </h2>
                            <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed space-y-4">
                                <p>{caseStudy?.challenge || sections?.challenges || "Abstracting the core business logic to ensure it can scale across multiple microservices while maintaining strictly consistent state."}</p>
                            </div>
                        </section>

                        {/* Architecture / Logic */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-primary font-mono text-lg">02.</span> Technical Architecture
                            </h2>
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
                                <div className="font-mono text-sm text-slate-300">
                                    <div className="flex items-center gap-2 text-primary mb-4">
                                        <span className="material-symbols-outlined text-sm">schema</span>
                                        <span>System Flow</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {caseStudy?.architecture?.map((step, i) => (
                                            <li key={i} className="flex gap-4">
                                                <span className="text-slate-600">[{i + 1}]</span>
                                                <span>{step}</span>
                                            </li>
                                        )) || (
                                                <>
                                                    <li className="flex gap-4"><span className="text-slate-600">[1]</span> <span>Request intercepted via JWT Authentication Layer</span></li>
                                                    <li className="flex gap-4"><span className="text-slate-600">[2]</span> <span>Business logic executed in atomic database transactions</span></li>
                                                    <li className="flex gap-4"><span className="text-slate-600">[3]</span> <span>Event triggers pushed to Redis for background processing</span></li>
                                                </>
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* The "How I Solved It" */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-primary font-mono text-lg">03.</span> Solution & Implementation
                            </h2>
                            <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed space-y-6">
                                {caseStudy?.implementation ? (
                                    <p>{caseStudy.implementation}</p>
                                ) : (
                                    <p>The solution focused on modularizing the backend codebase using the Repository Pattern. By separating data access from service logic, we achieved 95% unit test coverage and significantly reduced regression bugs during the scale-up phase.</p>
                                )}

                                <div className="bg-[#1e2330] rounded-lg p-4 font-mono text-xs border border-slate-700/50">
                                    <div className="flex justify-between mb-2 text-slate-500">
                                        <span>// Technical Focus</span>
                                        <span className="text-primary">Snippet</span>
                                    </div>
                                    <div className="text-slate-300">
                                        {caseStudy?.codeSnippet || "async function processTransaction(data) {\n  const result = await db.transaction(async (tx) => {\n    // Complex business logic under NDA\n    return await service.execute(data, { tx });\n  });\n  return result;\n}"}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Outcomes */}
                        <section className="bg-slate-900/30 border border-primary/10 rounded-2xl p-8 mb-16">
                            <h2 className="text-xl font-bold text-white mb-8">Key Outcomes & Metrics</h2>
                            <div className="grid grid-cols-2 gap-8">
                                {caseStudy?.metrics?.map((metric, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-black text-primary mb-1">{metric.value}</div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{metric.label}</div>
                                    </div>
                                )) || (
                                        <>
                                            <div>
                                                <div className="text-3xl font-black text-primary mb-1">99.9%</div>
                                                <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Uptime Reliability</div>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-black text-primary mb-1">-40%</div>
                                                <div className="text-xs font-mono uppercase tracking-widest text-slate-500">API Latencies</div>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </section>

                        {/* Reflection Section */}
                        {(caseStudy?.strengths || caseStudy?.improvements) && (
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-800">
                                {caseStudy?.strengths && (
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-green-500">task_alt</span>
                                            Key Strengths
                                        </h3>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            {caseStudy.strengths.map((s, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-slate-600">•</span>
                                                    <span>{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {caseStudy?.improvements && (
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">rocket_launch</span>
                                            Future Improvements
                                        </h3>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            {caseStudy.improvements.map((imp, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-slate-600">•</span>
                                                    <span>{imp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </main>

            {/* CTA */}
            <footer className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-800 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Interested in the full technical stack?</h3>
                <Link href="/#contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105">
                    Start a Conversation
                    <span className="material-symbols-outlined text-sm">chat_bubble</span>
                </Link>
            </footer>
        </div>
    );
}
