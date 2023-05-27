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

    const histories = await prisma.history_entry.findMany({
        where: { userId: session.user.id, status: AnimeStatus[status] },
        skip,
        take,
        orderBy: { updatedAt: "desc" },
        select: {
            anime: {
                select: {
                    id: true,
                    title: true,
                    score: true,
                    type: true,
                    thumbnail: true,
                },
            },
        },
    })

    return histories.map(history => history.anime) as CardAnime[]
}
