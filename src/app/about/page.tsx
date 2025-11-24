import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Discord Tags, the ultimate directory for Discord Server Tags. Discover how to customize your profile with unique badges.',
    keywords: [
        'What are Discord tags',
        'Discord Server Tags explained',
        'How to get Discord tags',
        'Discord profile tags',
    ],
};

export default function About() {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-48 pb-20 relative z-10">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">
                        About <span className="text-indigo-400">Discord Tags</span>
                    </h1>
                    <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Discord Tags is a community-driven platform designed to help you find the perfect server tag for your Discord profile.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-12 text-zinc-300 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">What are Server Tags?</h2>
                        <p>
                            Server Tags are unique tags that you can display on your Discord profile. By joining specific servers, you can unlock these tags to customize your profile and show off your interests. They are the perfect way to add flair and personality to your Discord presence.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How it Works</h2>
                        <p>
                            Simply browse our collection of tags, find one you like, and join the associated Discord server. Once you&apos;re in, the tag will be available for you to equip on your profile. It&apos;s that simple!
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Open Source</h2>
                        <p>
                            This project is open source and available on GitHub. We welcome contributions from the community to make Discord Tags even better.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Contributors</h2>
                        <p className="mb-4">
                            A huge thank you to everyone who has contributed to this project!
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                                <Image src="https://cdn.discordapp.com/avatars/446290930723717120/a23dcacf8b9d10dd3f3ebced4e5f7ffd.png?size=256" alt="chamburr" width={64} height={64} className="rounded-full" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">chamburr</h3>
                                    <div className="flex items-center gap-3 mt-1.5 h-5">
                                        <a href="https://chamburr.com" target="_blank" rel="noopener" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                            Website
                                        </a>
                                        <span className="text-zinc-600">•</span>
                                        <a href="https://github.com/chamburr" target="_blank" rel="noopener" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 opacity-50">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">?</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Contributor</h3>
                                    <div className="flex items-center gap-3 mt-1.5 h-5">
                                        <span className="text-zinc-500 text-sm">Join us on GitHub!</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 opacity-50">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">?</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Contributor</h3>
                                    <div className="flex items-center gap-3 mt-1.5 h-5">
                                        <span className="text-zinc-500 text-sm">Join us on GitHub!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
