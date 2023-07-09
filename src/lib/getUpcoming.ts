import prisma from "@/prisma"
import { CardAnime } from "@/index"

export async function getUpcomingAnime({
    skip,
    take,
}: {
    skip?: number
    take?: number
}) {
    const result: CardAnime[] = await prisma.anime.findMany({
        where: { status: "Not yet aired" },
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
