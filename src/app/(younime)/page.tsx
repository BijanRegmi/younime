import VideoCard from "@/components/VideoCard"
import layout from "@/styles/index.module.css"
import prisma from "@/prisma"

export interface Anime {
	id: string
	title: string
	score: number
	studio: string
	thumbnail: string
	age_rating: string
}

export default async function Home() {
	const homeAnimes: Anime[] =
		await prisma.$queryRaw`select id, title, score, studio, thumbnail, age_rating from anime order by random() limit 32;`

	return (
		<div className={layout.homeAnimeContainer}>
			{homeAnimes.map(anime => (
				<VideoCard key={anime.id} video={anime} />
			))}
		</div>
	)
}
