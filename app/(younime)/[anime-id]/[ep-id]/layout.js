import AnimeDesc from "@/components/WatchPage/AnimeDesc"
import EpList from "@/components/WatchPage/EpList"
import prisma from "@/prisma"
import layout from "@/styles/index.module.css"

const animeLayout = async ({ params, children }) => {
	const animeId = Number(params["anime-id"])
	const epId = Number(params["ep-id"])

	const anime = await prisma.anime.findUnique({
		where: { id: animeId },
		select: {
			id: true,
			title: true,
			alttitle: true,
			score: true,
			age_rating: true,
			studio: true,
			season: true,
			type: true,
			thumbnail: true,
			synopsis: true,
			genres: true,
			episodes: {
				select: { name: true, id: true },
			},
			_count: {
				select: { episodes: true },
			},
		},
	})

	return (
		<div className={layout.watchpage}>
			{children}
			<EpList episodes={anime.episodes} />
			<AnimeDesc anime={anime} />
		</div>
	)
}

export default animeLayout
