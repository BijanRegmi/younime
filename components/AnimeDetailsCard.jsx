import Image from "next/image"
import styles from "../styles/animedetailscard.module.css"

const AnimeDetailsCard = ({ anime }) => {
	return (
		<div className={styles.details}>
			<div className={styles.preview}>
				<Image
					src={anime.thumbnail}
					layout="fill"
					alt="Thumbnail"
					fill={true}
					className={styles.thumbnail}
				/>
			</div>
			<div className={styles.titles}>
				<h1>{anime.title}</h1>
				<h6>{anime.alttitle}</h6>
			</div>
			<div className={styles.metadata}>
				<span>{anime.score}☆</span>
				<span>Rated for {anime.age_rating}</span>
				<span>Produced by {anime.studio}</span>
				<span>{anime.season}</span>
				<span>{anime.type}</span>
			</div>
			<div className={styles.genreList}>
				{anime.genres.map((genre, idx) => {
					return (
						<span key={idx} className={styles.genre}>
							{genre.name}
						</span>
					)
				})}
			</div>
			<hr className={styles.divider} />
			<p className={styles.synopsis}>{anime.synopsis}</p>
			{/* "•" */}
		</div>
	)
}

export default AnimeDetailsCard