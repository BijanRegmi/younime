import { getTopAnime } from "@/lib/getTopAnime"
import Section from "@/components/Sections"

const TopPage = async () => {
    const animes = await getTopAnime()

    return <Section animes={animes} />
}

export default TopPage
