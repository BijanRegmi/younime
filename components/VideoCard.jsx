import Image from "next/image"
import Link from "next/link"
import styles from "../styles/videocard.module.css"

const VideoCard = ({ video }) => {
	return (
		<div className={styles.videoCard}>
			<Link href={`/${video.id}`} style={{ height: "70%" }}>
				<div className={styles.preview}>
					<Image
						src={video.thumbnail}
						className={styles.thumbnail}
						alt="Thumbnail"
						fill={true}
					/>
				</div>
			</Link>
			<div className={styles.metadata}>
				<div className={styles.avatar}>{video.studio[0]}</div>
				<div className={styles.details}>
					<h4 className={styles.title}>{video.title}</h4>
					<div className={styles.rating}>{video.age_rating}</div>
					<div className={styles.score}>
						{video.studio}
						<span> [{video.score}]</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
