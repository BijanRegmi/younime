import { router, publicProcedure } from "@/server/trpc"
import { registerProc, registerSchema } from "../controllers/auth/register"

export const authRouter = router({
    register: publicProcedure.input(registerSchema).mutation(registerProc),
})
