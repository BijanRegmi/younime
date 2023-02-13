import AnimeDesc from "@/components/WatchPage/AnimeDesc"
import EpList from "@/components/WatchPage/EpList"
import prisma from "@/prisma"
import layout from "@/styles/index.module.css"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getWatchAnime } from "@/utils/getWatchAnime"

const animeLayout = async ({
	params,
	children,
}: {
	params: { "anime-id": string; "ep-id": string }
	children: ReactNode
}) => {
	const animeId = Number(params["anime-id"])
	const session = await getServerSession(authOptions)

	const anime = await getWatchAnime({ animeId, session, prisma })

	if (!anime) return notFound()

	return (
		<div className={layout.watchpage}>
			{children}
			<EpList episodes={anime.episodes} />
			<AnimeDesc anime={anime} />
		</div>
	)
}

export default animeLayout
