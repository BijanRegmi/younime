import { getUpcomingAnime } from "@/lib/getUpcoming"
import { Context } from "@/server/context"
import { TypeOf, z } from "zod"

export const upcomingAnimeSchema = z.object({
    prefetched: z.number().default(0),
    cursor: z.number().nullish(),
})

export const upcomingAnimeProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof upcomingAnimeSchema>
    ctx: Context
}) => {
    const LIMIT = 8

    const animes = await getUpcomingAnime({
        skip: (input.cursor || 0) + input.prefetched,
        take: LIMIT,
    })

    const nextCursor =
        animes.length < LIMIT ? undefined : animes.length + (input.cursor || 0)

    return { animes, nextCursor }
}
