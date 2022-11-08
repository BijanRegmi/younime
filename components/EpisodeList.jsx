import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../styles/episodelist.module.css"

const EpisodeList = ({ episodes }) => {
	const [epList, setEpList] = useState([])

	useEffect(() => {
		setEpList(episodes)
	}, [episodes])

	const router = useRouter()
	return (
		<div className={styles.epList}>
			{epList.map(ep => (
				<Link
					href={router.asPath + `/${ep.id}`}
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
