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
import { usePathname } from "next/navigation"

const Actions = ({ history }) => {
	const [open, setOpen] = useState(false)

	const { status, updatedAt } = JSON.parse(history)

	const ref = useRef()
	const { ref: authref } = useRequireAuth()

	const [_, animeId, epId] = usePathname().split("/")

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

	const options = {
		"Watching": <Watching />,
		"Completed": <Completed />,
		"Hold": <Hold />,
		"Considering": <Considering />,
		"Dropped": <Dropped />,
	}

	const setStatus = status => {
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
					{Object.entries(options).map((option, idx) => {
						const selected =
							status.toLowerCase() == option[0].toLowerCase()
						return (
							<div
								key={idx}
								className={`${styles.menuItem} ${
									selected ? styles.selected : ""
								}`}
								onClick={e => {
									e.preventDefault()
									setStatus(option[0])
								}}
							>
								{option[1]}
								<span>{option[0]}</span>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default Actions
