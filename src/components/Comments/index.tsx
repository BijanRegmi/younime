"use client"

import useOnIntersection from "@/hooks/useObserver"
import { notFound, usePathname } from "next/navigation"
import Comment from "./Comment"
import CommentInput from "./Input"
import { trpc } from "../Context/TrpcContext"
import { Fragment } from "react"
import NoComments from "./NoComments"

export default function Comments() {
    const observeRef = useOnIntersection<HTMLDivElement>({
        onIntersect: () => {
            if (hasNextPage) fetchNextPage()
        },
    })

    const paths = usePathname()?.split("/")

    if (!paths) return notFound()

    const episodeId = Number(paths[2])

    const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
        trpc.comment.get.useInfiniteQuery(
            { episodeId },
            {
                getNextPageParam: lastPage => lastPage.nextCursor,
                refetchOnReconnect: false,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            }
        )

    return (
        <div className="flex flex-col w-full bg-accent-50">
            <CommentInput />
            {isSuccess &&
                data?.pages?.map((page, pageIdx) => (
                    <Fragment key={pageIdx}>
                        {page?.comments?.map(comment => (
                            <Comment
                                key={comment.id}
                                pageIdx={pageIdx}
                                comment={comment}
                                episodeId={episodeId}
                            />
                        ))}
                    </Fragment>
                ))}

            {data?.pages.reduce((a, v) => a + v.comments.length, 0) == 0 && (
                <NoComments />
            )}
            <div
                ref={observeRef}
                style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "transparent",
                }}
            >
                {isFetchingNextPage && hasNextPage ? "Loading..." : ""}
            </div>
        </div>
    )
}
