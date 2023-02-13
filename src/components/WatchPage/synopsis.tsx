"use client"
import styles from "@/styles/watchpage.module.css"
import { WatchAnime } from "@/utils/getWatchAnime"
import { useState } from "react"

const Synopsis = ({ synopsis }: { synopsis: WatchAnime["synopsis"] }) => {
	const [expanded, setExpanded] = useState(false)

	const toggle = () => {
		setExpanded(o => !o)
	}

	return (
		<p className={styles.synopsis}>
			{expanded ? synopsis : synopsis ? synopsis.slice(0, 400) : null}
			{expanded ? <br /> : <span>...</span>}
			<button onClick={toggle}>
				{expanded ? "Show Less" : "Show More"}
			</button>
		</p>
	)
}

export default Synopsis
