"use client"
import styles from "@/styles/watchpage.module.css"
import { useEffect, useRef, useState } from "react"

import None from "@/assets/states/none.svg"
import Completed from "@/assets/states/completed.svg"
import Considering from "@/assets/states/considering.svg"
import Dropped from "@/assets/states/dropped.svg"
import Hold from "@/assets/states/hold.svg"
import Watching from "@/assets/states/watching.svg"
import useRequireAuth from "@/hooks/useRequireAuth"
import { notFound, usePathname } from "next/navigation"
import { WatchAnime } from "@/app/(younime)/[anime-id]/[ep-id]/layout"
import { AnimeStatus } from "@prisma/client"
import { trpc } from "../Context/TrpcContext"

const Actions = ({
	history,
}: {
	history: WatchAnime["history"][number] | undefined
}) => {
	const [open, setOpen] = useState(false)
	const [status, setStatus] = useState<
		WatchAnime["history"][number]["status"] | undefined
	>()

	useEffect(() => {
		setStatus(history?.status)
	}, [history?.status])

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
	const animeId = Number(paths[1])
	const epId = Number(paths[2])

	const options = {
		"WATCHING": <Watching />,
		"COMPLETED": <Completed />,
		"HOLD": <Hold />,
		"CONSIDERING": <Considering />,
		"DROPPED": <Dropped />,
	}

	const { mutate: addMutate } = trpc.playlist.add.useMutation()
	const { mutate: removeMutate } = trpc.playlist.remove.useMutation()

	const mutateStatus = (stat: AnimeStatus) => {
		if (stat !== status)
			addMutate(
				{ status: stat, animeId, epId },
				{
					onSuccess: () => {
						setStatus(stat)
					},
				}
			)
		else
			removeMutate(
				{ animeId },
				{
					onSuccess: () => {
						setStatus(undefined)
					},
				}
			)
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
						const selected = statusKey === status?.toString()
						return (
							<div
								key={idx}
								className={`${styles.menuItem} ${selected ? styles.selected : ""
									}`}
								onClick={e => {
									e.preventDefault()
									mutateStatus(statusKey)
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
