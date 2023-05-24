import { PrismaClient } from "@prisma/client"
import { Session } from "next-auth"

export async function getWatchAnime({
    animeId,
    session,
    prisma,
}: {
    animeId: string
    session: Session | null
    prisma: PrismaClient
}) {
    const anime = await prisma.anime.findUnique({
        where: { id: animeId },
        select: {
            id: true,
            title: true,
            alttitle: true,
            score: true,
            age_rating: true,
            studio: true,
            season: true,
            type: true,
            thumbnail: true,
            synopsis: true,
            genres: true,
            episodes: {
                select: { name: true, id: true },
                orderBy: { id: "asc" },
            },
            history:
                session && session?.user
                    ? {
                          where: { userId: session?.user?.id, animeId },
                          select: { status: true },
                      }
                    : false,
            _count: {
                select: { episodes: true },
            },
        },
    })
    return anime
}

export type WatchAnime = NonNullable<Awaited<ReturnType<typeof getWatchAnime>>>
