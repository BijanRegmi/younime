import { authOptions } from "@/pages/api/auth/[...nextauth]"
import type { inferAsyncReturnType } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { getServerSession } from "next-auth"
import prisma from "@/prisma"

export async function createContext(opts: CreateNextContextOptions) {
    const session = await getServerSession(opts.req, opts.res, authOptions)
    return { req: opts.req, res: opts.res, session, prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>
