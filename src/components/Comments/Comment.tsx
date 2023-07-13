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
import { useState } from "react"
import { Report } from "@/components/Report"
import { Popup } from "../Popup"
import { DeleteComment } from "./Delete"
import Link from "next/link"

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
    const [reporting, setReporting] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const openReportPopup = () => setReporting(true)
    const closeReportPopup = () => setReporting(false)
    const openDeletePopup = () => setDeleting(true)
    const closeDeletePopup = () => setDeleting(false)

    const { mutate: likeMutate } = trpc.comment.like.useMutation({
        onSuccess: (_data, vars) => {
            const { reset, id } = vars

            utils.comment.get.cancel()

            const prevData = utils.comment.get.getInfiniteData({
                episodeId,
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

            utils.comment.get.setInfiniteData({ episodeId }, prevData)
        },
    })

    const { mutate: dislikeMutate } = trpc.comment.dislike.useMutation({
        onSuccess: (_data, vars) => {
            const { reset, id } = vars

            utils.comment.get.cancel()

            const prevData = utils.comment.get.getInfiniteData({
                episodeId,
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

    const onDeleteSuccess = () => {
        const prevData = utils.comment.get.getInfiniteData({
            episodeId,
        })

        prevData?.pages[pageIdx].comments.forEach(c => {
            if (c.id == comment.id) {
                c.id = -1
            }
        })

        utils.comment.get.setInfiniteData({ episodeId }, prevData)
        closeDeletePopup()
    }

    const LikeIcon = comment.status === "LIKED" ? LikedSvg : LikeSvg
    const DislikeIcon = comment.status == "DISLIKED" ? DislikedSvg : DislikeSvg

    if (comment.id == -1) return <></>

    return (
        <div className="flex flex-row gap-5 p-1 mt-4 border-b border-solid border-accent-150 group">
            <Link
                className="w-12 h-12 relative"
                href={`/user/${comment.commenter.id}`}
            >
                <Image
                    src={
                        comment.commenter.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    fill={true}
                    alt={comment.commenter.name || "User pfp"}
                    style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        aspectRatio: "1 / 1",
                    }}
                />
            </Link>
            <div className="text-accent-900 grow flex flex-col gap-1">
                <Link
                    href={`/user/${comment.commenter.id}`}
                    className="font-semibold"
                >
                    {comment.commenter.name}
                </Link>
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
                    <div className="hidden grow justify-end px-4 group-hover:flex">
                        {comment.own ? (
                            <DeleteSvg
                                className="w-5 aspect-square cursor-pointer"
                                onClick={openDeletePopup}
                            />
                        ) : (
                            <ReportSvg
                                className="w-5 aspect-square cursor-pointer"
                                onClick={openReportPopup}
                            />
                        )}
                    </div>
                </div>
            </div>
            {reporting && (
                <Popup onClickOutside={closeReportPopup}>
                    <Report
                        onSuccess={closeReportPopup}
                        onCancel={closeReportPopup}
                        kind="COMMENT"
                        refId={comment.id.toString()}
                    />
                </Popup>
            )}
            {deleting && (
                <Popup onClickOutside={closeDeletePopup}>
                    <DeleteComment
                        onSuccess={onDeleteSuccess}
                        onCancel={closeDeletePopup}
                        id={comment.id}
                    />
                </Popup>
            )}
        </div>
    )
}

export default Comment
