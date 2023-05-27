import { TypeOf, z } from "zod"
import { Context } from "@/server/context"

export const addCommentSchema = z.object({
    content: z.string().min(1).max(1024),
    spoiler: z.boolean().default(false),
    episodeId: z.number().nonnegative(),
    animeId: z.number(),
})

export const addCommentProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof addCommentSchema>
    ctx: Context
}) => {
    const { session, prisma } = ctx
    const { content, spoiler, episodeId, animeId } = input

    await prisma.comment.create({
        data: {
            content,
            spoiler,
            episode: { connect: { id_animeId: { id: episodeId, animeId } } },
            commenter: { connect: { id: session?.user.id } },
        },
        select: {
            id: true,
            content: true,
            spoiler: true,
            commenter: { select: { name: true, image: true } },
        },
    })

    return { success: true }
}
