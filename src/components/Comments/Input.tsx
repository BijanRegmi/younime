"use client"
import useRequireAuth from "@/hooks/useRequireAuth"
import styles from "@/styles/comments.module.css"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FormEvent, useState } from "react"
import { trpc } from "../Context/TrpcContext"

const CommentInput = () => {
	const [content, setContent] = useState("")
	const episodeId = Number(usePathname()?.split("/")[2])

	const utils = trpc.useContext()
	const { mutate } = trpc.comment.add.useMutation({
		onSuccess: () => {
			utils.comment.get.invalidate()
			setContent("")
		},
	})

	const onsubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (content.length == 0) return
		mutate({ episodeId, spoiler: false, content })
	}

	const { ref, session } = useRequireAuth<HTMLDivElement>()

	return (
		<div className={styles.cmtItem} ref={ref}>
			<div className={styles.pfp}>
				<Image
					src={session.data?.user?.image as string}
					fill={true}
					alt={session.data?.user?.name as string}
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
					onChange={e => setContent(e.target.value)}
					value={content}
					className={styles.input}
					placeholder="Add a comment..."
					required={true}
				/>
				<div className={styles.btns}>
					<button
						type="submit"
						disabled={content.length == 0 ? true : false}
					>
						Submit
					</button>
					<button type="button" onClick={() => setContent("")}>
						Cancel
					</button>
				</div>
			</form>
			<div className={styles.actions} />
		</div>
	)
}
export default CommentInput
