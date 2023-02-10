"use client"
import layout from "@/styles/index.module.css"
import styles from "@/styles/watchpage.module.css"

import Play from "@/assets/videoplayer/play.svg"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import Link from "next/link"

const EpList = ({ episodes }) => {
	const [_, animeId, epId] = usePathname().split("/")
	const curr = episodes.find(ep => ep.id == epId)

	const ref = useRef()

	useEffect(() => {
		ref?.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "nearest",
		})
	}, [ref])

	return (
		<div className={layout.eplist}>
			<div className={styles.stat}>Currently Playing: {curr.name}</div>
			<div className={styles.list}>
				{episodes.map(ep => {
					const playing = epId == ep.id
					return (
						<div
							key={ep.id}
							className={`${styles.ep} ${playing ? styles.epPlaying : ""
								}`}
							ref={playing ? ref : undefined}
						>
							<Play />
							<Link href={`/${animeId}/${ep.id}`}>{ep.name}</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default EpList
