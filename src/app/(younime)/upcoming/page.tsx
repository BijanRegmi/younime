import { getOngoingAnime } from "@/lib/getOngoing"
import prisma from "@/prisma"
import VideoCard from "@/components/VideoCard"

const UpcomingPage = async () => {
    const animes = await getOngoingAnime({ prisma })

    return (
        <div className="flex flex-row flex-wrap justify-evenly gap-x-4 gap-y-8 overflow-scroll h-full">
            {animes.map(anime => (
                <VideoCard key={anime.id} anime={anime} />
            ))}
        </div>
    )
}

export default UpcomingPage
