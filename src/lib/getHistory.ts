import { AnimeStatus } from "@prisma/client"
import prisma from "@/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import { CardAnime } from ".."

export async function getHistory({
    status,
    skip,
    take,
}: {
    status: keyof typeof AnimeStatus
    skip?: number
    take?: number
}) {
    const session = await getServerSession(authOptions)
    if (!session) return []

    const ans = await prisma.anime.findMany({
        where: {
            history: {
                some: {
                    status: AnimeStatus[status],
                    userId: session.user.id,
                },
            },
        },
        skip,
        take,
        select: {
            id: true,
            title: true,
            score: true,
            type: true,
            thumbnail: true,
        },
    })

    return ans as CardAnime[]
}
