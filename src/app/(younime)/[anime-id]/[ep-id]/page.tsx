import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import prisma from "@/prisma"
import { AnimeStatus } from "@prisma/client"

import { getWatchAnime } from "@/lib/getWatchAnime"
import { getAnimeResources } from "@/lib/getAnimeResources"

import VideoPlayer from "@/components/VideoPlayer"
import Comments from "@/components/Comments"
import AnimeDesc from "@/components/WatchPage/AnimeDesc"
import EpList from "@/components/WatchPage/EpList"
import { NoResourcePlayer } from "@/components/VideoPlayer/NoResourcePlayer"

const Page = async ({
    params,
}: {
    params: { "anime-id": string; "ep-id": string }
}) => {
    const animeId = Number(params["anime-id"])
    const epId = Number(params["ep-id"])
    if (isNaN(epId) || isNaN(animeId)) return notFound()

    const anime = await getWatchAnime({ animeId })
    if (!anime) return notFound()

    const resources = await getAnimeResources(epId)

    const session = await getServerSession(authOptions)
    if (session && session.user?.id) {
        await prisma.history_entry.updateMany({
            where: {
                animeId,
                userId: session.user.id,
                status: AnimeStatus.WATCHING,
            },
            data: { epId: epId },
        })
    }

    const currIdx = anime.episodes.findIndex(ep => ep.id === epId)
    const next =
        currIdx == anime.episodes.length - 1
            ? ""
            : `/${animeId}/${anime.episodes[currIdx + 1].id}`
    const prev =
        currIdx == 0 ? "" : `/${animeId}/${anime.episodes[currIdx - 1].id}`

    return (
        <div className="w-full overflow-y-scroll grid gap-y-2 gap-x-4 h-full watchpage">
            {!resources || (!resources.sub && !resources.dub) ? (
                <NoResourcePlayer />
            ) : (
                <VideoPlayer resources={resources} next={next} prev={prev} />
            )}
            <div className="comments">
                <Comments />
            </div>
            <EpList episodes={anime.episodes} />
            <AnimeDesc anime={anime} />
        </div>
    )
}

export default Page
