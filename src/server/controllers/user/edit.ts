import { Context } from "@/server/context"
import { TypeOf, z } from "zod"

export const userEditSchema = z.object({
    name: z.string(),
    bio: z.string(),
})

export const userEditProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof userEditSchema>
    ctx: Context
}) => {
    const { prisma, session } = ctx
    if (!session) return false
    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name: input.name,
            bio: input.bio,
        },
    })
    return true
}
