import EndlessOngoing from "@/components/Endless/Ongoing"
import Section from "@/components/Sections"
import { getOngoingAnime } from "@/lib/getOngoing"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ongoing",
}

const OngoingPage = async () => {
    const animes = await getOngoingAnime({ take: 32 })

    return (
        <Section animes={animes}>
            <EndlessOngoing prefetched={animes.length} />
        </Section>
    )
}

export default OngoingPage
