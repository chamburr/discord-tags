const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Clean up existing data (if any)
    try {
        await prisma.tag.deleteMany()
    } catch (e) {
        console.log('No tables to delete from yet')
    }

    const tags = [
        {
            id: '322850917248663552',
            name: 'FORT',
            badge: '9f01020d9c8afac6a3457fd819b64353',
            server: 'Fortnite',
            invite: 'fortnite',
            count: 500000
        },
        {
            id: '150074202727251969',
            name: 'RBLX',
            badge: 'dc61eaed9e8b012148661df1ada874e6',
            server: 'Roblox',
            invite: 'roblox',
            count: 400000
        },
        {
            id: '302094807046684672',
            name: 'MC',
            badge: 'ec60c5e6d1f14d3bbff586e2e0b9e54e',
            server: 'Minecraft',
            invite: 'minecraft',
            count: 300000
        },
        {
            id: '679875946597056683',
            name: 'VAL',
            badge: 'f9ebf2a3b9ad57f4a58d0d88043a4aa6',
            server: 'VALORANT',
            invite: 'valorant',
            count: 200000
        },
        {
            id: '169256939211980800',
            name: 'DISC',
            badge: 'b27126ede2590002e4af9d5861345c3b',
            server: 'Discord Townhall',
            invite: 'discord-townhall',
            count: 100000
        }
    ]

    console.log('Starting seed...')
    for (const tag of tags) {
        try {
            const created = await prisma.tag.create({
                data: tag
            })
            console.log('Created tag:', created.name)
        } catch (e) {
            console.error('Error creating tag:', tag.name, e)
        }
    }

    console.log('Seeded!')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
