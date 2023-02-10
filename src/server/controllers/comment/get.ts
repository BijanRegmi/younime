import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { CommentInteraction } from "@prisma/client"

export const getCommentSchema = z.object({
	episodeId: z.number(),
	page: z.number(),
})

export async function getCommentProc({
	input,
	ctx,
}: {
	input: TypeOf<typeof getCommentSchema>
	ctx: Context
}): Promise<{
	comments: {
		comment_interactions: undefined
		likes: number
		dislikes: number
		status: CommentInteraction | undefined
		content: string
		spoiler: boolean | null
		id: number
		commenter: { name: string | null; image: string | null }
	}[]
	next: number
}> {
	const { episodeId, page } = input
	const { prisma, session } = ctx

	const comments = await prisma.comment.findMany({
		where: { episodeId },
		select: {
			id: true,
			content: true,
			spoiler: true,
			commenter: { select: { name: true, image: true } },
			comment_interactions: {
				select: {
					userId: true,
					state: true,
				},
			},
		},
		skip: page * 10,
		take: 10,
		orderBy: { id: "desc" },
	})

	const MappedComments = comments.map(comment => {
		var status: CommentInteraction | undefined
		const { likes, dislikes } = comment.comment_interactions.reduce(
			(accum, value) => {
				if (value.userId == session?.user?.id) status = value.state
				return {
					...accum,
					likes:
						accum.likes +
						Number(value.state == CommentInteraction.LIKED),
					dislikes:
						accum.dislikes +
						Number(value.state == CommentInteraction.DISLIKED),
				}
			},
			{ likes: 0, dislikes: 0 }
		)
		return {
			...comment,
			comment_interactions: undefined,
			likes,
			dislikes,
			status,
		}
	})
	return {
		comments: MappedComments,
		next: MappedComments.length == 10 ? page + 1 : -1,
	}
}
