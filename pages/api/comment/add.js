import prisma from "@/prisma"

const handler = async (req, res) => {
	if (req.method != "POST")
		return res.status(405).json({ message: "Method not allowed." })

	const { content, spoiler = false, episodeId } = req.body

	try {
		await prisma.user.update({
			where: { email: req.user.email },
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
		return res.sendStatus(200)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default handler
