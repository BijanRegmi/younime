import { AnimeStatus } from "@prisma/client"
import prisma from "@/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

export async function getHistory({
    status,
}: {
    status: keyof typeof AnimeStatus
}) {
    const session = await getServerSession(authOptions)
    if (!session) return []

    const anime = await prisma.history_entry.findMany({
        where: { status: AnimeStatus[status], userId: session.user.id },
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
    return anime
}
