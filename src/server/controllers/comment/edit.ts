import { TypeOf, z } from "zod"
import { Context } from "@/server/context"

export const editCommentSchema = z.object({
    id: z.number().nonnegative(),
    spoiler: z.boolean().optional(),
    content: z.string().min(1).max(1024).optional(),
})

export const editCommentProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof editCommentSchema>
    ctx: Context
}) => {
    const { id, content, spoiler } = input
    const { prisma, session } = ctx

    await prisma.user.update({
        where: { id: session?.user.id },
        data: {
            comments: {
                update: {
                    where: { id },
                    data: { content, spoiler },
                },
            },
        },
    })
    return { message: "Success" }
}
