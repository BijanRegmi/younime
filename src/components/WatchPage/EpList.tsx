"use client"
import layout from "@/styles/index.module.css"
import styles from "@/styles/watchpage.module.css"

import Play from "@/assets/videoplayer/play.svg"
import { notFound, usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { WatchAnime } from "@/app/(younime)/[anime-id]/[ep-id]/layout"

const EpList = ({ episodes }: { episodes: WatchAnime["episodes"] }) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ref?.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "nearest",
		})
	}, [ref])

	const paths = usePathname()?.split("/")
	if (!paths) return notFound()
	const animeId = Number(paths[1])
	const epId = Number(paths[2])
	const curr = episodes.find(ep => ep.id === epId)

	return (
		<div className={layout.eplist}>
			<div className={styles.stat}>Currently Playing: {curr?.name}</div>
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
