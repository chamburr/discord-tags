import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Search from '@/components/Search';
import TagGrid from '@/components/TagGrid';
import Pagination from '@/components/Pagination';
import prisma from '@/lib/db';

import { getTags } from '@/lib/tags';
import { getWebSiteSchema, getOrganizationSchema } from '@/lib/structured-data';

interface HomeProps {
    searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
    const { q: query } = await searchParams;

    if (query) {
        return {
            title: `Search: ${query} | Discord Tags`,
            description: `Search results for "${query}" - Find Discord Server Tags. Browse thousands of Discord tags to unlock for your profile.`,
        };
    }

    return {
        description: 'Explore the largest collection of Discord Server Tags. Customize your Discord profile with unique tags by joining servers.',
    };
}

export default async function Home({ searchParams }: HomeProps) {
    const { q: query, page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { tags, totalPages } = await getTags(query || '', currentPage);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteSchema()) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
            />
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-48 pb-20 relative z-10">
                <div className="text-center mb-32 space-y-10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white text-balance">
                            Find your <span className="text-indigo-400">Discord Tags</span>
                        </h1>
                        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-balance">
                            Explore the largest collection of Discord Server Tags. <br className="hidden sm:block" />
                            Customize your Discord profile with unique tags by joining servers.
                        </p>
                    </div>

                    <div className="pt-6 max-w-2xl mx-auto">
                        <Search />
                    </div>
                </div>

                <TagGrid tags={tags} currentPage={currentPage} />

                <div className="mt-12">
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
