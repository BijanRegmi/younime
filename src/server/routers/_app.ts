import { router } from "../trpc"
import { userRouter } from "./user"
import { commentRouter } from "./comment"
import { playlistRouter } from "./playlist"
import { reportRouter } from "./reporting"

export const appRouter = router({
    user: userRouter,
    comment: commentRouter,
    playlist: playlistRouter,
    reporting: reportRouter,
})

export type AppRouter = typeof appRouter
