import VideoCard from "../components/VideoCard"
import prisma from "../prisma"
import styles from "../styles/index.module.css"

export default function Home({ animeList }) {
	return (
		<div className={styles.homeAnimeContainer}>
			{animeList.map(anime => (
				<VideoCard key={anime.id} video={anime} />
			))}
		</div>
	)
}

export const getServerSideProps = async () => {
	const response =
		await prisma.$queryRaw`select id, title, score, studio, age_rating, thumbnail from anime order by random() limit 32;`
	return {
		props: {
			animeList: await response,
		},
	}
}
