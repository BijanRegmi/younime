import styles from "@/styles/episodelist.module.css"
import EpCard from "./EpCard"

const EpisodeList = ({ anime }) => {
	return (
		<div className={styles.epList}>
			{anime.episodes.map(ep => (
				<EpCard
					key={ep.id}
					ep={ep}
					animeId={anime.id}
					studio={anime.studio}
					title={anime.title}
				/>
			))}
		</div>
	)
}

export default EpisodeList
