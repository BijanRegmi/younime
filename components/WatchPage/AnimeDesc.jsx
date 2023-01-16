"use client"
import layout from "@/styles/index.module.css"
import styles from "@/styles/watchpage.module.css"
import Image from "next/image"
import Synopsis from "./synopsis"

const AnimeDesc = ({ anime }) => {
	return (
		<div className={layout.animedesc}>
			<div className={styles.meta}>
				<div className={styles.thumbnail}>
					<Image
						src={anime.thumbnail}
						alt={`Thumbnail-${anime.title}`}
						fill={true}
					/>
				</div>
				<div className={styles.info}>
					<h1>{anime.title}</h1>
					<subtitle>{anime.alttitle}</subtitle>
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
