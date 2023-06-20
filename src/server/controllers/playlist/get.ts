import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { AnimeStatus } from "@prisma/client"

export const getPlaylistSchema = z.object({
    userId: z.string(),
    status: z.nativeEnum(AnimeStatus),
})

export const getPlaylistProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof getPlaylistSchema>
    ctx: Context
}) => {
    const { userId, status } = input
    const { prisma } = ctx

    const hist_entries = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            history: {
                where: { status: status },
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
            },
        },
    })
    return { hist: hist_entries?.history.map(h => h.anime) || [] }
}
