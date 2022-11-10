import EpisodeList from "../../components/EpisodeList"
import prisma from "../../prisma"
import styles from "../../styles/index.module.css"

const animeLayout = async ({ params, children }) => {
	const { episodes } = await prisma.anime.findUnique({
		where: { id: Number(params["anime-id"]) },
		select: {
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
			<EpisodeList episodes={episodes} animeId={params["anime-id"]} />
		</div>
	)
}

export default animeLayout
