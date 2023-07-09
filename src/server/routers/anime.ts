import { router, publicProcedure } from "@/server/trpc"
import { genreAnimeProc, genreAnimeSchema } from "../controllers/anime/genre"
import {
    ongoingAnimeProc,
    ongoingAnimeSchema,
} from "../controllers/anime/ongoing"
import { topAnimeProc, topAnimeSchema } from "../controllers/anime/top"
import {
    upcomingAnimeProc,
    upcomingAnimeSchema,
} from "../controllers/anime/upcoming"

export const animeRouter = router({
    ongoing: publicProcedure.input(ongoingAnimeSchema).query(ongoingAnimeProc),
    genre: publicProcedure.input(genreAnimeSchema).query(genreAnimeProc),
    top: publicProcedure.input(topAnimeSchema).query(topAnimeProc),
    upcoming: publicProcedure
        .input(upcomingAnimeSchema)
        .query(upcomingAnimeProc),
})
