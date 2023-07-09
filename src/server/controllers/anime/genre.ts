import { Context } from "@/server/context"
import { TypeOf, z } from "zod"

export const genreAnimeSchema = z.object({
    prefetched: z.number().default(0),
    genre: z.string(),
    cursor: z.number().nullish(),
})

export const genreAnimeProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof genreAnimeSchema>
    ctx: Context
}) => {
    const LIMIT = 8

    const { prisma } = ctx

    const result = await prisma.genre.findUnique({
        where: { name: input.genre },
        select: {
            anime: {
                select: {
                    id: true,
                    title: true,
                    score: true,
                    type: true,
                    thumbnail: true,
                },
                orderBy: { score: "desc" },
                skip: (input.cursor || 0) + input.prefetched,
                take: LIMIT,
            },
        },
    })

    const nextCursor =
        (result?.anime.length || 0) < LIMIT
            ? undefined
            : (result?.anime.length || 0) + (input.cursor || 0)

    return { animes: result?.anime || [], nextCursor }
}
