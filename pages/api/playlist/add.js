import prisma from "@/prisma"
import { withAuth } from "@/lib/apiMiddlewares/withAuth"
import { withMethods } from "@/lib/apiMiddlewares/withMethods"
import { withValidation } from "@/lib/apiMiddlewares/withValidation"
import { playlistSchema } from "@/lib/validations/playlist"

const handler = async (req, res) => {
	const { animeId, status } = req.body
	try {
		await prisma.history_entry.upsert({
			where: {
				userId_animeId: {
					userId: req.user.id,
					animeId,
				},
			},
			create: {
				userId: req.user.id,
				animeId,
				status,
			},
			update: {
				status,
			},
		})

		return res.status(200).json({ message: "Success" })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withMethods(
	["POST"],
	withAuth(withValidation(playlistSchema, handler))
)
