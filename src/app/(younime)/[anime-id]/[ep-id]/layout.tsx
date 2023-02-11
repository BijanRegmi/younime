import AnimeDesc from "@/components/WatchPage/AnimeDesc"
import EpList from "@/components/WatchPage/EpList"
import prisma from "@/prisma"
import layout from "@/styles/index.module.css"
import { getServerSession, Session } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { AnimeStatus } from "@prisma/client"

async function getAnime({
	animeId,
	session,
}: {
	animeId: number
	session: Session | null
}) {
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
						select: { status: true },
					}
					: false,
			_count: {
				select: { episodes: true },
			},
		},
	})
	return anime
}

export type WatchAnime = NonNullable<Awaited<ReturnType<typeof getAnime>>>

const animeLayout = async ({
	params,
	children,
}: {
	params: { "anime-id": string; "ep-id": string }
	children: ReactNode
}) => {
	const animeId = Number(params["anime-id"])
	const session = await getServerSession(authOptions)

	const anime = await getAnime({ animeId, session })

	if (!anime) return notFound()

	if (!anime?.history || !anime.history?.length) {
		anime.history = [{ status: AnimeStatus.WATCHING }]
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
