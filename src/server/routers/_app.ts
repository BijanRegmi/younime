import { router } from "../trpc"
import { commentRouter } from "./comment"
import { playlistRouter } from "./playlist"

export const appRouter = router({
    comment: commentRouter,
    playlist: playlistRouter,
})

export type AppRouter = typeof appRouter
