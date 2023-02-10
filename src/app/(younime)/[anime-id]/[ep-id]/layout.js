import AnimeDesc from "@/components/WatchPage/AnimeDesc"
import EpList from "@/components/WatchPage/EpList"
import prisma from "@/prisma"
import layout from "@/styles/index.module.css"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

const animeLayout = async ({ params, children }) => {
	const animeId = Number(params["anime-id"])
	const epId = Number(params["ep-id"])

	const session = await unstable_getServerSession(authOptions)

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
			history:
				session && session?.user
					? {
						where: { userId: session?.user?.id, animeId },
						select: { status: true, updatedAt: true },
					}
					: false,
			_count: {
				select: { episodes: true },
			},
		},
	})

	if (!anime.history || !anime.history?.length) {
		anime.history = [{ status: "NONE", updatedAt: new Date() }]
	}

	return (
		<div className={layout.watchpage}>
			{children}
			<EpList episodes={anime.episodes} />
			<AnimeDesc anime={anime} />
		</div>
	)
}

export default animeLayout
