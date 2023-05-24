import { getUpcomingAnime } from "@/lib/getUpcoming"
import prisma from "@/prisma"
import VideoCard from "@/components/VideoCard"

const OngoingPage = async () => {
    const animes = await getUpcomingAnime({ prisma })

    return (
        <div className="flex flex-row flex-wrap justify-evenly gap-x-4 gap-y-8 overflow-scroll h-full">
            {animes.map(anime => (
                <VideoCard key={anime.id} anime={anime} />
            ))}
        </div>
    )
}

export default OngoingPage
