import prisma from "@/prisma"
import { CardAnime } from "@/index"

export async function getTopAnime({
    skip,
    take = 32,
}: {
    skip?: number
    take?: number
}) {
    const result: CardAnime[] = await prisma.anime.findMany({
        where: { title: { not: { contains: "Dub" } } },
        select: {
            id: true,
            title: true,
            score: true,
            type: true,
            thumbnail: true,
        },
        orderBy: { score: "desc" },
        skip,
        take,
    })
    return result
}
