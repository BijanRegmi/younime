import { router } from "../trpc"
import { commentRouter } from "./comment"
import { playlistRouter } from "./playlist"
import { reportRouter } from "./reporting"

export const appRouter = router({
    comment: commentRouter,
    playlist: playlistRouter,
    reporting: reportRouter,
})

export type AppRouter = typeof appRouter
