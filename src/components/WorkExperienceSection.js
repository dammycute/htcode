'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WorkExperienceSection() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/work-projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching work projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const getIcon = (category) => {
        switch (category) {
            case 'FINTECH': return 'payments';
            case 'BACKEND': return 'dns';
            case 'EDTECH': return 'school';
            case 'FULLSTACK': return 'web';
            case 'WEB3': return 'shield_lock';
            default: return 'code';
        }
    };

    return (
        <section className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden" id="projects">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 dark:bg-[#111827] opacity-50 skew-x-12 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block font-mono">Current & Past</span>
                    <h2 className="text-3xl lg:text-4xl font-bold">Projects & Experience</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={project.id} className="group rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                            {project.category && (
                                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-bold font-mono rounded-full">
                                    {project.category}
                                </div>
                            )}
                            <div className="relative h-64 overflow-hidden bg-slate-900 border-b border-gray-700">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-left font-mono text-xs text-blue-300 p-8 w-full opacity-60">
                                        <pre className="whitespace-pre-wrap">
                                            {project.codeSnippet || `// ${project.title}\n// Tech Stack: ${project.techStack?.join(', ')}`}
                                        </pre>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 p-4">
                                    <span className="material-symbols-outlined text-slate-700 text-6xl opacity-20">
                                        {getIcon(project.category)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {project.tags?.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 text-xs font-mono font-bold bg-primary/10 text-primary rounded">
                                            {tag.replace('#', '')}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">{project.description}</p>

                                <div className="flex flex-wrap items-center gap-6">
                                    {project.demo && (
                                        <a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4" href={project.demo} target="_blank" rel="noopener noreferrer">
                                            Visit Site <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        </a>
                                    )}

                                    {project.github && (
                                        <a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4" href={project.github} target="_blank" rel="noopener noreferrer">
                                            {project.id === 'secure-todo-app' ? 'Backend' : 'View on GitHub'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </a>
                                    )}

                                    {project.frontend_github && (
                                        <a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4" href={project.frontend_github} target="_blank" rel="noopener noreferrer">
                                            Frontend <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </a>
                                    )}

                                    {!project.github && !project.demo && !project.frontend_github && (
                                        <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 cursor-not-allowed">
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                            Architecture Confidential
                                        </div>
                                    )}

                                    {project.caseStudy && (
                                        <Link
                                            href={`/case-study/work/${index}`}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4"
                                        >
                                            View Case Study <span className="material-symbols-outlined text-sm">auto_graph</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
