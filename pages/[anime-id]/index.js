import AnimeDetailsCard from "../../components/AnimeDetailsCard"
import prisma from "../../prisma"
import styles from "../../styles/index.module.css"

const AnimePage = ({ anime }) => {
	return (
		<div className={styles.animePage}>
			<AnimeDetailsCard anime={anime} />
		</div>
	)
}

export const getServerSideProps = async context => {
	const id = context.params["anime-id"]
	const anime = await prisma.anime.findUnique({
		where: { id: Number(id) },
		select: {
			title: true,
			alttitle: true,
			score: true,
			age_rating: true,
			studio: true,
			season: true,
			type: true,
			thumbnail: true,
			synopsis: true,
			genres: {
				select: {
					name: true,
				},
			},
			episodes: {
				select: {
					id: true,
					name: true,
				},
				orderBy: { id: "asc" },
				take: 60,
			},
		},
	})
	return { props: { anime } }
}

export default AnimePage
