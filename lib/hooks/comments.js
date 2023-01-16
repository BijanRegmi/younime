import { useInfiniteQuery, useMutation, useQueryClient } from "react-query"

export const useCommentList = episodeId => {
	return useInfiniteQuery(
		"getcomments",
		({ pageParam = 0 }) => fetchComments({ pageParam, episodeId }),
		{
			getNextPageParam: lastPage => {
				return lastPage?.next || undefined
			},
			refetchOnWindowFocus: false,
		}
	)
}

export const useAddComment = () => {
	const queryClient = useQueryClient()
	return useMutation(postComment, {
		onSuccess: data => {
			const prevData = queryClient.getQueryData("getcomments")
			prevData.pages[0].comments.unshift(data)
			queryClient.setQueryData("getcomments", prevData)
		},
	})
}

export const useInteractComment = () => {
	const queryClient = useQueryClient()
	return useMutation(interact, {
		onSuccess: (_data, variables, _context) => {
			const { reset, action, id, pageIdx } = variables

			const prevData = queryClient.getQueryData("getcomments")
			prevData.pages[pageIdx].comments.forEach(comment => {
				if (comment.id == id) {
					if (reset) {
						console.log("Resetting")
						if (action == "like") comment.likes--
						else if (action == "dislike") comment.dislikes--

						delete comment["status"]
						console.log(comment.status)
					} else {
						console.log("Not resetting")
						if (comment.status == "LIKED") comment.likes--
						else if (comment.status == "DISLIKED")
							comment.dislikes--

						if (action == "like") comment.likes++
						else if (action == "dislike") comment.dislikes++

						comment.status = action == "like" ? "LIKED" : "DISLIKED"
						console.log(comment.status)
					}
				}
			})
			console.log(prevData.pages[pageIdx].comments)
			queryClient.setQueryData("getcomments", prevData)
		},
	})
}

// ============================================================

const fetchComments = async ({ pageParam, episodeId }) => {
	return await fetch(
		"/api/comment/get?" +
			new URLSearchParams({ episodeId, page: pageParam })
	)
		.then(res => res.json())
		.catch(err => console.error(err))
}

const postComment = async ({ content, spoiler, episodeId }) => {
	return await fetch("/api/comment/add", {
		method: "POST",
		body: JSON.stringify({ content, spoiler, episodeId }),
		headers: { "content-type": "application/json" },
	})
		.then(res => res.json())
		.catch(e => console.error(e))
}

const interact = async ({ action, pageIdx, reset, id }) => {
	return await fetch(`/api/comment/${action}`, {
		method: "POST",
		body: JSON.stringify({ id, reset }),
		headers: { "content-type": "application/json" },
	})
		.then(res => res.json())
		.catch(err => console.error(err))
}
