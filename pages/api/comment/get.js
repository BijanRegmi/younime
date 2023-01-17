import { withMethods } from "@/lib/apiMiddlewares/withMethods"
import { withValidation } from "@/lib/apiMiddlewares/withValidation"
import { withAuth } from "@/lib/apiMiddlewares/withAuth"
import { getCommentSchema } from "@/lib/validations/comment"
import prisma from "@/prisma"
const handler = async (req, res) => {
	const { episodeId, page } = req.query

	try {
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
		console.log("=======GET COMMENT", comments)
		comments.forEach(comment => {
			const { likes, dislikes } = comment.comment_interactions.reduce(
				(accum, value) => {
					if (value.userId == req.user?.id)
						comment.status = value.state
					return {
						...accum,
						likes: accum.likes + Number(value.state == "LIKED"),
						dislikes:
							accum.dislikes + Number(value.state == "DISLIKED"),
					}
				},
				{ likes: 0, dislikes: 0 }
			)
			comment.likes = likes
			comment.dislikes = dislikes
			delete comment.comment_interactions
			if (likes) console.log(comment)
		})
		return res.status(200).json({
			comments,
			next: comments.length == 10 ? page + 1 : undefined,
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withMethods(
	["GET"],
	withAuth(withValidation(getCommentSchema, handler, "query"), false)
)
