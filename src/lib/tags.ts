import prisma from '@/lib/db';
import { Tag } from '@prisma/client';

export async function getTags(query: string, page: number = 1, limit: number = 24) {
    const skip = (page - 1) * limit;

    try {
        if (query) {
            const searchQuery = `%${query}%`;
            const startQuery = `${query}%`;

            const [tags, totalCount] = await Promise.all([
                prisma.$queryRaw<Tag[]>`
                    SELECT * FROM "Tag"
                    WHERE LOWER("name") LIKE LOWER(${searchQuery}) OR LOWER("server") LIKE LOWER(${searchQuery})
                    ORDER BY
                        CASE
                            WHEN LOWER("name") = LOWER(${query}) THEN 1
                            WHEN LOWER("name") LIKE LOWER(${startQuery}) THEN 2
                            WHEN LOWER("name") LIKE LOWER(${searchQuery}) THEN 3
                            WHEN LOWER("server") LIKE LOWER(${startQuery}) THEN 4
                            ELSE 5
                        END ASC,
                        "name" ASC
                    LIMIT ${limit} OFFSET ${skip}
                `,
                prisma.tag.count({
                    where: {
                        OR: [
                            { name: { contains: query } },
                            { server: { contains: query } },
                        ],
                    },
                }),
            ]);

            return {
                tags,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            };
        } else {
            const [tags, totalCount] = await Promise.all([
                prisma.tag.findMany({
                    skip,
                    take: limit,
                    orderBy: { count: 'desc' },
                }),
                prisma.tag.count(),
            ]);

            return {
                tags,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            };
        }
    } catch (error) {
        console.error('Error fetching tags:', error);
        return { tags: [], totalPages: 0, currentPage: 1 };
    }
}
