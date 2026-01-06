'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
    const router = useRouter();
    const { isAuthenticated, logout, loading: authLoading } = useAuth();
    const [weekNumber, setWeekNumber] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [status, setStatus] = useState('planned');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sections, setSections] = useState({
        progress: '',
        challenges: '',
        solutions: '',
        learnings: ''
    });
    const [techStack, setTechStack] = useState('');
    const [tags, setTags] = useState('');
    const [caseStudyChallenge, setCaseStudyChallenge] = useState('');
    const [caseStudyImplementation, setCaseStudyImplementation] = useState('');
    const [caseStudyArchitecture, setCaseStudyArchitecture] = useState('');
    const [caseStudyMetrics, setCaseStudyMetrics] = useState('');
    const [caseStudyCode, setCaseStudyCode] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, authLoading, router]);

    const handleLogout = () => {
        logout();
        router.push('/admin');
    };

    const handleSectionChange = (field, value) => {
        setSections(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const newProject = {
            weekNumber,
            dateRange,
            status,
            title,
            description,
            sections: Object.fromEntries(
                Object.entries(sections).filter(([_, value]) => value.trim() !== '')
            ),
            techStack: techStack.split(',').map(t => t.trim()).filter(t => t),
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
            caseStudy: caseStudyChallenge || caseStudyImplementation || caseStudyArchitecture || caseStudyMetrics ? {
                challenge: caseStudyChallenge,
                implementation: caseStudyImplementation,
                architecture: caseStudyArchitecture.split('\n').map(s => s.trim()).filter(s => s),
                codeSnippet: caseStudyCode,
                metrics: caseStudyMetrics.split(',').map(m => {
                    const [label, value] = m.split(':');
                    return label && value ? { label: label.trim(), value: value.trim() } : null;
                }).filter(m => m)
            } : null
        };

        try {
            const response = await fetch('/api/monthly-updates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                setMessage('✅ Project added successfully to current month!');
                // Reset form
                setWeekNumber('');
                setDateRange('');
                setStatus('planned');
                setTitle('');
                setDescription('');
                setSections({
                    progress: '',
                    challenges: '',
                    solutions: '',
                    learnings: ''
                });
                setTechStack('');
                setTags('');
                setCaseStudyChallenge('');
                setCaseStudyImplementation('');
                setCaseStudyArchitecture('');
                setCaseStudyMetrics('');
                setCaseStudyCode('');
            } else {
                setMessage('❌ Failed to add project. Please try again.');
            }
        } catch (error) {
            setMessage('❌ Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#111522] flex items-center justify-center">
                <div className="text-[#919fca] font-mono">Checking authentication...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111522] text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#111522]/90 border-b border-[#232c48]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded text-white font-mono font-bold text-lg">
                            &gt;_
                        </div>
                        <span className="text-xl font-bold tracking-tight font-mono">
                            &lt;Ht-<span className="text-primary">code</span>/&gt;
                        </span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/updates" className="text-sm font-medium hover:text-primary transition-colors font-mono">
                            View Updates
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium hover:text-red-400 transition-colors font-mono flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full mb-4">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            <span className="text-sm font-mono">Authenticated as: htcode</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Add Monthly Project Update</h1>
                        <p className="text-[#919fca] font-mono text-sm">
                            Add a new project to the current month's tracking
                        </p>
                    </div>

                    {message && (
                        <div className={`mb-6 p-4 rounded-lg border ${message.includes('✅')
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                            }`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 bg-[#1a1d26] p-8 rounded-lg border border-[#232c48]">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-primary font-mono">Basic Information</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Week Label</label>
                                    <input
                                        type="text"
                                        value={weekNumber}
                                        onChange={(e) => setWeekNumber(e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        placeholder="Week 5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Date Range</label>
                                    <input
                                        type="text"
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        placeholder="Feb 3 - Feb 7, 2026"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                >
                                    <option value="planned">Planned</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    placeholder="My Awesome Project"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    rows="2"
                                    placeholder="Brief description of the project..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Project Sections */}
                        <div className="space-y-6 border-t border-[#232c48] pt-6">
                            <h3 className="text-lg font-bold text-primary font-mono">Feed Details (Monthly Log)</h3>
                            <p className="text-xs text-[#919fca] font-mono leading-relaxed mb-4">
                                These details appear in the main project cards on your updates feed.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Progress</label>
                                    <textarea
                                        value={sections.progress}
                                        onChange={(e) => handleSectionChange('progress', e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        rows="3"
                                        placeholder="Current progress..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Challenges</label>
                                    <textarea
                                        value={sections.challenges}
                                        onChange={(e) => handleSectionChange('challenges', e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        rows="3"
                                        placeholder="Blocking issues..."
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Solutions</label>
                                    <textarea
                                        value={sections.solutions}
                                        onChange={(e) => handleSectionChange('solutions', e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        rows="3"
                                        placeholder="How you fixed them..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Key Learnings</label>
                                    <textarea
                                        value={sections.learnings}
                                        onChange={(e) => handleSectionChange('learnings', e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        rows="3"
                                        placeholder="Lessons learned..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Tags (comma-separated, optional)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    placeholder="#AI, #Web3, #Backend"
                                />
                            </div>
                        </div>

                        {/* Case Study Section */}
                        <div className="space-y-6 border-t border-[#232c48] pt-6">
                            <h3 className="text-lg font-bold text-violet-400 font-mono flex items-center gap-2">
                                <span className="material-symbols-outlined">menu_book</span>
                                Technical Case Study (Deep Dive)
                            </h3>
                            <p className="text-xs text-[#919fca] font-mono leading-relaxed">
                                Fill these out to create a standalone technical page for this project. Great for NDAs where you can't show the brand but want to show the logic.
                            </p>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">The Challenge</label>
                                <textarea
                                    value={caseStudyChallenge}
                                    onChange={(e) => setCaseStudyChallenge(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    rows="3"
                                    placeholder="The core technical problem you were solving..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Technical Implementation</label>
                                <textarea
                                    value={caseStudyImplementation}
                                    onChange={(e) => setCaseStudyImplementation(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    rows="4"
                                    placeholder="How you built it? Mention patterns, architectures, performance wins..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Architecture Steps (one per line)</label>
                                <textarea
                                    value={caseStudyArchitecture}
                                    onChange={(e) => setCaseStudyArchitecture(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                    rows="4"
                                    placeholder="Step 1: Request arrives at entry point&#10;Step 2: Logic processed in atomic transaction..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Metrics (label:value, comma-separated)</label>
                                    <input
                                        type="text"
                                        value={caseStudyMetrics}
                                        onChange={(e) => setCaseStudyMetrics(e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        placeholder="Latency:45ms, Uptime:99.9%"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono text-[#919fca] mb-2">Tech Stack (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={techStack}
                                        onChange={(e) => setTechStack(e.target.value)}
                                        className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        placeholder="Django, PostgreSQL, Redis"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-mono text-[#919fca] mb-2">Key Code Snippet (Optional)</label>
                                <textarea
                                    value={caseStudyCode}
                                    onChange={(e) => setCaseStudyCode(e.target.value)}
                                    className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm uppercase tracking-tight"
                                    rows="4"
                                    placeholder="async function solve() { ... }"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                        >
                            {loading ? 'Adding Project...' : 'Add Project to Current Month'}
                        </button>
                    </form>

                    <div className="mt-8 p-6 bg-[#111522] rounded-lg border border-[#232c48]">
                        <h3 className="text-lg font-bold mb-4 font-mono">📝 How It Works</h3>
                        <ul className="space-y-2 text-sm text-[#919fca] font-mono">
                            <li>• Projects are added to the current active month</li>
                            <li>• You can edit status and delete projects from the Updates page</li>
                            <li>• All sections except basic info are optional</li>
                            <li>• Updates saved to <code className="text-primary">src/data/monthly-updates.json</code></li>
                            <li>• Changes reflect immediately on homepage and updates page!</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div >
    );
}
