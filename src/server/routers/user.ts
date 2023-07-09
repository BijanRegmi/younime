import { router, publicProcedure, privateProcedure } from "@/server/trpc"
import { userEditProc, userEditSchema } from "../controllers/user/edit"
import { registerProc, registerSchema } from "../controllers/user/register"

export const userRouter = router({
    register: publicProcedure.input(registerSchema).mutation(registerProc),
    edit: privateProcedure.input(userEditSchema).mutation(userEditProc),
})
