import Section from "@/components/Sections"
import VideoCard from "@/components/VideoCard"
import prisma from "@/prisma"
import { getRandomAnime } from "@/lib/getRandomAnime"
import { getInteresedAnime } from "@/lib/getInterests"

export default async function Home() {
    const homeAnimes = await getRandomAnime({ prisma })
    const interested = await getInteresedAnime({ prisma })

    return (
        <div className="">
            <Section animes={homeAnimes} title="Random" />
            <Section animes={interested} title="You may be interested in" />
        </div>
    )
}
