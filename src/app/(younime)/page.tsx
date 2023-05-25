import Section from "@/components/Sections"
import { getRandomAnime } from "@/lib/getRandomAnime"
import { getInteresedAnime } from "@/lib/getInterests"

export default async function Home() {
    const homeAnimes = await getRandomAnime()
    const interested = await getInteresedAnime()

    return (
        <div className="h-full overflow-scroll max-w-[149rem]">
            <Section animes={interested} title="You may be interested in" />
            <Section animes={homeAnimes} title="Random" />
        </div>
    )
}
