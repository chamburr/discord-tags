import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://discordtags.me';

    // Static routes
    const routes = [
        { route: '', priority: 1.0, changeFrequency: 'daily' as const },
        { route: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
        { route: '/partners', priority: 0.7, changeFrequency: 'monthly' as const },
        { route: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
        { route: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
        { route: '/submit', priority: 0.9, changeFrequency: 'weekly' as const },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }));

    // Dynamic routes (Tags)
    let tags: { id: string }[] = [];
    try {
        tags = await prisma.tag.findMany({
            select: {
                id: true,
            },
        });
    } catch (e) {
        console.warn('Could not fetch tags for sitemap generation', e);
    }

    const tagRoutes = tags.map((tag) => ({
        url: `${baseUrl}/tags/${tag.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...tagRoutes];
}
