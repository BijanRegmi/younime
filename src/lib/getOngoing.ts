import prisma from "@/prisma"
import { CardAnime } from "@/index"

export async function getOngoingAnime() {
    const result: CardAnime[] = await prisma.anime.findMany({
        where: { status: "Ongoing" },
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
