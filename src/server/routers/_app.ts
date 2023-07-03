import { router } from "../trpc"
import { authRouter } from "./auth"
import { commentRouter } from "./comment"
import { playlistRouter } from "./playlist"
import { reportRouter } from "./reporting"

export const appRouter = router({
    auth: authRouter,
    comment: commentRouter,
    playlist: playlistRouter,
    reporting: reportRouter,
})

export type AppRouter = typeof appRouter
