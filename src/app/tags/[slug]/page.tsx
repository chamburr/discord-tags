import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Hash } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TagPreview from '@/components/TagPreview';
import AdoptionGuide from '@/components/AdoptionGuide';
import { getTagThingSchema } from '@/lib/structured-data';

async function getTag(id: string) {
    try {
        const tag = await prisma.tag.findUnique({
            where: {
                id: id,
            },
        });
        return tag;
    } catch (error) {
        console.error('Database error:', error);
        return null;
    }
}

interface TagPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { slug: id } = await params;
    const tag = await getTag(id);

    if (!tag) {
        return {
            title: 'Tag Not Found',
        };
    }

    const title = `${tag.name} Discord Tag`;
    const description = `Unlock the ${tag.name} tag for your Discord profile. Join ${tag.server} to equip this exclusive Discord Server Tag today.`;
    const imageUrl = `https://cdn.discordapp.com/clan-badges/${tag.id}/${tag.badge}.png`;

    return {
        title,
        description,
        alternates: {
            canonical: `/tags/${tag.id}`,
        },
        keywords: [
            tag.name,
            `${tag.name} Discord tag`,
            tag.server,
            `${tag.server} Discord server`,
            'Discord Server Tag',
            'Discord profile tag',
        ],
        openGraph: {
            title,
            description,
            type: 'article',
            url: `https://discordtags.me/tags/${tag.id}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${tag.name} Discord Tag`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug: id } = await params;
    const tag = await getTag(id);

    if (!tag) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getTagThingSchema(tag)) }}
            />
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

                    {/* Large Tag Display */}
                    <div className="flex items-center justify-center gap-4 px-8 py-6 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-2xl backdrop-blur-sm w-fit mx-auto">
                        {tag.badge ? (
                            <Image
                                src={`https://cdn.discordapp.com/clan-badges/${tag.id}/${tag.badge}.png`}
                                alt="Tag Icon"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                <Hash className="w-6 h-6 text-indigo-400" />
                            </div>
                        )}
                        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            {tag.name}
                        </h1>
                    </div>

                    {/* Server Info */}
                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                        <span>from</span>
                        <span className="font-semibold text-white text-lg">{tag.server}</span>
                    </div>

                    {/* CTA Button */}
                    {tag.invite && (
                        <div className="pt-4">
                            <a
                                href={`https://discord.gg/${tag.invite}`}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                            >
                                Join Server to Equip
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Tag Preview Section */}
                <div className="mb-16">
                    <TagPreview badgeIcon={`https://cdn.discordapp.com/clan-badges/${tag.id}/${tag.badge}.png`} tagName={tag.name} />
                </div>

                {/* Adoption Guide Section */}
                <div>
                    <AdoptionGuide />
                </div>
            </main>

            <Footer />
        </div>
    );
}
