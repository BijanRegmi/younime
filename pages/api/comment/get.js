import { withValidation } from "@/lib/apiMiddlewares/withValidation"
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
			},
			skip: page * 10,
			take: 10,
		})
		return res.status(200).json(comments)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withValidation(getCommentSchema, handler, "query")
