import Section from "@/components/Sections"
import { getOngoingAnime } from "@/lib/getOngoing"

const OngoingPage = async () => {
    const animes = await getOngoingAnime({ take: 32 })

    return <Section animes={animes} />
}

export default OngoingPage
