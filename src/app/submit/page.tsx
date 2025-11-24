'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubmitPage() {
    const [invite, setInvite] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ invite }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Redirect to the new tag's page
            router.push(`/tags/${data.id}`);
            router.refresh();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Back Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Back to all tags</span>
                </Link>

                {/* Hero Section */}
                <div className="text-center mb-12 space-y-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10">
                            <Plus className="w-8 h-8 text-indigo-400" />
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Submit a Tag
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Enter a Discord invite code or link to add your server&apos;s tag to the directory.
                    </p>
                </div>

                {/* Form Section */}
                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label htmlFor="invite" className="block text-sm font-medium text-zinc-300">
                                Discord Invite Code or Link
                            </label>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 group-focus-within:opacity-40 blur transition duration-500" />
                                <input
                                    type="text"
                                    id="invite"
                                    value={invite}
                                    onChange={(e) => setInvite(e.target.value)}
                                    placeholder="e.g. fortnite or discord.gg/fortnite"
                                    className="relative w-full px-4 py-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <p className="text-xs text-zinc-500">
                                The invite must be permanent and from a server with a tag.
                            </p>
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-red-400 text-sm font-medium">Error</p>
                                    <p className="text-red-300/80 text-sm mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                        >
                            {loading ? 'Submitting...' : 'Submit Tag'}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
