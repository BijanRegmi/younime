import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { CommentInteraction } from "@prisma/client"

export const dislikeCommentSchema = z.object({
    id: z.number().nonnegative(),
    reset: z.boolean().default(false),
})

export const dislikeCommentProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof dislikeCommentSchema>
    ctx: Context
}) => {
    const { id, reset } = input
    const { prisma, session } = ctx

    if (reset) {
        await prisma.comment_interaction.delete({
            where: {
                userId_commentId: {
                    userId: session?.user.id as string,
                    commentId: id,
                },
            },
        })
    } else {
        await prisma.comment_interaction.upsert({
            where: {
                userId_commentId: {
                    userId: session?.user.id as string,
                    commentId: id,
                },
            },
            update: {
                state: CommentInteraction.DISLIKED,
            },
            create: {
                user: { connect: { id: session?.user.id } },
                comment: { connect: { id } },
                state: CommentInteraction.DISLIKED,
            },
        })
    }
    return { message: "Success" }
}
