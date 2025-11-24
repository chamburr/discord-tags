'use client';

import Link from 'next/link';
import { Plus, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    } as const;

    const itemVariants = {
        closed: { opacity: 0, y: -10 },
        open: { opacity: 1, y: 0 }
    } as const;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 transition-colors duration-300 ${isMenuOpen ? 'bg-black' : 'bg-black/50 backdrop-blur-md'}`}>
            <div className="max-w-7xl mx-auto px-6 h-18 md:h-20 flex items-center justify-between gap-8">
                <Link href="/" className="flex items-center gap-3 group z-50 relative">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src="/icon.png"
                            alt="Discord Tags"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                        Discord Tags
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 flex-1 ml-4">
                    <Link href="/" className="text-base font-semibold text-zinc-300 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-base font-semibold text-zinc-300 hover:text-white transition-colors">
                        About
                    </Link>
                    <Link href="/partners" className="text-base font-semibold text-zinc-300 hover:text-white transition-colors">
                        Partners
                    </Link>
                    <Link href="https://github.com/chamburr/discord-tags" target="_blank" rel="noopener" className="text-base font-semibold text-zinc-300 hover:text-white transition-colors">
                        GitHub
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/submit" className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/10">
                        <Plus className="w-4 h-4" />
                        Submit Tag
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden relative z-50 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 top-0 h-[100dvh] bg-black z-40 flex flex-col p-6 pt-20 md:hidden border-t border-white/5"
                        >
                            <nav className="flex flex-col gap-2">
                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="/"
                                        className="flex items-center p-2 rounded-xl text-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="/about"
                                        className="flex items-center p-2 rounded-xl text-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        About
                                    </Link>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="/partners"
                                        className="flex items-center p-2 rounded-xl text-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Partners
                                    </Link>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="https://github.com/chamburr/discord-tags"
                                        target="_blank"
                                        rel="noopener"
                                        className="flex items-center p-2 rounded-xl text-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        GitHub
                                    </Link>
                                </motion.div>
                            </nav>

                            <motion.div variants={itemVariants} className="mt-6 px-4">
                                <Link
                                    href="/submit"
                                    className="flex items-center gap-2 w-fit px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Plus className="w-4 h-4" />
                                    Submit Tag
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
