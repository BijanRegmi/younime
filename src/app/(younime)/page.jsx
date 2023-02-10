import VideoCard from "@/components/VideoCard"
import layout from "@/styles/index.module.css"
import prisma from "@/prisma"

export default async function Home() {
	const homeAnimes =
		await prisma.$queryRaw`select id, title, score, studio, thumbnail, age_rating from anime order by random() limit 32;`

	return (
		<div className={layout.homeAnimeContainer}>
			{homeAnimes.map(anime => (
				<VideoCard key={anime.id} video={anime} />
			))}
		</div>
	)
}
