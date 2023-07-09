import { getTopAnime } from "@/lib/getTopAnime"
import { Context } from "@/server/context"
import { TypeOf, z } from "zod"

export const topAnimeSchema = z.object({
    prefetched: z.number().default(0),
    cursor: z.number().nullish(),
})

export const topAnimeProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof topAnimeSchema>
    ctx: Context
}) => {
    const LIMIT = 8

    const animes = await getTopAnime({
        skip: (input.cursor || 0) + input.prefetched,
        take: LIMIT,
    })

    const nextCursor =
        animes.length < LIMIT ? undefined : animes.length + (input.cursor || 0)

    return { animes, nextCursor }
}
