import { useInteractComment } from "@/lib/hooks/comments"
import styles from "@/styles/comments.module.css"
import Image from "next/image"

import LikeSvg from "@/assets/reactions/like.svg"
import DislikeSvg from "@/assets/reactions/dislike.svg"
import LikedSvg from "@/assets/reactions/liked.svg"
import DislikedSvg from "@/assets/reactions/disliked.svg"

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
			<div className={styles.pfp}>
				<Image
					src={comment.commenter.image}
					fill={true}
					alt={comment.commenter.name}
					style={{
						objectFit: "cover",
						borderRadius: "50%",
						aspectRatio: "1 / 1"
					}}
				/>
			</div>
			<div className={styles.comment}>
				<div className={styles.info}>{comment.commenter.name}</div>
				<div className={styles.content}>{comment.content}</div>
				<div className={styles.stats}>
					{comment.status == "LIKED" ? (
						<LikedSvg
							onClick={like}
							className={styles.interactBtn}
						/>
					) : (
						<LikeSvg
							onClick={like}
							className={styles.interactBtn}
						/>
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
			</div>
			<div className={styles.actions} />
		</div>
	)
}

export default Comment
