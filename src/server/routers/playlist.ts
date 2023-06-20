import { router, privateProcedure, publicProcedure } from "@/server/trpc"

import {
    addPlaylistProc,
    addPlaylistSchema,
} from "@/server/controllers/playlist/add"
import {
    removePlaylistProc,
    removePlaylistSchema,
} from "@/server/controllers/playlist/remove"
import { getPlaylistProc, getPlaylistSchema } from "../controllers/playlist/get"

export const playlistRouter = router({
    add: privateProcedure.input(addPlaylistSchema).mutation(addPlaylistProc),
    remove: privateProcedure
        .input(removePlaylistSchema)
        .mutation(removePlaylistProc),
    get: publicProcedure.input(getPlaylistSchema).query(getPlaylistProc),
})
