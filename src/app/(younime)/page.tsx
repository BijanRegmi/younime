import VideoCard from "@/components/VideoCard"
import prisma from "@/prisma"
import { getRandomAnime } from "@/utils/getRandomAnime"

export default async function Home() {
    const homeAnimes = await getRandomAnime({ prisma })

    return (
        <div className="w-full flex-grow flex-shrink flex flex-row flex-wrap justify-evenly gap-x-4 gap-y-8 overflow-scroll">
            {homeAnimes.map(anime => (
                <VideoCard key={anime.id} anime={anime} />
            ))}
        </div>
    )
}
