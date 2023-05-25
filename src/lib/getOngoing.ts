import prisma from "@/prisma"
import { CardAnime } from "@/index"

export async function getOngoingAnime({
    skip,
    take,
}: {
    skip?: number
    take?: number
}) {
    const result: CardAnime[] = await prisma.anime.findMany({
        where: { status: "Ongoing" },
        skip,
        take,
        select: {
            id: true,
            title: true,
            score: true,
            type: true,
            thumbnail: true,
        },
        orderBy: { score: "desc" },
    })
    return result
}
