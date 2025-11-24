import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Discord Tags',
        short_name: 'Discord Tags',
        description: 'Explore the largest collection of Discord Server Tags. Customize your Discord profile with unique tags by joining servers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
