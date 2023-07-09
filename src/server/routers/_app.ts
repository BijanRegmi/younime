import { router } from "../trpc"
import { userRouter } from "./user"
import { commentRouter } from "./comment"
import { playlistRouter } from "./playlist"
import { reportRouter } from "./reporting"
import { animeRouter } from "./anime"

export const appRouter = router({
    user: userRouter,
    comment: commentRouter,
    playlist: playlistRouter,
    reporting: reportRouter,
    anime: animeRouter,
})

export type AppRouter = typeof appRouter
