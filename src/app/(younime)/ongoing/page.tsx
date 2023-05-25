import { getUpcomingAnime } from "@/lib/getUpcoming"
import Section from "@/components/Sections"

const OngoingPage = async () => {
    const animes = await getUpcomingAnime()

    return <Section animes={animes} />
}

export default OngoingPage
