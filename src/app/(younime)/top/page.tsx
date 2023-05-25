import { getTopAnime } from "@/lib/getTopAnime"
import VideoCard from "@/components/VideoCard"

const TopPage = async () => {
    const animes = await getTopAnime()

    return (
        <div className="flex flex-row flex-wrap justify-evenly gap-x-4 gap-y-8 overflow-scroll h-full">
            {animes.map(anime => (
                <VideoCard key={anime.id} anime={anime} />
            ))}
        </div>
    )
}

export default TopPage
