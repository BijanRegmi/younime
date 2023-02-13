import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/videocard.module.css"
import { CardAnime } from ".."

const VideoCard = ({ anime }: { anime: CardAnime }) => {
	return (
		<div className={styles.videoCard}>
			<Link href={`/${anime.id}`} style={{ height: "70%" }}>
				<div className={styles.preview}>
					<Image
						src={anime.thumbnail as string}
						className={styles.thumbnail}
						alt="Thumbnail"
						fill={true}
					/>
				</div>
			</Link>
			<div className={styles.metadata}>
				<div className={styles.avatar}>
					{anime.studio ? anime.studio[0] : ""}
				</div>
				<div className={styles.details}>
					<h4 className={styles.title}>{anime.title}</h4>
					<div className={styles.rating}>{anime.age_rating}</div>
					<div className={styles.score}>
						{anime.studio}
						<span> [{anime.score}]</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
