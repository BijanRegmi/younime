import { PrismaClient } from "@prisma/client"
import { CardAnime } from "@/index"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export async function getInteresedAnime({ prisma }: { prisma: PrismaClient }) {
    const session = await getServerSession(authOptions)

    const userId = session?.user.id
    if (!userId) return []

    const interest = await prisma.history_entry.findMany({
        where: { userId },
        select: { anime: { select: { genres: { select: { name: true } } } } },
    })

    const total = interest.reduce(
        (accum, value) => accum + value.anime.genres.length,
        0
    )

    const increment = (1 / total) * 8
    const genreCount = interest.reduce((accum, value) => {
        value.anime.genres.forEach(genre => {
            if (accum[genre.name]) accum[genre.name] += increment
            else accum[genre.name] = increment
        })
        return accum
    }, {} as { [genre: string]: number })

    const unionQuery = Object.entries(genreCount)
        .map(
            ([genre, count]) =>
                `(SELECT "A" as id from "_animeTogenre" where "B" = '${genre}' ORDER BY random() LIMIT ${Math.ceil(
                    count
                )})`
        )
        .join(" UNION ALL ")

    const finalQuery =
        "SELECT id, title, score, type, thumbnail from anime WHERE id IN (" +
        unionQuery +
        ")"

    const data = await prisma.$queryRawUnsafe<CardAnime[]>(finalQuery)

    return data
}
