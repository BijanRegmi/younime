import { AnimeStatus, PrismaClient } from "@prisma/client"
import { Session } from "next-auth"

export async function getHistory({
    status,
    session,
    prisma,
}: {
    status: keyof typeof AnimeStatus
    session: Session
    prisma: PrismaClient
}) {
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
