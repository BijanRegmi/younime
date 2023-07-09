import Section from "@/components/Sections"
import { getUpcomingAnime } from "@/lib/getUpcoming"

const UpcomingPage = async () => {
    const animes = await getUpcomingAnime({ take: 30 })

    return <Section animes={animes} />
}

export default UpcomingPage
