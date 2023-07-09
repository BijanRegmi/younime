import EndlessUpcoming from "@/components/Endless/Upcoming"
import Section from "@/components/Sections"
import { getUpcomingAnime } from "@/lib/getUpcoming"

const UpcomingPage = async () => {
    const animes = await getUpcomingAnime({ take: 32 })

    return (
        <Section animes={animes}>
            <EndlessUpcoming prefetched={animes.length} />
        </Section>
    )
}

export default UpcomingPage
