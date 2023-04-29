import { router, privateProcedure } from "@/server/trpc"
import { reportProc, reportSchema } from "@/server/controllers/reporting"

export const reportRouter = router({
    report: privateProcedure.input(reportSchema).mutation(reportProc),
})
