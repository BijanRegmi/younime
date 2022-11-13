import VideoCard from "../../components/VideoCard"
import styles from "../../styles/index.module.css"
import prisma from "../../prisma"

export default async function Home() {
	const homeAnimes =
		await prisma.$queryRaw`select id, title, score, studio, thumbnail, age_rating from anime order by random() limit 32;`

	return (
		<div className={styles.homeAnimeContainer}>
			{homeAnimes.map(anime => (
				<VideoCard key={anime.id} video={anime} />
			))}
		</div>
	)
}
