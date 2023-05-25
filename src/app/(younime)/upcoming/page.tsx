import { getOngoingAnime } from "@/lib/getOngoing"
import Section from "@/components/Sections"

const UpcomingPage = async () => {
    const animes = await getOngoingAnime({ take: 32 })

    return <Section animes={animes} />
}

export default UpcomingPage
