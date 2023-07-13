import { getTopAnime } from "@/lib/getTopAnime"
import Section from "@/components/Sections"
import EndlessTop from "@/components/Endless/Top"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Top",
}

const TopPage = async () => {
    const animes = await getTopAnime({ take: 32 })

    return (
        <Section animes={animes}>
            <EndlessTop prefetched={animes.length} />
        </Section>
    )
}

export default TopPage
