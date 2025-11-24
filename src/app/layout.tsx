import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import clsx from "clsx";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    metadataBase: new URL('https://discordtags.me'),
    title: {
        default: 'Discord Tags | The Best Discord Server Tags List',
        template: '%s | Discord Tags',
    },
    description: 'Explore the largest collection of Discord Server Tags. Customize your Discord profile with unique tags by joining servers.',
    keywords: [
        'Discord Tags',
        'Discord Server Tags',
        'Server Tags',
        'Discord Profile Tags',
        'Discord Clan Tags',
        'Profile Decoration',
        'Server Icon',
        'Discord Icons',
        'How to get Discord tags',
        'Discord tag finder',
    ],
    authors: [{ name: 'Discord Tags' }],
    creator: 'Discord Tags',
    publisher: 'Discord Tags',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://discordtags.me',
        siteName: 'Discord Tags',
        title: 'Discord Tags | The Best Discord Server Tags List',
        description: 'Explore the largest collection of Discord Server Tags. Customize your Discord profile with unique tags by joining servers.',
        images: [
            {
                url: '/icon.png',
                width: 512,
                height: 512,
                alt: 'Discord Tags',
            },
        ],
    },
    twitter: {
        card: 'summary',
        title: 'Discord Tags | The Best Discord Server Tags List',
        description: 'Explore the largest collection of Discord Server Tags. Customize your Discord profile with unique tags by joining servers.',
        images: ['/icon.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
            <body className={clsx(inter.variable, "font-sans min-h-screen antialiased bg-background text-foreground")}>
                <div className="fixed inset-0 z-[-1] h-full w-full bg-background">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]" />
                </div>
                {children}
            </body>
            <GoogleAnalytics gaId="G-QYXGM6YDE9" />
        </html>
    );
}
