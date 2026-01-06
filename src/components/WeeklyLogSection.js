'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyLogSection() {
    const [projects, setProjects] = useState([]);
    const [monthId, setMonthId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/monthly-updates');
            const data = await response.json();

            // Get active month's projects
            const activeMonth = data.monthlyProjects?.find(m => m.status === 'active');
            setProjects(activeMonth?.projects || []);
            setMonthId(activeMonth?.id);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setLoading(false);
        }
    };

    // Group projects by week
    const weekGroups = projects.reduce((acc, project) => {
        const weekNum = project.weekNumber;
        if (!acc[weekNum]) {
            acc[weekNum] = [];
        }
        acc[weekNum].push(project);
        return acc;
    }, {});

    const getStatusBadge = (status) => {
        const badges = {
            'in-progress': { text: 'In Progress', color: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' },
            'complete': { text: 'Complete', color: 'bg-green-500/20 text-green-600 dark:text-green-400' },
            'planned': { text: 'Planned', color: 'bg-slate-100 dark:bg-slate-800 text-slate-500' }
        };
        return badges[status] || badges.planned;
    };

    const getWeekHighlight = (projects) => {
        // Check if any project in this week is in-progress
        return projects.some(p => p.status === 'in-progress');
    };

    if (loading) {
        return (
            <section className="py-24 relative overflow-hidden bg-background-light dark:bg-[#0c0f19]" id="weekly-log">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="animate-pulse text-slate-400 font-mono">Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 relative overflow-hidden bg-background-light dark:bg-[#0c0f19]" id="weekly-log">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="mb-12 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block font-mono">Continuous Roadmap</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">6-Month Build Log</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-mono text-sm">
                        &gt; A disciplined schedule of shipping one full-stack project every week for the next 6 months. This is a commitment to continuous iteration.
                    </p>
                </div>

                <div className="grid gap-12">
                    {Object.entries(weekGroups).map(([weekNum, weekProjects], idx) => {
                        const isHighlighted = getWeekHighlight(weekProjects);
                        const weekNumber = weekNum.replace('Week ', '').padStart(2, '0');
                        const firstProject = weekProjects[0];

                        return (
                            <div key={weekNum} className="relative group">
                                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary ${isHighlighted ? 'to-blue-600 opacity-50' : 'to-indigo-600 opacity-10'} rounded-lg blur ${isHighlighted ? 'group-hover:opacity-75' : 'group-hover:opacity-30'} transition duration-1000 group-hover:duration-200`}></div>
                                <div className="relative bg-white dark:bg-surface-dark rounded-lg p-6 lg:p-8 border border-slate-200 dark:border-slate-700">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        {/* Week Number */}
                                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-24 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-4 md:pb-0 md:pr-4">
                                            <span className="text-xs font-mono uppercase text-slate-500">Week</span>
                                            <span className={`text-4xl font-bold ${isHighlighted ? 'text-primary' : 'text-slate-400 group-hover:text-primary'} transition-colors`}>
                                                {weekNumber}
                                            </span>
                                            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded mt-2 ${getStatusBadge(firstProject.status).color}`}>
                                                {getStatusBadge(firstProject.status).text}
                                            </span>
                                            <span className="text-xs text-slate-500 mt-1 text-center">{firstProject.dateRange}</span>
                                        </div>

                                        {/* Projects Grid */}
                                        <div className="grid lg:grid-cols-2 gap-8 w-full">
                                            {weekProjects.map((project, projectIdx) => (
                                                <div
                                                    key={projectIdx}
                                                    className={`space-y-4 ${projectIdx === 1 ? 'lg:border-l lg:border-slate-700/50 lg:pl-8' : ''}`}
                                                >
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="material-symbols-outlined text-slate-400">
                                                            {project.techStack?.[0]?.includes('Django') || project.techStack?.[0]?.includes('Python') ? 'dns' :
                                                                project.techStack?.[0]?.includes('React') || project.techStack?.[0]?.includes('HTML') ? 'web' :
                                                                    project.techStack?.[0]?.includes('Supabase') ? 'restaurant_menu' :
                                                                        'code'}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{project.title}</h3>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                                        {project.description}
                                                        {project.caseStudy && (
                                                            <Link
                                                                href={`/case-study/${monthId}/${projects.indexOf(project)}`}
                                                                className="ml-2 text-primary hover:underline font-mono text-xs uppercase inline-flex items-center gap-1"
                                                            >
                                                                [Case Study]
                                                                <span className="material-symbols-outlined text-[12px]">arrow_outward</span>
                                                            </Link>
                                                        )}
                                                    </p>
                                                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-slate-500">Stack</span>
                                                            <span className="text-purple-400">{project.techStack?.slice(0, 2).join(' + ')}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
                                                            {project.techStack?.slice(0, 3).map((tech, techIdx) => (
                                                                <span key={techIdx} className="border border-slate-600/30 px-1.5 py-0.5 rounded">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                            {project.tags?.map((tag, tagIdx) => (
                                                                <span key={`tag-${tagIdx}`} className="border border-slate-600/30 px-1.5 py-0.5 rounded">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/updates"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-mono text-sm font-bold transition-colors"
                    >
                        View Complete Build Log with Details
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
