import Link from "next/link"
import styles from "../styles/episodelist.module.css"

const EpisodeList = ({ episodes, animeId }) => {
	return (
		<div className={styles.epList}>
			{episodes.map(ep => (
				<Link
					href={`/${animeId}/${ep.id}`}
					passHref
					key={ep.id}
					className={styles.epcard}
				>
					<span>{ep.name}</span>
				</Link>
			))}
		</div>
	)
}

export default EpisodeList
