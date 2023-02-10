import { router, privateProcedure } from "@/server/trpc"

import {
	addPlaylistProc,
	addPlaylistSchema,
} from "@/server/controllers/playlist/add"
import {
	removePlaylistProc,
	removePlaylistSchema,
} from "@/server/controllers/playlist/remove"

export const playlistRouter = router({
	add: privateProcedure.input(addPlaylistSchema).mutation(addPlaylistProc),
	remove: privateProcedure
		.input(removePlaylistSchema)
		.mutation(removePlaylistProc),
})
