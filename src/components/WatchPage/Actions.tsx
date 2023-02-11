"use client"
import styles from "@/styles/watchpage.module.css"
import { useEffect, useRef, useState } from "react"

import None from "@/assets/states/none.svg"
import Completed from "@/assets/states/completed.svg"
import Considering from "@/assets/states/considering.svg"
import Dropped from "@/assets/states/dropped.svg"
import Hold from "@/assets/states/hold.svg"
import Watching from "@/assets/states/watching.svg"
import useRequireAuth from "@/lib/hooks/useRequireAuth"
import { notFound, usePathname } from "next/navigation"
import { WatchAnime } from "@/app/(younime)/[anime-id]/[ep-id]/layout"
import { AnimeStatus } from "@prisma/client"

const Actions = ({ history }: { history: WatchAnime["history"][number] }) => {
	const [open, setOpen] = useState(false)

	const ref = useRef<HTMLDivElement>(null)
	const { ref: authref } = useRequireAuth<HTMLDivElement>()

	const toggle = () => {
		setOpen(o => !o)
	}

	useEffect(() => {
		if (open) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			})
		}
	}, [ref, open])

	const paths = usePathname()?.split("/")
	if (!paths) return notFound()
	const animeId = paths[1]
	const epId = paths[2]

	const options = {
		"WATCHING": <Watching />,
		"COMPLETED": <Completed />,
		"HOLD": <Hold />,
		"CONSIDERING": <Considering />,
		"DROPPED": <Dropped />,
	}

	const setStatus = (status: AnimeStatus) => {
		fetch("/api/playlist/add", {
			method: "POST",
			body: JSON.stringify({
				animeId: Number(animeId),
				epId: Number(epId),
				status: status.toUpperCase(),
			}),
			headers: { "content-type": "application/json" },
		}).then(() => {
			setOpen(false)
		})
	}

	return (
		<div className={styles.actions} ref={authref}>
			<None
				className={`${styles.state} ${open ? styles.stateOpen : ""}`}
				onClick={toggle}
			/>

			{open && (
				<div className={styles.menu} ref={ref}>
					{(
						Object.keys(AnimeStatus) as Array<
							keyof typeof AnimeStatus
						>
					).map((statusKey, idx) => {
						const selected = statusKey === history.status.toString()
						return (
							<div
								key={idx}
								className={`${styles.menuItem} ${selected ? styles.selected : ""
									}`}
								onClick={e => {
									e.preventDefault()
									setStatus(statusKey)
								}}
							>
								{options[statusKey]}
								<span>{statusKey}</span>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default Actions
