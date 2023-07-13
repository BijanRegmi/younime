import EndlessUpcoming from "@/components/Endless/Upcoming"
import Section from "@/components/Sections"
import { getUpcomingAnime } from "@/lib/getUpcoming"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Upcoming" }

const UpcomingPage = async () => {
    const animes = await getUpcomingAnime({ take: 32 })

    return (
        <Section animes={animes}>
            <EndlessUpcoming prefetched={animes.length} />
        </Section>
    )
}

export default UpcomingPage
