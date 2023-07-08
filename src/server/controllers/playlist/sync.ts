import { Context } from "@/server/context"
import { TypeOf, z } from "zod"
import { syncMalHistory } from "@/lib/syncMalHistory"

export const syncMalExportSchema = z.object({
    data: z.string(),
})
export const syncMalExportProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof syncMalExportSchema>
    ctx: Context
}) => {
    const { session } = ctx
    if (!session?.user.id) return false
    const x = await syncMalHistory({
        uid: session?.user.id,
        xml: Buffer.from(input.data, "base64").toString("ascii"),
    })
    console.log(x)
    return true
}
