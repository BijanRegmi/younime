import Section from "@/components/Sections"
import { getRandomAnime } from "@/lib/getRandomAnime"
import { getInteresedAnime } from "@/lib/getInterests"
import { getHistory } from "@/lib/getHistory"
import { getOngoingAnime } from "@/lib/getOngoing"

export default async function Home() {
    const homeAnimes = await getRandomAnime()
    const interested = await getInteresedAnime({ take: 3 })
    const watching = await getHistory({ status: "WATCHING", take: 4 })
    const ongoing = await getOngoingAnime({ take: 4 })

    return (
        <>
            <Section animes={watching} title="Continue Watching" />
            <Section animes={interested} title="You may be interested in" />
            <Section animes={ongoing} title="Ongoing" />
            <Section animes={homeAnimes} title="Random" />
        </>
    )
}
