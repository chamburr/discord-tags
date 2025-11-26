import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Privacy Policy',
    description: 'Read the Privacy Policy for Discord Tags. Understand how we collect, use, and protect your data while you explore Server Tags.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        This Privacy Policy describes how your personal information is collected, used, and shared when you
                        access Discord Tags&apos; website and services.
                    </p>
                </div>

                {/* Content Section */}
                <div className="prose prose-invert prose-zinc max-w-none">

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Information We Collect</h2>
                    <p className="text-zinc-300 mb-4">
                        When you visit our website, we automatically collect certain information about your device, including
                        information about your web browser, IP address, time zone, and some of the cookies that are installed
                        on your device. Additionally, as you browse our website, we collect information about the individual
                        web pages or products that you view, what websites or search terms referred you to our website, and
                        information about how you interact with our website.
                    </p>
                    <p className="text-zinc-300 mb-2">
                        We collect the information using the following technologies:
                    </p>
                    <ul className="text-zinc-300 mb-6 space-y-2">
                        <li>
                            &quot;Cookies&quot; are data files that are placed on your device or computer and often include an anonymous
                            unique identifier. For more information about cookies, and how to disable cookies, visit
                            http://www.allaboutcookies.org.
                        </li>
                        <li>
                            &quot;Log files&quot; track actions occurring on our website, and collect data including your IP address,
                            browser type, Internet service provider, referring/exit pages, and date/time stamps.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">How We Use Your Information</h2>
                    <p className="text-zinc-300 mb-6">
                        We use the information that we collect to help us screen for potential risk, and more generally to
                        improve and optimize our Site (for example, by generating analytics about how our customers browse and
                        interact with our website, and to assess the success of our marketing and advertising campaigns).
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Sharing Your Information</h2>
                    <p className="text-zinc-300 mb-4">
                        We share your information with third parties to help us use your information, as described above. We
                        also use Google Analytics to help us understand how our customers use our website -- you can read more
                        about how Google uses your information here: https://www.google.com/intl/en/policies/privacy/. You can
                        also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
                    </p>
                    <p className="text-zinc-300 mb-6">
                        We may also share your information to comply with applicable laws and regulations, to respond to a
                        subpoena search warrant or other lawful request for information we receive, or to otherwise protect
                        our rights.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Your Rights</h2>
                    <p className="text-zinc-300 mb-6">
                        If you are a European resident, you have the right to access information we hold about you and to ask
                        that your information be corrected, updated, or deleted. If you would like to exercise this right,
                        please contact us through the contact information below.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Minors</h2>
                    <p className="text-zinc-300 mb-6">
                        Our website is not intended for individuals under the age of 13.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Changes</h2>
                    <p className="text-zinc-300 mb-6">
                        We may update this privacy policy from time to time in order to reflect, for example, changes to our
                        practices or for other operational, legal or regulatory reasons.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Contact Us</h2>
                    <p className="text-zinc-300 mb-6">
                        For more information about our privacy practices, if you have questions, or if you would like to make
                        a complaint, please email us at hi@discordtags.me.
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
