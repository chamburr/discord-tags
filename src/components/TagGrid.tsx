'use client';

import { ChevronRight, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

interface Tag {
    id: string;
    name: string;
    badge: string;
    server: string;
}

interface TagGridProps {
    tags: Tag[];
    currentPage: number;
}

export default function TagGrid({ tags, currentPage }: TagGridProps) {
    if (!tags || tags.length === 0) {
        return (
            <div className="text-center py-32">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900/50 mb-4">
                    <Hash className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No tags found</h3>
                <p className="text-zinc-500 text-sm">Try adjusting your search terms.</p>
            </div>
        );
    }

    return (
        <motion.div
            key={currentPage}
            variants={container}
            animate="show"
            id="tag-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto"
        >
            {tags.map((tag) => (
                <motion.div
                    key={tag.id}
                    variants={item}
                >
                    <Link
                        href={`/tags/${tag.id}`}
                        className="group relative flex flex-col bg-zinc-900/30 border border-white/5 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900/80 border border-white/10 mb-5 shadow-xl backdrop-blur-sm group-hover:border-indigo-500/30 transition-colors">
                                <Image
                                    src={`https://cdn.discordapp.com/clan-badges/${tag.id}/${tag.badge}.png`}
                                    alt="Tag Icon"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <span className="text-lg font-bold text-white tracking-wide">
                                    {tag.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-4">
                                <span>from</span>
                                <span className="font-medium text-zinc-300">{tag.server}</span>
                            </div>

                            <div className="flex items-center gap-1 text-zinc-500 text-xs group-hover:text-indigo-400 transition-colors">
                                <span>View details</span>
                                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
