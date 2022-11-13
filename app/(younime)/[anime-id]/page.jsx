import AnimeDetailsCard from "../../../components/AnimeDetailsCard"

const AnimePage = async ({ params }) => {
	return <AnimeDetailsCard animeId={params["anime-id"]} />
}

export default AnimePage
