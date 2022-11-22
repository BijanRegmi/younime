import { useInteractComment } from "@/lib/hooks/comments"
import styles from "@/styles/comments.module.css"

import LikeSvg from "@/assets/like.svg"
import DislikeSvg from "@/assets/dislike.svg"
import LikedSvg from "@/assets/liked.svg"
import DislikedSvg from "@/assets/disliked.svg"

const Comment = ({ comment, pageIdx }) => {
	const { mutate } = useInteractComment()

	const like = e => {
		e.preventDefault()
		mutate({
			action: "like",
			reset: comment.status === "LIKED",
			id: comment.id,
			pageIdx,
		})
	}

	const dislike = e => {
		e.preventDefault()
		mutate({
			action: "dislike",
			reset: comment.status === "DISLIKED",
			id: comment.id,
			pageIdx,
		})
	}

	return (
		<div className={styles.cmtItem}>
			<div className={styles.pfp} />
			<div className={styles.comment}>
				{comment.commenter.name}: {comment.content}
				{comment.spoiler ? "**" : ""}
				{comment.status == "LIKED" ? (
					<LikedSvg onClick={like} className={styles.interactBtn} />
				) : (
					<LikeSvg onClick={like} className={styles.interactBtn} />
				)}
				<span>{comment.likes}</span>
				{comment.status == "DISLIKED" ? (
					<DislikedSvg
						onClick={dislike}
						className={styles.interactBtn}
					/>
				) : (
					<DislikeSvg
						onClick={dislike}
						className={styles.interactBtn}
					/>
				)}
				<span>{comment.dislikes}</span>
			</div>
			<div className={styles.actions} />
		</div>
	)
}

export default Comment
