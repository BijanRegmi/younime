import { PrismaClient } from "@prisma/client"
import { CardAnime } from "@/index"

export async function getUpcomingAnime({ prisma }: { prisma: PrismaClient }) {
    const result: CardAnime[] = await prisma.anime.findMany({
        where: { status: "Upcoming" },
        select: {
            id: true,
            title: true,
            score: true,
            type: true,
            thumbnail: true,
        },
        orderBy: { score: "desc" },
        take: 32,
    })
    return result
}
