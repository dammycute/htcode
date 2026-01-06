'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { isAuthenticated, login } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, router]);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const success = login(username, password);
        if (success) {
            router.push('/admin/dashboard');
        } else {
            setError('Invalid username or password');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#111522] flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded text-white font-mono font-bold text-xl">
                            &gt;_
                        </div>
                        <span className="text-2xl font-bold tracking-tight font-mono">
                            &lt;Ht-<span className="text-primary">code</span>/&gt;
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-[#919fca] font-mono text-sm">
                        Secure access to project management
                    </p>
                </div>

                <div className="bg-[#1a1d26] border border-[#232c48] rounded-lg p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm font-mono">
                                ❌ {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-mono text-[#919fca] mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-3 text-white focus:border-primary focus:outline-none font-mono"
                                placeholder="Enter username"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-mono text-[#919fca] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#111522] border border-[#232c48] rounded px-4 py-3 text-white focus:border-primary focus:outline-none font-mono"
                                placeholder="Enter password"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-sm">lock_open</span>
                                    Login to Admin Panel
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[#232c48]">
                        <Link
                            href="/"
                            className="text-sm text-[#919fca] hover:text-primary transition-colors font-mono flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Homepage
                        </Link>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-[#111522] rounded-lg border border-[#232c48]">
                    <p className="text-xs text-[#919fca] font-mono text-center">
                        🔒 Secure admin access • Credentials required
                    </p>
                </div>
            </div>
        </div>
    );
}
