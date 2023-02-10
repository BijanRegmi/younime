"use client"

import useOnIntersection from "@/lib/hooks/useObserver"
import { usePathname } from "next/navigation"
import Comment from "./Comment"
import styles from "@/styles/comments.module.css"
import CommentInput from "./Input"
import { useCommentList } from "@/lib/hooks/comments"

export default function Comments() {
	const episodeId = usePathname().split("/")[2]

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useCommentList(episodeId)

	const observeRef = useOnIntersection({
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
