"use client"

import useOnIntersection from "@/lib/hooks/useObserver"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useInfiniteQuery } from "react-query"

export default function Comments() {
	const [value, setValue] = useState("")
	const observeRef = useOnIntersection({
		onIntersect: () => {
			if (hasNextPage) fetchNextPage()
		},
	})
	const episodeId = usePathname().split("/")[2]

	const fetchComments = async ({ pageParam = 0 }) => {
		return await fetch(
			"/api/comment/get?" +
			new URLSearchParams({ episodeId, page: pageParam })
		)
			.then(res => res.json())
			.catch(err => console.error(err))
	}

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery("comments", fetchComments, {
			getNextPageParam: lastPage => {
				return lastPage.next
			},
		})

	const onsubmit = e => {
		e.preventDefault()
		fetch("/api/comment/add", {
			method: "POST",
			body: JSON.stringify({
				content: value,
				spoiler: true,
				episodeId: Number(episodeId),
			}),
			headers: { "content-type": "application/json" },
		})
			.then(res => res.json())
			.then(data => {
				setValue("")
				console.log(data)
			})
			.catch(e => console.error(e))
	}

	return (
		<div>
			<form onSubmit={onsubmit}>
				<input
					type="text"
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
				<button type="submit">Submit</button>
			</form>
			{isSuccess &&
				data?.pages?.map(page =>
					page?.comments?.map(comment => (
						<div key={comment.id}>
							{comment.commenter.name}:{" "}
							{comment.spoiler ? "**" : ""}
							{comment.content}
							{comment.spoiler ? "**" : ""}
						</div>
					))
				)}
			<div ref={observeRef}>
				{isFetchingNextPage && hasNextPage
					? "Loading..."
					: "Nothing left"}
			</div>
		</div>
	)
}
