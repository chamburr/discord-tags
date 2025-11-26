'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TagPreviewProps {
    badgeIcon?: string;
    tagName: string;
}

export default function TagPreview({ badgeIcon, tagName }: TagPreviewProps) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Discord Tag Preview</h2>
                <p className="text-zinc-400 text-sm">See how this tag will look on your Discord profile</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Member List Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-xl p-6"
                >
                    <h3 className="text-sm font-medium text-zinc-400 mb-4">Member List</h3>
                    <div className="bg-[#2b2d31] rounded-lg p-3">
                        {/* Mock Discord Member List Header */}
                        <div className="text-xs font-semibold text-[#949ba4] uppercase tracking-wide mb-2 px-2">
                            Online — 1
                        </div>

                        {/* Member Item */}
                        <div className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35373c] transition-colors">
                            {/* Avatar with status */}
                            <div className="relative flex-shrink-0">
                                <Image src="https://cdn.discordapp.com/embed/avatars/0.png" alt="Wumpus" width={32} height={32} className="rounded-full" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#23a55a] rounded-full border-2 border-[#2b2d31]" />
                            </div>

                            {/* Username and badges */}
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-sm font-medium text-white">Wumpus</span>

                                {/* Tag badge */}
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#5865f2]/10 rounded">
                                    {badgeIcon ? (
                                        <Image
                                            src={badgeIcon}
                                            alt="Tag Icon"
                                            width={12}
                                            height={12}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-3 h-3 rounded-sm bg-indigo-500/30" />
                                    )}
                                    <span className="text-[10px] text-white/90 font-semibold">{tagName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* User Profile Popout Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-xl p-6"
                >
                    <h3 className="text-sm font-medium text-zinc-400 mb-4">User Profile</h3>
                    <div className="bg-[#232428] rounded-lg overflow-hidden">
                        {/* Banner with circular cutout for avatar */}
                        <div className="relative">
                            <div className="h-12 bg-[#5865F2]" />
                            {/* Extended banner section with circular gap */}
                            <div className="h-8 bg-[#5865F2] relative">
                                {/* Circular cutout for avatar */}
                                <div className="absolute top-0 left-4 w-20 h-20 rounded-full bg-[#232428]" />
                            </div>
                        </div>

                        <div className="px-4 pb-4 -mt-10">
                            {/* Avatar with status */}
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="https://cdn.discordapp.com/embed/avatars/0.png" alt="Wumpus" width={80} height={80} className="rounded-full border-[6px] border-[#232428]" />
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#23a55a] rounded-full border-[3px] border-[#232428]" />
                            </div>

                            {/* Username */}
                            <div className="mb-2">
                                <span className="text-xl font-semibold text-white">Wumpus</span>
                            </div>

                            {/* Username with tag badge */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#b5bac1]">wumpus</span>

                                {/* Tag badge in profile */}
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-[#5865f2]/10 rounded">
                                    {badgeIcon ? (
                                        <Image
                                            src={badgeIcon}
                                            alt="Tag Icon"
                                            width={16}
                                            height={16}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-4 h-4 rounded-sm bg-indigo-500/30" />
                                    )}
                                    <span className="text-xs text-white/90 font-semibold">{tagName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
