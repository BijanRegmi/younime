"use client"

import Link from "next/link"
import styles from "../../styles/episodelist.module.css"

const EpCard = ({ ep, animeId, studio, title }) => {
	return (
		<div className={styles.epcardNew}>
			<Link href={`/${animeId}/${ep.id}`} className={styles.details}>
				<h2 className={styles.ep}>Episode: {ep.name}</h2>
				<h4 className={styles.title}>Anime: {title}</h4>
				<h5 className={styles.studio}>Studio: {studio}</h5>
			</Link>
			<div className={styles.actions}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
					/>
				</svg>
			</div>
		</div>
	)
}

export default EpCard
