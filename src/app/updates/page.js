'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UpdatesPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [filter, setFilter] = useState('all');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetchUpdates();
        // Check authentication
        const auth = localStorage.getItem('htcode_auth') === 'true';
        setIsAuthenticated(auth);
    }, []);

    const fetchUpdates = async () => {
        try {
            const response = await fetch('/api/monthly-updates');
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch updates:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (monthId, projectIndex) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch('/api/monthly-updates', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monthId, projectIndex }),
            });

            if (response.ok) {
                fetchUpdates();
            }
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleStatusUpdate = async (monthId, projectIndex, newStatus) => {
        const month = data.monthlyProjects.find(m => m.id === monthId);
        const project = month.projects[projectIndex];

        const updatedProject = { ...project, status: newStatus };

        try {
            const response = await fetch('/api/monthly-updates', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monthId, projectIndex, updatedProject }),
            });

            if (response.ok) {
                fetchUpdates();
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleArchiveMonth = async (monthId) => {
        if (!confirm('Archive this month and start a new one?')) return;

        try {
            const response = await fetch('/api/monthly-updates', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monthId, action: 'archive-month' }),
            });

            if (response.ok) {
                fetchUpdates();
            }
        } catch (error) {
            console.error('Failed to archive month:', error);
        }
    };

    const getFilteredProjects = (month) => {
        if (filter === 'all') return month.projects;
        return month.projects.filter(p => {
            if (filter === 'in-progress') return p.status === 'in-progress';
            if (filter === 'complete') return p.status === 'complete';
            if (filter === 'planned') return p.status === 'planned';
            return true;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#111522]">
                <div className="text-primary text-xl font-mono">Loading updates...</div>
            </div>
        );
    }

    const activeMonth = data?.monthlyProjects?.find(m => m.status === 'active');

    return (
        <div className="bg-[#111522] min-h-screen flex flex-col overflow-x-hidden text-white">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-[#232c48] bg-[#111522]/90 backdrop-blur-md px-4 lg:px-10 py-3">
                <div className="flex items-center justify-between whitespace-nowrap max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-4 text-white">
                        <div className="size-8 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">terminal</span>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">&lt;Ht-code/&gt;</h2>
                    </Link>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="hidden md:flex items-center gap-9">
                            <Link href="/" className="text-[#919fca] hover:text-white transition-colors text-sm font-medium leading-normal">Home</Link>
                            <Link href="/#projects" className="text-[#919fca] hover:text-white transition-colors text-sm font-medium leading-normal">Projects</Link>
                            <Link href="/updates" className="text-white text-sm font-medium leading-normal">Monthly Log</Link>
                            <Link href="/admin" className="text-[#919fca] hover:text-white transition-colors text-sm font-medium leading-normal">Admin</Link>
                        </div>
                        <Link href="/#contact" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">Contact</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 max-w-7xl mx-auto w-full pt-8 pb-20 px-4 lg:px-10 gap-8">
                {/* Left Sidebar */}
                <aside className="hidden lg:flex w-72 flex-col gap-8 shrink-0">
                    <div className="flex flex-col gap-4 sticky top-24">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-white text-base font-bold leading-normal mb-2 uppercase tracking-wider text-xs text-[#919fca]">Project Filters</h1>
                            <button
                                onClick={() => setFilter('all')}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${filter === 'all' ? 'bg-primary/10 border border-primary/20 text-white' : 'hover:bg-[#1a1d26] text-[#919fca] hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${filter === 'all' ? 'text-primary' : 'group-hover:text-primary'} group-hover:scale-110 transition-transform`}>view_list</span>
                                <p className="text-sm font-medium leading-normal">All Updates</p>
                            </button>
                            <button
                                onClick={() => setFilter('in-progress')}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${filter === 'in-progress' ? 'bg-primary/10 border border-primary/20 text-white' : 'hover:bg-[#1a1d26] text-[#919fca] hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${filter === 'in-progress' ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>pending_actions</span>
                                <p className="text-sm font-medium leading-normal">In Progress</p>
                            </button>
                            <button
                                onClick={() => setFilter('complete')}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${filter === 'complete' ? 'bg-primary/10 border border-primary/20 text-white' : 'hover:bg-[#1a1d26] text-[#919fca] hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${filter === 'complete' ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>check_circle</span>
                                <p className="text-sm font-medium leading-normal">Completed</p>
                            </button>
                            <button
                                onClick={() => setFilter('planned')}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${filter === 'planned' ? 'bg-primary/10 border border-primary/20 text-white' : 'hover:bg-[#1a1d26] text-[#919fca] hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${filter === 'planned' ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>schedule</span>
                                <p className="text-sm font-medium leading-normal">Planned</p>
                            </button>
                        </div>

                        {/* Info Card */}
                        <div className="mt-8 p-0 rounded-xl overflow-hidden border border-[#232c48] bg-[#1a1d26]">
                            <div className="h-24 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(0deg, rgba(26, 29, 38, 0.9) 0%, rgba(39, 90, 241, 0.2) 100%), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23111522\'/%3E%3Cpath d=\'M20 20l60 60M80 20L20 80\' stroke=\'%23275af1\' stroke-width=\'2\'/%3E%3C/svg%3E")' }}></div>
                            <div className="p-4 -mt-8 relative z-10">
                                <div className="size-12 rounded-full bg-[#0077b5] flex items-center justify-center text-white border-4 border-[#1a1d26] mb-3">
                                    <span className="material-symbols-outlined">calendar_month</span>
                                </div>
                                <h3 className="text-white font-bold text-sm mb-1">Monthly Tracking</h3>
                                <p className="text-[#919fca] text-xs leading-relaxed">
                                    Current: <span className="text-green-400 font-medium">{data?.currentMonth}</span>. Track weekly progress and archive when done.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex flex-col flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#232c48]">
                        <div className="flex flex-col gap-2 max-w-2xl">
                            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Monthly Project Updates</h1>
                            <p className="text-[#919fca] text-base font-normal leading-relaxed">
                                Tracking backend architecture, decentralized systems, and AI-assisted development month by month.
                            </p>
                        </div>
                        <Link href="/admin" className="flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            <span className="truncate">Add New Update</span>
                        </Link>
                    </div>

                    {/* Updates Feed */}
                    <div className="flex flex-col gap-8">
                        {data?.monthlyProjects?.map((month) => {
                            const filteredProjects = getFilteredProjects(month);
                            if (filteredProjects.length === 0) return null;

                            return (
                                <div key={month.id} className="space-y-6">
                                    {/* Month Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-bold text-white">{month.month}</h2>
                                            {month.status === 'active' && (
                                                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                    Active Month
                                                </span>
                                            )}
                                            {month.status === 'archived' && (
                                                <span className="bg-gray-500/20 text-gray-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                    Archived
                                                </span>
                                            )}
                                        </div>
                                        {month.status === 'active' && isAuthenticated && (
                                            <button
                                                onClick={() => handleArchiveMonth(month.id)}
                                                className="text-sm text-[#919fca] hover:text-primary transition-colors font-mono flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">archive</span>
                                                Archive & Start New Month
                                            </button>
                                        )}
                                    </div>

                                    {/* Projects */}
                                    {filteredProjects.map((project, idx) => {
                                        const actualIndex = month.projects.indexOf(project);
                                        const isInProgress = project.status === 'in-progress';
                                        const isComplete = project.status === 'complete';

                                        return (
                                            <article
                                                key={actualIndex}
                                                className={`flex flex-col rounded-xl border ${isInProgress
                                                    ? 'border-primary/30 bg-[#1a1d26] shadow-md shadow-primary/5'
                                                    : 'border-[#232c48] bg-[#1a1d26]/50 hover:bg-[#1a1d26]'
                                                    } overflow-hidden transition-colors`}
                                            >
                                                {/* Project Header */}
                                                <div className="flex items-center justify-between px-6 py-4 bg-[#1e2330] border-b border-[#232c48]">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`${isInProgress ? 'bg-primary/20 text-primary' :
                                                            isComplete ? 'bg-gray-700 text-gray-300' :
                                                                'bg-gray-700 text-gray-300'
                                                            } text-xs font-bold px-2 py-1 rounded uppercase tracking-wide`}>
                                                            {project.weekNumber}
                                                        </span>
                                                        <span className="text-[#919fca] text-sm">{project.dateRange}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        {isInProgress && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="relative flex h-2.5 w-2.5">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                                                                </span>
                                                                <span className="text-yellow-500 text-xs font-bold uppercase tracking-wide">In Progress</span>
                                                            </div>
                                                        )}
                                                        {isComplete && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="material-symbols-outlined text-green-500 text-[18px]">verified</span>
                                                                <span className="text-green-500 text-xs font-bold uppercase tracking-wide">Completed</span>
                                                            </div>
                                                        )}
                                                        {project.status === 'planned' && (
                                                            <span className="text-blue-400 text-xs font-bold uppercase tracking-wide">Planned</span>
                                                        )}
                                                        {month.status === 'active' && isAuthenticated && (
                                                            <div className="flex items-center gap-2">
                                                                <select
                                                                    value={project.status}
                                                                    onChange={(e) => handleStatusUpdate(month.id, actualIndex, e.target.value)}
                                                                    className="text-xs bg-[#111522] border border-[#232c48] rounded px-2 py-1 text-white"
                                                                >
                                                                    <option value="planned">Planned</option>
                                                                    <option value="in-progress">In Progress</option>
                                                                    <option value="complete">Complete</option>
                                                                </select>
                                                                <button
                                                                    onClick={() => handleDelete(month.id, actualIndex)}
                                                                    className="text-red-400 hover:text-red-500 transition-colors"
                                                                >
                                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Project Content */}
                                                <div className="p-6 md:p-8 flex flex-col gap-6">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                                            {project.caseStudy && (
                                                                <Link
                                                                    href={`/case-study/${month.id}/${actualIndex}`}
                                                                    className="text-xs font-mono text-primary hover:text-white border border-primary/30 hover:bg-primary/10 px-3 py-1.5 rounded transition-all flex items-center gap-2"
                                                                >
                                                                    View Case Study
                                                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <p className="text-[#919fca]">{project.description}</p>
                                                    </div>

                                                    {/* Sections Grid */}
                                                    {project.sections && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {project.sections.progress && (
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-blue-400">trending_up</span>
                                                                        Progress
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.progress}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {project.sections.challenges && (
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-orange-400">warning</span>
                                                                        Challenges
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.challenges}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {project.sections.solutions && (
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                                                                        Solutions Implemented
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.solutions}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {project.sections.learnings && (
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-purple-400">lightbulb</span>
                                                                        Key Learnings
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.learnings}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {project.sections.solution && (
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-blue-400">code</span>
                                                                        Solution
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.solution}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {project.sections.outcome && (
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-purple-400">stars</span>
                                                                        Outcome
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.outcome}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {project.sections.keyLearning && (
                                                                <div className="flex flex-col gap-2 md:col-span-2">
                                                                    <div className="flex items-center gap-2 text-white font-semibold">
                                                                        <span className="material-symbols-outlined text-purple-400">school</span>
                                                                        Key Learning
                                                                    </div>
                                                                    <p className="text-sm text-[#919fca] leading-relaxed bg-[#111522] p-3 rounded-lg border border-[#232c48]">
                                                                        {project.sections.keyLearning}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Tech Stack & Tags */}
                                                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#232c48]">
                                                        <span className="text-xs text-[#919fca] mr-2">Tech Stack:</span>
                                                        {project.techStack?.map((tech, i) => (
                                                            <span key={i} className="px-2.5 py-1 rounded-full bg-[#111522] border border-[#232c48] text-xs text-white font-medium">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.tags?.map((tag, i) => (
                                                            <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary border border-primary/20">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
