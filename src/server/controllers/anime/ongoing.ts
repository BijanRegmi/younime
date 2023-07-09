import { getOngoingAnime } from "@/lib/getOngoing"
import { Context } from "@/server/context"
import { TypeOf, z } from "zod"

export const ongoingAnimeSchema = z.object({
    prefetched: z.number().default(0),
    cursor: z.number().nullish(),
})

export const ongoingAnimeProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof ongoingAnimeSchema>
    ctx: Context
}) => {
    const LIMIT = 8

    const animes = await getOngoingAnime({
        skip: (input.cursor || 0) + input.prefetched,
        take: LIMIT,
    })

    const nextCursor =
        animes.length < LIMIT ? undefined : animes.length + (input.cursor || 0)

    return { animes, nextCursor }
}
