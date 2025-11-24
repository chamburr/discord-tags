export class InvalidInviteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidInviteError';
    }
}

export class ExpiredInviteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExpiredInviteError';
    }
}

export class IncompleteDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'IncompleteDataError';
    }
}

export class RateLimitError extends Error {
    retryAfter: number;

    constructor(message: string, retryAfter: number = 5) {
        super(message);
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }
}

export class DiscordServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DiscordServerError';
    }
}

interface DiscordInviteResponse {
    expires_at: string | null;
    approximate_member_count?: number;
    guild?: {
        id: string;
        name: string;
        vanity_url_code?: string;
    };
    profile?: {
        tag?: string;
        badge_hash?: string;
    };
}

interface DiscordInviteInfo {
    id: string;
    server: string;
    invite: string;
    tag: string;
    badge: string;
    count: number;
}

export async function getDiscordInviteInfo(inviteInput: string): Promise<DiscordInviteInfo> {
    let code = inviteInput.trim();
    const urlPatterns = [
        /discord\.gg\/([a-zA-Z0-9-]+)/,
        /discord\.com\/invite\/([a-zA-Z0-9-]+)/,
        /discordapp\.com\/invite\/([a-zA-Z0-9-]+)/
    ];

    for (const pattern of urlPatterns) {
        const match = code.match(pattern);
        if (match) {
            code = match[1];
            break;
        }
    }

    const response = await fetch(`https://discord.com/api/v10/invites/${code}?with_counts=true&with_expiration=true`, {
        headers: {
            'Authorization': `Bot ${process.env.BOT_TOKEN}`
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new InvalidInviteError('Invite not found');
        } else if (response.status === 429) {
            const retryAfterHeader = response.headers.get('Retry-After');
            const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 5;
            throw new RateLimitError('Discord API rate limit exceeded', retryAfter);
        } else if (response.status >= 500) {
            throw new DiscordServerError(`Discord API server error: ${response.status}`);
        } else {
            throw new DiscordServerError(`Discord API error: ${response.status}`);
        }
    }

    const data = (await response.json()) as DiscordInviteResponse;

    if (data.expires_at !== null) {
        throw new ExpiredInviteError('Invite must be permanent (never expires)');
    }

    const id = data.guild?.id;
    const server = data.guild?.name;
    const tag = data.profile?.tag;
    const badge = data.profile?.badge_hash;
    const count = data.approximate_member_count || 0;

    const invite = data.guild?.vanity_url_code || code;

    if (!id || !server) {
        throw new IncompleteDataError('Incomplete server information received');
    }

    if (!tag || !badge) {
        throw new IncompleteDataError('Server must have a tag');
    }

    return {
        id,
        server,
        invite,
        tag,
        badge,
        count
    };
}
