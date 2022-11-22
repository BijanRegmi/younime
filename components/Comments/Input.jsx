"use client"
import { useAddComment } from "@/lib/hooks/comments"
import styles from "@/styles/comments.module.css"
import { usePathname } from "next/navigation"
import { useState } from "react"

const CommentInput = () => {
	const [value, setValue] = useState("")
	const { mutate } = useAddComment()
	const episodeId = usePathname().split("/")[2]

	const onsubmit = e => {
		e.preventDefault()
		mutate({ episodeId: Number(episodeId), spoiler: false, content: value })
		setValue("")
	}

	return (
		<div className={styles.cmtItem}>
			<div className={styles.pfp} />
			<form onSubmit={onsubmit} className={styles.comment}>
				<input
					type="text"
					onChange={e => setValue(e.target.value)}
					value={value}
					className={styles.input}
					placeholder="Add a comment..."
				/>
				<div className={styles.btns}>
					<button className={styles.cancel}>Cancel</button>
					<button type="submit" className={styles.submit}>
						Submit
					</button>
				</div>
			</form>
			<div className={styles.actions} />
		</div>
	)
}
export default CommentInput
