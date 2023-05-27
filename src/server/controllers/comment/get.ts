import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { CommentInteraction } from "@prisma/client"

export const getCommentSchema = z.object({
    episodeId: z.number(),
    cursor: z.number().nullish(),
})

export async function getCommentProc({
    input,
    ctx,
}: {
    input: TypeOf<typeof getCommentSchema>
    ctx: Context
}) {
    const { episodeId, cursor } = input
    const { prisma, session } = ctx

    const limit = 10

    const comments = await prisma.comment.findMany({
        take: limit,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        where: { episodeId },
        select: {
            id: true,
            content: true,
            spoiler: true,
            commenter: { select: { name: true, image: true, id: true } },
            comment_interactions: {
                select: {
                    userId: true,
                    state: true,
                },
            },
        },
        orderBy: { id: "desc" },
    })

    const MappedComments = comments.map(comment => {
        var status: CommentInteraction | undefined
        const { likes, dislikes } = comment.comment_interactions.reduce(
            (accum, value) => {
                if (value.userId == session?.user?.id) status = value.state
                return {
                    ...accum,
                    likes:
                        accum.likes +
                        Number(value.state == CommentInteraction.LIKED),
                    dislikes:
                        accum.dislikes +
                        Number(value.state == CommentInteraction.DISLIKED),
                }
            },
            { likes: 0, dislikes: 0 }
        )
        const own = session?.user.id == comment.commenter.id
        return {
            ...comment,
            own,
            comment_interactions: undefined,
            likes,
            dislikes,
            status,
        }
    })
    return {
        comments: MappedComments,
        nextCursor: MappedComments[MappedComments.length - 1]?.id || undefined,
    }
}
