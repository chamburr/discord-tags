import { Thing, WithContext, WebSite, Organization, ItemList } from 'schema-dts';

const baseUrl = 'https://discordtags.me';

export function getWebSiteSchema(): WithContext<WebSite> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Discord Tags',
        description: 'Find and discover Discord Server Tags for your profile. Browse thousands of Discord tags and join servers to unlock unique Server Tags.',
        url: baseUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/?q={search_term_string}`,
        },
    };
}

export function getOrganizationSchema(): WithContext<Organization> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Discord Tags',
        url: baseUrl,
        logo: `${baseUrl}/icon.png`,
        description: 'Community-driven platform for discovering Discord Server Tags',
        sameAs: [
            'https://github.com/chamburr/discord-tags',
        ],
    };
}

export function getTagListSchema(tags: Array<{ id: string; name: string; server: string }>): WithContext<ItemList> {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: tags.map((tag, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Thing',
                name: tag.name,
                description: `Discord Server Tag from ${tag.server}`,
                url: `${baseUrl}/tags/${tag.id}`,
            },
        })),
    };
}

export function getTagThingSchema(tag: {
    id: string;
    name: string;
    server: string;
    badge: string | null;
    invite: string | null;
}): WithContext<Thing> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Thing',
        name: tag.name,
        description: `${tag.name} - Discord Server Tag from ${tag.server}. Join the server to unlock this tag for your Discord profile.`,
        url: `${baseUrl}/tags/${tag.id}`,
        image: tag.badge ? `https://cdn.discordapp.com/clan-badges/${tag.id}/${tag.badge}.png` : undefined,
        identifier: tag.id,
    };
}
