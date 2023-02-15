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
		<div className="flex flex-row gap-5 p-1 mt-4 border-b border-solid border-accent-150">
			<div className="w-12 h-12 relative">
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
			<div className="text-accent-900 grow flex flex-col gap-1">
				<div className="font-semibold">{comment.commenter.name}</div>
				<div className="">{comment.content}</div>
				<div className="flex flex-row gap-1">
					{comment.status == "LIKED" ? (
						<LikedSvg
							onClick={like}
							className="w-5 aspect-square fill-accent-900 cursor-pointer"
						/>
					) : (
						<LikeSvg
							onClick={like}
							className="w-5 aspect-square fill-accent-900 cursor-pointer"
						/>
					)}
					<span>{comment.likes}</span>
					{comment.status == "DISLIKED" ? (
						<DislikedSvg
							onClick={dislike}
							className="w-5 aspect-square fill-accent-900 cursor-pointer"
						/>
					) : (
						<DislikeSvg
							onClick={dislike}
							className="w-5 aspect-square fill-accent-900 cursor-pointer"
						/>
					)}
					<span>{comment.dislikes}</span>
				</div>
			</div>
			<div className="w-[5%] opacity-0" />
		</div>
	)
}

export default Comment
