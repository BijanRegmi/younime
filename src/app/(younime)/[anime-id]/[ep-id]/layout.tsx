import AnimeDesc from "@/components/WatchPage/AnimeDesc"
import EpList from "@/components/WatchPage/EpList"
import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getWatchAnime } from "@/lib/getWatchAnime"

const animeLayout = async ({
    params,
    children,
}: {
    params: { "anime-id": string; "ep-id": string }
    children: ReactNode
}) => {
    const animeId = params["anime-id"]

    const anime = await getWatchAnime({ animeId })

    if (!anime) return notFound()

    return (
        <div className="w-full overflow-y-scroll grid gap-y-2 gap-x-4 h-full watchpage">
            {children}
            <EpList episodes={anime.episodes} />
            <AnimeDesc anime={anime} />
        </div>
    )
}

export default animeLayout
