import prisma from "@/prisma"
import { withAuth } from "@/lib/apiMiddlewares/withAuth"
import { withMethods } from "@/lib/apiMiddlewares/withMethods"
import { withValidation } from "@/lib/apiMiddlewares/withValidation"
import { commentSchema } from "@/lib/validations/comment"

const handler = async (req, res) => {
	const { content, spoiler, episodeId } = req.body
	try {
		await prisma.user.update({
			where: { id: req.user.id },
			data: {
				comments: {
					create: {
						content,
						spoiler,
						episodeId,
					},
				},
			},
			select: { id: true },
		})
		return res.status(200).json({ message: "Success" })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withMethods(
	["POST"],
	withAuth(withValidation(commentSchema, handler))
)
