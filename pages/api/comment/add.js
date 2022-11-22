import prisma from "@/prisma"
import { withAuth } from "@/lib/apiMiddlewares/withAuth"
import { withMethods } from "@/lib/apiMiddlewares/withMethods"
import { withValidation } from "@/lib/apiMiddlewares/withValidation"
import { addCommentSchema } from "@/lib/validations/comment"

const handler = async (req, res) => {
	const { content, spoiler, episodeId } = req.body
	try {
		const comment = await prisma.comment.create({
			data: {
				content,
				spoiler,
				episodeId,
				commenterId: req.user.id,
			},
			select: {
				id: true,
				content: true,
				spoiler: true,
				commenter: { select: { name: true, image: true } },
			},
		})
		comment.likes = 0
		comment.dislikes = 0
		return res.status(200).json(comment)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withMethods(
	["POST"],
	withAuth(withValidation(addCommentSchema, handler))
)
