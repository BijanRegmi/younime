import { PrismaClient } from "@prisma/client"
import { CardAnime } from "@/index"

export async function getTopAnime({ prisma }: { prisma: PrismaClient }) {
    const result: CardAnime[] = await prisma.anime.findMany({
        where: { title: { not: { contains: "Dub" } } },
        select: {
            id: true,
            title: true,
            score: true,
            type: true,
            thumbnail: true,
        },
        distinct: "malId",
        orderBy: { score: "desc" },
        take: 32,
    })
    return result
}
