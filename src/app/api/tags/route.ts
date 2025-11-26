import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getTags } from '@/lib/tags';
import { RateLimiter } from '@/lib/rate-limit';

// 1 request per 5 seconds
const limiter = new RateLimiter({
    interval: 5 * 1000,
    limit: 1,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 24;

    const result = await getTags(query, page, limit);

    return NextResponse.json(result);
}

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        const result = limiter.check(ip);

        if (!result.success) {
            const remaining = Math.ceil((result.reset! - Date.now()) / 1000);
            return NextResponse.json(
                { error: `Too many requests. Please try again in ${remaining} seconds.` },
                { status: 429 }
            );
        }

        const { invite } = await request.json();

        if (!invite) {
            return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
        }

        const { getDiscordInviteInfo } = await import('@/lib/discord');
        const discordInfo = await getDiscordInviteInfo(invite);

        const existingTag = await prisma.tag.findUnique({
            where: { id: discordInfo.id },
        });

        if (existingTag) {
            return NextResponse.json({ error: 'Tag for this server already exists' }, { status: 409 });
        }

        const newTag = await prisma.tag.create({
            data: {
                id: discordInfo.id,
                name: discordInfo.tag,
                badge: discordInfo.badge,
                server: discordInfo.server,
                invite: discordInfo.invite,
                count: discordInfo.count,
            },
        });

        limiter.removeToken(ip);

        return NextResponse.json(newTag, { status: 201 });
    } catch (error: any) {
        const { InvalidInviteError, ExpiredInviteError, IncompleteDataError } = await import('@/lib/discord');

        if (error instanceof InvalidInviteError ||
            error instanceof ExpiredInviteError ||
            error instanceof IncompleteDataError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.error('Error creating tag:', error);

        return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
    }
}
