import Image from "next/image"

import LikeSvg from "@/assets/reactions/like.svg"
import DislikeSvg from "@/assets/reactions/dislike.svg"
import LikedSvg from "@/assets/reactions/liked.svg"
import DislikedSvg from "@/assets/reactions/disliked.svg"
import ReportSvg from "@/assets/comments/report.svg"
import DeleteSvg from "@/assets/comments/delete.svg"

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
    episodeAnimeId,
}: {
    comment: Comment
    pageIdx: number
    episodeId: number
    episodeAnimeId: string
}) => {
    const utils = trpc.useContext()

    const { mutate: likeMutate } = trpc.comment.like.useMutation({
        onSuccess: (_data, vars) => {
            const { reset, id } = vars

            utils.comment.get.cancel()

            const prevData = utils.comment.get.getInfiniteData({
                episodeId,
                episodeAnimeId,
            })

            prevData?.pages[pageIdx].comments.forEach(c => {
                if (c.id == id) {
                    if (reset) {
                        c.likes--
                        c.status = undefined
                    } else {
                        if (c.status == CommentInteraction.LIKED) c.likes--
                        else if (c.status == CommentInteraction.DISLIKED)
                            c.dislikes--

                        c.likes++
                        c.status = CommentInteraction.LIKED
                    }
                }
            })

            utils.comment.get.setInfiniteData(
                { episodeId, episodeAnimeId },
                prevData
            )
        },
    })

    const { mutate: dislikeMutate } = trpc.comment.dislike.useMutation({
        onSuccess: (_data, vars) => {
            const { reset, id } = vars

            utils.comment.get.cancel()

            const prevData = utils.comment.get.getInfiniteData({
                episodeId,
                episodeAnimeId,
            })

            prevData?.pages[pageIdx].comments.forEach(c => {
                if (c.id == id) {
                    if (reset) {
                        c.dislikes--
                        c.status = undefined
                    } else {
                        if (c.status == CommentInteraction.LIKED) c.likes--
                        else if (c.status == CommentInteraction.DISLIKED)
                            c.dislikes--

                        c.dislikes++
                        c.status = CommentInteraction.DISLIKED
                    }
                }
            })

            utils.comment.get.setInfiniteData(
                { episodeId, episodeAnimeId },
                prevData
            )
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

    const { mutate: deleteCommment } = trpc.comment.delete.useMutation({
        onSuccess: (_data, vars) => {
            const { id } = vars
            const prevData = utils.comment.get.getInfiniteData({
                episodeId,
                episodeAnimeId,
            })

            prevData?.pages[pageIdx].comments.forEach(c => {
                if (c.id == id) {
                    c.id = -1
                }
            })

            utils.comment.get.setInfiniteData(
                { episodeId, episodeAnimeId },
                prevData
            )
        },
    })

    const LikeIcon = comment.status === "LIKED" ? LikedSvg : LikeSvg
    const DislikeIcon = comment.status == "DISLIKED" ? DislikedSvg : DislikeSvg

    if (comment.id == -1) return <></>

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
                    <LikeIcon
                        onClick={like}
                        className="w-5 aspect-square fill-accent-900 cursor-pointer"
                    />
                    <span>{comment.likes}</span>
                    <DislikeIcon
                        onClick={dislike}
                        className="w-5 aspect-square fill-accent-900 cursor-pointer"
                    />
                    <span>{comment.dislikes}</span>
                    <div className="flex grow justify-end px-4">
                        {comment.own ? (
                            <DeleteSvg
                                className="w-5 aspect-square cursor-pointer"
                                onClick={() => {
                                    deleteCommment({ id: comment.id })
                                }}
                            />
                        ) : (
                            <ReportSvg
                                className="w-5 aspect-square cursor-pointer"
                                onClick={() => {}}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
