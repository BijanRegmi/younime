"use client"
import { useAddComment } from "@/lib/hooks/comments"
import useRequireAuth from "@/lib/hooks/useRequireAuth"
import styles from "@/styles/comments.module.css"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

const CommentInput = () => {
	const [value, setValue] = useState("")
	const { mutate } = useAddComment()
	const episodeId = usePathname().split("/")[2]

	const onsubmit = e => {
		e.preventDefault()
		if (value.length == 0) return
		mutate({ episodeId: Number(episodeId), spoiler: false, content: value })
		setValue("")
	}

	const { ref, session } = useRequireAuth()

	return (
		<div className={styles.cmtItem} ref={ref}>
			<div className={styles.pfp}>
				<Image
					src={session.data?.user?.image}
					fill={true}
					alt={session.data?.user?.name}
					style={{
						objectFit: "cover",
						borderRadius: "50%",
						aspectRatio: "1 / 1",
					}}
				/>
			</div>
			<form onSubmit={onsubmit} className={styles.comment}>
				<input
					type="text"
					onChange={e => setValue(e.target.value)}
					value={value}
					className={styles.input}
					placeholder="Add a comment..."
					required={true}
				/>
				<div className={styles.btns}>
					<button
						type="submit"
						disabled={value.length == 0 ? true : false}
					>
						Submit
					</button>
					<button type="button" onClick={() => setValue("")}>
						Cancel
					</button>
				</div>
			</form>
			<div className={styles.actions} />
		</div>
	)
}
export default CommentInput
