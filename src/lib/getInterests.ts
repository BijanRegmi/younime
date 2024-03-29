import prisma from "@/prisma"
import { CardAnime } from "@/index"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export async function getInteresedAnime({ take = 8 }: { take?: number }) {
    const session = await getServerSession(authOptions)

    const userId = session?.user.id
    if (!userId) return []

    const interest = await prisma.history_entry.findMany({
        where: { userId },
        select: { anime: { select: { genres: { select: { name: true } } } } },
    })

    if (interest.length == 0) return []

    const total = interest.reduce(
        (accum, value) => accum + value.anime.genres.length,
        0
    )

    const increment = (1 / total) * take
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
                `(SELECT A AS id FROM _animeTogenre WHERE B = '${genre}' ORDER BY RAND() LIMIT ${Math.ceil(
                    count
                )})`
        )
        .join(" UNION ALL ")

    const finalQuery = `SELECT a.id, a.title, a.score, a.type, a.thumbnail FROM anime AS a INNER JOIN (${unionQuery}) as q on a.id = q.id`

    console.log(finalQuery)
    const data = await prisma.$queryRawUnsafe<CardAnime[]>(finalQuery)

    return data
}
