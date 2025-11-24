import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getDiscordInviteInfo, InvalidInviteError, ExpiredInviteError, IncompleteDataError } from '@/lib/discord';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let isRunning = false;

export async function GET(request: Request) {
    let lockAcquired = false;

    try {
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (isRunning) {
            return NextResponse.json({
                error: 'Cron job is already running',
                message: 'Please wait for the current job to complete'
            }, { status: 409 });
        }

        isRunning = true;
        lockAcquired = true;

        console.log('[Cron] Starting tag validation...');

        const tags = await prisma.tag.findMany();
        console.log(`[Cron] Found ${tags.length} tags to validate`);

        let updated = 0;
        let deleted = 0;
        let failed = 0;

        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];

            if (i % 100 === 0) {
                console.log(`[Cron] Progress: ${i}/${tags.length} tags processed`);
            }

            try {
                const discordInfo = await getDiscordInviteInfo(tag.invite);

                await prisma.tag.update({
                    where: { id: tag.id },
                    data: {
                        name: discordInfo.tag,
                        badge: discordInfo.badge,
                        server: discordInfo.server,
                        invite: discordInfo.invite,
                        count: discordInfo.count,
                    },
                });

                updated++;
            } catch (error: any) {
                // Delete invalid tags (expired invites, missing servers, incomplete data)
                if (error instanceof InvalidInviteError ||
                    error instanceof ExpiredInviteError ||
                    error instanceof IncompleteDataError) {

                    await prisma.tag.delete({
                        where: { id: tag.id },
                    });

                    deleted++;
                    console.log(`[Cron] Deleted invalid tag: ${tag.name} - ${error.message}`);
                } else {
                    failed++;
                    console.error(`[Cron] Failed to validate tag ${tag.name}:`, error.message);
                }
            }

            if (i < tags.length - 1) {
                await delay(5000);
            }
        }

        const result = {
            total: tags.length,
            updated,
            deleted,
            failed,
            timestamp: new Date().toISOString(),
        };

        console.log('[Cron] Validation complete:', result);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[Cron] Fatal error:', error);
        return NextResponse.json(
            { error: 'Cron job failed', message: error.message },
            { status: 500 }
        );
    } finally {
        if (lockAcquired) {
            isRunning = false;
        }
    }
}
