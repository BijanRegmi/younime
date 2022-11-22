import prisma from "@/prisma"
import { withAuth } from "@/lib/apiMiddlewares/withAuth"
import { withMethods } from "@/lib/apiMiddlewares/withMethods"
import { withValidation } from "@/lib/apiMiddlewares/withValidation"
import { interactCommentSchema } from "@/lib/validations/comment"
import { CommentInteraction } from "@prisma/client"

const handler = async (req, res) => {
	const { id, reset } = req.body
	try {
		if (reset) {
			await prisma.comment_interaction.delete({
				where: {
					userId_commentId: {
						userId: req.user.id,
						commentId: id,
					},
				},
			})
		} else {
			await prisma.comment_interaction.upsert({
				where: {
					userId_commentId: {
						userId: req.user.id,
						commentId: id,
					},
				},
				update: {
					state: CommentInteraction.LIKED,
				},
				create: {
					userId: req.user.id,
					commentId: id,
					state: CommentInteraction.LIKED,
				},
			})
		}
		return res.status(200).json({ message: "Success" })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withMethods(
	["POST"],
	withAuth(withValidation(interactCommentSchema, handler))
)
