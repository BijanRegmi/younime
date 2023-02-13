import styles from "@/styles/watchpage.module.css"
import Image from "next/image"
import Synopsis from "@/components/WatchPage/synopsis"
import Actions from "@/components/WatchPage/Actions"
import { WatchAnime } from "@/utils/getWatchAnime"

const AnimeDesc = ({ anime }: {anime: WatchAnime}) => {
	return (
		<div className="flex flex-col gap-2">
			<div className={styles.meta}>
				<div className={styles.thumbnail}>
					<Image
						src={anime.thumbnail || ""}
						alt={`Thumbnail-${anime.title}`}
						fill={true}
					/>
				</div>
				<div className={styles.info}>
					<h1>{anime.title}</h1>
					<h5>{anime.alttitle}</h5>
					<div>
						<span className={styles.topic}>Rating</span>
						{anime.age_rating}
						<span className={styles.topic}>Score</span>
						{anime.score}☆
					</div>
					<div>
						<span className={styles.topic}>Studio</span>
						{anime.studio}
						<span className={styles.topic}>Season</span>
						{anime.season}
						<span className={styles.topic}>Type</span>
						{anime.type}
					</div>
					<div>
						<span className={styles.topic}>Episodes</span>
						{anime._count.episodes}
					</div>
				</div>
				<Actions history={anime.history[0]} />
			</div>
			<div className={styles.genres}>
				{anime.genres.map((g, idx) => (
					<div key={idx} className={styles.genre}>
						{g.name}
					</div>
				))}
			</div>
			<Synopsis synopsis={anime.synopsis} />
		</div>
	)
}

export default AnimeDesc
