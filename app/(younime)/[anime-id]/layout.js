import EpisodeList from "../../../components/EpisodeList"
import prisma from "../../../prisma"
import styles from "../../../styles/index.module.css"

const animeLayout = async ({ params, children }) => {
	const anime = await prisma.anime.findUnique({
		where: { id: Number(params["anime-id"]) },
		select: {
			id: true,
			title: true,
			studio: true,
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

	return (
		<div className={styles.animePage}>
			{children}
			<EpisodeList anime={anime} />
		</div>
	)
}

export default animeLayout
