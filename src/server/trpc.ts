import { ZodError } from "zod"
import type { Context } from "./context"
import { initTRPC, TRPCError } from "@trpc/server"

const t = initTRPC.context<Context>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code == "BAD_REQUEST" &&
                    error.cause instanceof ZodError
                        ? error.cause
                        : null,
            },
        }
    },
})

const withAuth = t.middleware(({ next, ctx }) => {
    if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" })

    return next()
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(withAuth)
export const middleware = t.middleware
