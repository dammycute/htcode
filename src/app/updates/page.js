'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function UpdatesPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const { isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch('/api/monthly-updates')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    const getFilteredProjects = (month) => {
        if (filter === 'all') return month.projects;
        return month.projects.filter(p => p.status === filter);
    };

    const handleArchiveMonth = async (monthId) => {
        if (!confirm('Archive this month and start a new one?')) return;

        try {
            const res = await fetch('/api/monthly-updates', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    monthId,
                    action: 'archive-month'
                })
            });

            if (res.ok) {
                const response = await res.json();
                setData(response.data);
            }
        } catch (error) {
            console.error('Failed to archive month:', error);
        }
    };

    const handleDelete = async (monthId, pIndex) => {
        if (!confirm('Delete this update?')) return;

        try {
            const res = await fetch('/api/monthly-updates', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monthId, projectIndex: pIndex })
            });

            if (res.ok) {
                const response = await res.json();
                setData(response.data);
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleUpdateStatus = async (monthId, pIndex, newStatus) => {
        // Find current project state to preserve other fields
        const month = data.monthlyProjects.find(m => m.id === monthId);
        if (!month) return;

        const currentProject = month.projects[pIndex];
        const updatedProject = { ...currentProject, status: newStatus };

        try {
            const res = await fetch('/api/monthly-updates', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    monthId,
                    projectIndex: pIndex,
                    updatedProject
                })
            });

            if (res.ok) {
                const response = await res.json();
                setData(response.data);
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0c0f19] flex items-center justify-center">
            <div className="animate-pulse text-primary font-mono text-xl">Loading Builder Log...</div>
        </div>
    );

    return (
        <div className="bg-[#0c0f19] min-h-screen flex flex-col overflow-x-hidden text-white">
            {/* Navigation */}
            <header className="sticky top-0 z-[100] w-full border-b border-[#232c48] bg-[#0c0f19]/90 backdrop-blur-md px-4 lg:px-10 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                    <Link href="/" className="flex items-center gap-4 text-white">
                        <div className="size-8 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">terminal</span>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-tight">&lt;Ht-code/&gt;</h2>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-9 mr-4">
                            <Link href="/" className="text-[#919fca] hover:text-white transition-colors text-sm font-medium">Home</Link>
                            <Link href="/#projects" className="text-[#919fca] hover:text-white transition-colors text-sm font-medium">Projects</Link>
                            <Link href="/updates" className="text-white text-sm font-medium">Monthly Log</Link>
                            <Link href="/admin" className="text-[#919fca] hover:text-white transition-colors text-sm font-medium">Admin</Link>
                        </div>
                        <Link href="/#contact" className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                            <span>Contact</span>
                        </Link>

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-white z-[110]"
                        >
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white dark:bg-slate-950 z-[9999] flex flex-col transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="font-mono font-bold text-primary tracking-widest text-sm">MENU</span>
                    <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex flex-col p-8 gap-1 flex-1 overflow-y-auto bg-white dark:bg-slate-950">
                    <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-xl font-medium font-mono py-5 border-b border-[#232c48]/50">Home</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/#projects" className="text-xl font-medium font-mono py-5 border-b border-[#232c48]/50">Projects</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/updates" className="text-xl font-medium font-mono text-primary py-5 border-b border-[#232c48]/50">Monthly Log</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/admin" className="text-xl font-medium font-mono py-5 border-b border-[#232c48]/50">Admin Dashboard</Link>

                    <div className="pt-10 pb-4">
                        <p className="text-[#919fca] font-mono text-xs uppercase tracking-widest mb-4">Quick Filters</p>
                        <div className="grid grid-cols-2 gap-3">
                            {['all', 'in-progress', 'complete', 'planned'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => { setFilter(s); setIsMenuOpen(false); }}
                                    className={`px-4 py-3 rounded-lg border text-xs font-bold capitalize transition-all ${filter === s ? 'bg-primary border-primary text-white' : 'border-[#232c48] text-[#919fca] bg-[#1a1d26]'}`}
                                >
                                    {s.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="mt-8 flex items-center justify-center bg-primary text-white p-5 rounded-xl text-lg font-bold font-mono shadow-xl shadow-primary/20">
                        Get in Touch
                    </Link>
                </div>
            </div>

            <div className="flex flex-1 max-w-7xl mx-auto w-full pt-8 pb-20 px-4 lg:px-10 gap-8">
                {/* Left Sidebar */}
                <aside className="hidden lg:flex w-72 flex-col gap-8 shrink-0">
                    <div className="flex flex-col gap-4 sticky top-24">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#919fca] font-bold uppercase tracking-wider text-xs mb-2">Project Filters</h1>
                            {[
                                { id: 'all', icon: 'view_list', label: 'All Updates' },
                                { id: 'in-progress', icon: 'pending_actions', label: 'In Progress' },
                                { id: 'complete', icon: 'check_circle', label: 'Completed' },
                                { id: 'planned', icon: 'schedule', label: 'Planned' }
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setFilter(s.id)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${filter === s.id ? 'bg-primary/10 border border-primary/20 text-white' : 'hover:bg-[#1a1d26] text-[#919fca] hover:text-white'}`}
                                >
                                    <span className={`material-symbols-outlined ${filter === s.id ? 'text-primary' : 'group-hover:text-primary'} transition-transform`}>{s.icon}</span>
                                    <p className="text-sm font-medium">{s.label}</p>
                                </button>
                            ))}
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
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#232c48]">
                        <div className="flex flex-col gap-2 max-w-2xl">
                            <h1 className="text-white text-4xl font-black tracking-tight">Monthly Project Updates</h1>
                            <p className="text-[#919fca] text-base font-normal leading-relaxed">
                                Tracking backend architecture, decentralized systems, and AI-assisted development month by month.
                            </p>
                        </div>
                        <Link href="/admin" className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 transition-colors text-white font-bold shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">add_circle</span>
                            <span>Add Update</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-12">
                        {data?.monthlyProjects?.map((month) => {
                            const filteredProjects = getFilteredProjects(month);
                            if (filteredProjects.length === 0) return null;

                            return (
                                <div key={month.id} className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-bold text-white">{month.month}</h2>
                                            {month.status === 'active' && (
                                                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                                            )}
                                        </div>
                                        {month.status === 'active' && isAuthenticated && (
                                            <button onClick={() => handleArchiveMonth(month.id)} className="text-sm text-[#919fca] hover:text-primary transition-colors font-mono flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">archive</span>
                                                Archive Month
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid gap-6">
                                        {filteredProjects.map((project, idx) => {
                                            const actualIndex = month.projects.indexOf(project);
                                            const isInProgress = project.status === 'in-progress';

                                            return (
                                                <article key={actualIndex} className={`flex flex-col rounded-xl border border-[#232c48] bg-[#1a1d26]/50 overflow-hidden hover:bg-[#1a1d26] transition-all group ${isInProgress ? 'ring-1 ring-primary/30' : ''}`}>
                                                    <div className="flex items-center justify-between px-6 py-4 bg-[#1e2330]/50 border-b border-[#232c48]">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] uppercase tracking-widest text-[#919fca] font-bold">Week {project.weekNumber}</span>
                                                                <span className="text-xs text-[#6474a2]">{project.dateRange}</span>
                                                            </div>
                                                            <div className="h-6 w-[1px] bg-[#232c48]"></div>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${project.status === 'complete' ? 'bg-green-500/10 text-green-400' :
                                                                project.status === 'in-progress' ? 'bg-primary/10 text-primary' : 'bg-slate-500/10 text-slate-400'
                                                                }`}>
                                                                {project.status.replace('-', ' ')}
                                                            </span>
                                                        </div>
                                                        {month.status === 'active' && isAuthenticated && (
                                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <select
                                                                    value={project.status}
                                                                    onChange={(e) => handleUpdateStatus(month.id, actualIndex, e.target.value)}
                                                                    className="bg-[#0c0f19] border border-[#232c48] text-xs text-[#919fca] rounded px-2 py-1 outline-none"
                                                                >
                                                                    <option value="planned">Planned</option>
                                                                    <option value="in-progress">In Progress</option>
                                                                    <option value="complete">Complete</option>
                                                                </select>
                                                                <button onClick={() => handleDelete(month.id, actualIndex)} className="text-[#919fca] hover:text-red-400 transition-colors p-1">
                                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="p-6">
                                                        <div className="flex justify-between gap-4 mb-4">
                                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                                            {project.caseStudy && (
                                                                <Link href={`/case-study/${month.id}/${actualIndex}`} className="text-primary hover:underline text-sm font-bold shrink-0">
                                                                    View Case Study
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <p className="text-[#919fca] text-sm leading-relaxed mb-6 line-clamp-2group-hover:line-clamp-none">{project.description}</p>

                                                        {project.techStack && (
                                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#232c48]">
                                                                {project.techStack.map((tech, i) => (
                                                                    <span key={i} className="text-[10px] font-mono text-slate-400 px-2 py-1 bg-[#1e2330] rounded uppercase tracking-wider">{tech}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
