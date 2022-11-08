import prisma from "../../../prisma"
import authenticator from "../../../middlewares/authenticator"

const handler = async (req, res) => {
	if (req.method != "POST") return res.status(405).send()

	const { content, spoiler = false, episodeId = 30661 } = req.body
	const id = "8e5d6a75-16ea-44e4-a4c2-2efb9aee5b91"

	const { id: cmtId } = await prisma.comment.create({
		data: {
			content,
			spoiler,
		},
		select: {
			id: true,
		},
	})

	await prisma.user.update({
		where: {
			id: id,
		},
		data: {
			comments: {
				connect: { id: cmtId },
			},
		},
		select: { id: true },
	})

	await prisma.episode.update({
		where: { id: episodeId },
		data: {
			comments: {
				connect: {
					id: cmtId,
				},
			},
		},
		select: { id: true },
	})

	return res.json({ cmtId })
}

export default handler
