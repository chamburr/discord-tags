import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Partners',
    description: 'Explore our partners and collaborators. Discover amazing Discord tools, bots, and services recommended by Discord Tags.',
    alternates: {
        canonical: '/partners',
    },
};

export default function Partners() {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-48 pb-20 relative z-10">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">
                        Our <span className="text-indigo-400">Partners</span>
                    </h1>
                    <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        We are proud to collaborate with these amazing communities and projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="https://discordtemplates.me" target="_blank" rel="noopener" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors group block">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="https://cdn.discordapp.com/avatars/696170556969582632/cf54e042456638eba2ea5abddfc7910e.png?size=256" alt="Discord Templates" width={48} height={48} className="rounded-full" />
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Discord Templates</h3>
                        </div>
                        <p className="text-zinc-400">Discover a huge variety of Discord server templates for all purposes.</p>
                    </a>

                    <a href="https://modmail.xyz" target="_blank" rel="noopener" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors group block">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="https://cdn.discordapp.com/avatars/575252669443211264/7050131180642ef969d1ac28bd7354b6.png?size=256" alt="ModMail" width={48} height={48} className="rounded-full" />
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">ModMail</h3>
                        </div>
                        <p className="text-zinc-400">A feature-rich Discord bot designed to enable your server members to contact staff easily.</p>
                    </a>

                    <a href="https://fischl.app" target="_blank" rel="noopener" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors group block">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="https://cdn.discordapp.com/avatars/732422232273584198/624035e5e9a841bfd3020e35a0a5c0a0.png?size=256" alt="Fischl" width={48} height={48} className="rounded-full" />
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Fischl</h3>
                        </div>
                        <p className="text-zinc-400">A feature-rich Discord bot for Hoyoverse servers with tools for tickets, co-op, birthdays, and more.</p>
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
