import { TypeOf, z } from "zod"
import { Context } from "@/server/context"

export const removePlaylistSchema = z.object({
    animeId: z.number(),
})

export const removePlaylistProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof removePlaylistSchema>
    ctx: Context
}) => {
    const { animeId } = input
    const { prisma, session } = ctx
    await prisma.history_entry.delete({
        where: {
            userId_animeId: {
                userId: session?.user.id as string,
                animeId,
            },
        },
    })
    return { message: "Success" }
}
