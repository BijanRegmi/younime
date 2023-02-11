"use client"

import useOnIntersection from "@/lib/hooks/useObserver"
import { usePathname } from "next/navigation"
import Comment from "./Comment"
import styles from "@/styles/comments.module.css"
import CommentInput from "./Input"
import { trpc } from "../Context/TrpcContext"

export default function Comments() {
	const episodeId = Number(usePathname()?.split("/")[2])

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		trpc.comment.get.useInfiniteQuery(
			{ episodeId },
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			}
		)

	const observeRef = useOnIntersection<HTMLDivElement>({
		onIntersect: () => {
			console.log("Intersected")
			console.log(hasNextPage)
			if (hasNextPage) fetchNextPage()
		},
	})

	return (
		<div className={styles.wrapper}>
			<CommentInput />
			{isSuccess &&
				data?.pages?.map((page, pageIdx) =>
					page?.comments?.map(comment => (
						<Comment
							key={comment.id}
							pageIdx={pageIdx}
							comment={comment}
							episodeId={episodeId}
						/>
					))
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
