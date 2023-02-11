import styles from "@/styles/comments.module.css"
import Image from "next/image"

import LikeSvg from "@/assets/reactions/like.svg"
import DislikeSvg from "@/assets/reactions/dislike.svg"
import LikedSvg from "@/assets/reactions/liked.svg"
import DislikedSvg from "@/assets/reactions/disliked.svg"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/server/routers/_app"
import { trpc } from "../Context/TrpcContext"
import { CommentInteraction } from "@prisma/client"

type Comment =
	inferRouterOutputs<AppRouter>["comment"]["get"]["comments"][number]

const Comment = ({
	comment,
	pageIdx,
	episodeId,
}: {
	comment: Comment
	pageIdx: number
	episodeId: number
}) => {
	const utils = trpc.useContext()

	const { mutate: likeMutate } = trpc.comment.like.useMutation({
		onSuccess: (_data, vars) => {
			const { reset, id } = vars

			utils.comment.get.cancel()

			const prevData = utils.comment.get.getInfiniteData({ episodeId })

			prevData?.pages[pageIdx].comments.forEach(comment => {
				if (comment.id == id) {
					if (reset) {
						comment.likes--
						comment.status = undefined
					} else {
						if (comment.status == CommentInteraction.LIKED)
							comment.likes--
						else if (comment.status == CommentInteraction.DISLIKED)
							comment.dislikes--

						comment.likes++
						comment.status = CommentInteraction.LIKED
					}
				}
			})

			utils.comment.get.setInfiniteData({ episodeId }, prevData)
		},
	})

	const { mutate: dislikeMutate } = trpc.comment.dislike.useMutation({
		onSuccess: (_data, vars) => {
			const { reset, id } = vars

			utils.comment.get.cancel()

			const prevData = utils.comment.get.getInfiniteData({ episodeId })

			prevData?.pages[pageIdx].comments.forEach(comment => {
				if (comment.id == id) {
					if (reset) {
						comment.dislikes--
						comment.status = undefined
					} else {
						if (comment.status == CommentInteraction.LIKED)
							comment.likes--
						else if (comment.status == CommentInteraction.DISLIKED)
							comment.dislikes--

						comment.dislikes++
						comment.status = CommentInteraction.DISLIKED
					}
				}
			})

			utils.comment.get.setInfiniteData({ episodeId }, prevData)
		},
	})

	const like = () => {
		likeMutate({
			reset: comment.status === CommentInteraction.LIKED,
			id: comment.id,
		})
	}

	const dislike = () => {
		dislikeMutate({
			reset: comment.status === CommentInteraction.DISLIKED,
			id: comment.id,
		})
	}

	return (
		<div className={styles.cmtItem}>
			<div className={styles.pfp}>
				<Image
					src={comment.commenter.image as string}
					fill={true}
					alt={comment.commenter.name as string}
					style={{
						objectFit: "cover",
						borderRadius: "50%",
						aspectRatio: "1 / 1",
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
