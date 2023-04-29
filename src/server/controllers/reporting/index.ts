import { z, TypeOf } from "zod"
import { Context } from "@/server/context"
import { ReportItem } from "@prisma/client"

export const reportSchema = z.object({
    kind: z.nativeEnum(ReportItem),
    refId: z.string(),
    msg: z.string(),
})

export const reportProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof reportSchema>
    ctx: Context
}) => {
    const { kind, refId, msg } = input
    const { prisma, session } = ctx

    await prisma.report.create({
        data: {
            kind,
            refId,
            content: msg,
            user: { connect: { id: session?.user.id as string } },
        },
    })
    return { message: "success" }
}
