import { TypeOf, z } from "zod"
import { Context } from "@/server/context"

export const deleteCommentSchema = z.object({
    id: z.number().nonnegative(),
})

export const deleteCommentProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof deleteCommentSchema>
    ctx: Context
}) => {
    const { id } = input
    const { prisma, session } = ctx

    await prisma.user.update({
        where: { id: session?.user.id },
        data: { comments: { delete: { id } } },
    })

    return { message: "Success" }
}
