import styles from "@/styles/watchpage.module.css"
import { useState } from "react"

const Synopsis = ({ synopsis }) => {
	const [expanded, setExpanded] = useState(false)

	const toggle = () => {
		setExpanded(o => !o)
	}

	return (
		<p className={styles.synopsis}>
			{expanded ? synopsis : synopsis.slice(0, 400)}
			{expanded ? <br /> : <span>...</span>}
			<button onClick={toggle}>
				{expanded ? "Show Less" : "Show More"}
			</button>
		</p>
	)
}

export default Synopsis
