import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Terms of Service',
    description: 'Review the Terms of Service for Discord Tags. Learn about the rules and guidelines for using our Discord Server Tags directory.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsPage() {
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

                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        These Terms of Service govern your access to and use of Discord Tags&apos; website and services.
                        Please make sure to fully read and understand these terms prior to using our website and services.
                    </p>
                </div>

                {/* Content Section */}
                <div className="prose prose-invert prose-zinc max-w-none">
                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Introduction</h2>
                    <p className="text-zinc-300 mb-6">
                        By accessing the website at https://discordtags.me, you are agreeing to be bound by these terms of service,
                        all applicable laws and regulations, and agree that you are responsible for compliance with any applicable
                        local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        The materials contained in this website are protected by applicable copyright and trademark law.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Use License</h2>
                    <ul className="text-zinc-300 mb-6 space-y-2">
                        <li>
                            Permission is granted to temporarily download one copy of the materials (information or software) on
                            our website for personal, non-commercial transitory viewing only. This is the grant of a license,
                            not a transfer of title, and under this license you may not:
                            <ul className="mt-2 ml-6 space-y-1">
                                <li>modify or copy the materials;</li>
                                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                <li>attempt to decompile or reverse engineer any software contained on our website;</li>
                                <li>remove any copyright or other proprietary notations from the materials; or</li>
                                <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                            </ul>
                        </li>
                        <li className="mt-4">
                            This license shall automatically terminate if you violate any of these restrictions and may be
                            terminated by Discord Tags at any time. Upon terminating your viewing of these materials or
                            upon the termination of this license, you must destroy any downloaded materials in your possession
                            whether in electronic or printed format.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Disclaimer</h2>
                    <ul className="text-zinc-300 mb-6 space-y-2">
                        <li>
                            The materials on our website are provided on an &apos;as is&apos; basis. Discord Tags makes no
                            warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                            without limitation, implied warranties or conditions of merchantability, fitness for a particular
                            purpose, or non-infringement of intellectual property or other violation of rights.
                        </li>
                        <li>
                            Further, Discord Tags does not warrant or make any representations concerning the accuracy,
                            likely results, or reliability of the use of the materials on its website or otherwise relating to
                            such materials or on any sites linked to this site.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Limitations</h2>
                    <p className="text-zinc-300 mb-6">
                        In no event shall Discord Tags or its suppliers be liable for any damages (including, without limitation,
                        damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                        to use the materials on our website, even if Discord Tags or a Discord Tags authorized representative
                        has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do
                        not allow limitations on implied warranties, or limitations of liability for consequential or incidental
                        damages, these limitations may not apply to you.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Accuracy of materials</h2>
                    <p className="text-zinc-300 mb-6">
                        The materials appearing on our website could include technical, typographical, or photographic errors.
                        Discord Tags does not warrant that any of the materials on its website are accurate, complete or current.
                        Discord Tags may make changes to the materials contained on its website at any time without notice.
                        However Discord Tags does not make any commitment to update the materials.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Links</h2>
                    <p className="text-zinc-300 mb-6">
                        Discord Tags has not reviewed all of the sites linked to its website and is not responsible for the
                        contents of any such linked site. The inclusion of any link does not imply endorsement by Discord Tags
                        of the site. Use of any such linked website is at the user&apos;s own risk.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Modifications</h2>
                    <p className="text-zinc-300 mb-6">
                        Discord Tags may revise these terms of service for its website at any time without notice. By using
                        this website you are agreeing to be bound by the then current version of these terms of service.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Governing Law</h2>
                    <p className="text-zinc-300 mb-6">
                        These terms and conditions are governed by and construed in accordance with the laws of Singapore and
                        you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>

                    <p className="text-zinc-500 text-sm mt-12">
                        Last updated on 20 November 2025.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
