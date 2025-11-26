import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Submit a Tag',
    description: 'Submit your Discord Server Tag to our directory. Grow your server and help users customize their profiles with your unique tag.',
    alternates: {
        canonical: '/submit',
    },
};

export default function SubmitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
