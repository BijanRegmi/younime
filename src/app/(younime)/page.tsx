import VideoCard from "@/components/VideoCard"
import layout from "@/styles/index.module.css"
import prisma from "@/prisma"
import { getRandomAnime } from "@/utils/getRandomAnime"

export default async function Home() {
	const homeAnimes = await getRandomAnime({ prisma })

	return (
		<div className={layout.homeAnimeContainer}>
			{homeAnimes.map(anime => (
				<VideoCard key={anime.id} anime={anime} />
			))}
		</div>
	)
}
