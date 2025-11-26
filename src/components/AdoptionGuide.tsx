'use client';

import { motion } from 'framer-motion';
import { Check, ExternalLink, UserPlus, Award } from 'lucide-react';

interface Step {
    icon: React.ElementType;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        icon: ExternalLink,
        title: 'Join the Server',
        description: 'Click the "Join Server to Equip" button below to join the Discord server.',
    },
    {
        icon: UserPlus,
        title: 'Select Server Tag',
        description: 'Go to your Discord profile settings and choose this server tag from your available tags.',
    },
    {
        icon: Award,
        title: 'Stay in the Server',
        description: 'Make sure you remain a member of the server to keep the tag on your profile.',
    },
    {
        icon: Check,
        title: 'Show Off Your Tag',
        description: 'Your new Server Tag is now visible to everyone! Enjoy your new tag.',
    },
];

export default function AdoptionGuide() {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">How to Adopt This Discord Tag</h2>
                <p className="text-zinc-400 text-sm">Follow these simple steps to get this tag on your profile</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-zinc-900/30 border border-white/5 rounded-xl p-6 hover:bg-zinc-900/50 hover:border-white/10 transition-all"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <step.icon className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-indigo-400">STEP {index + 1}</span>
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-zinc-900/50 border border-white/10 rounded-xl p-6"
            >
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    Important Notes
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400 marker:text-indigo-400">
                    <li>You must remain in the server to keep the tag on your profile</li>
                    <li>The tag may take a few moments to appear after joining</li>
                    <li>If you leave the server, the tag will be removed from your profile</li>
                </ul>
            </motion.div>
        </div>
    );
}
