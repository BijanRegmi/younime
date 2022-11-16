import prisma from "../../../prisma"

const handler = async (req, res) => {
	if (req.method != "PATCH")
		return res.status(405).json({ message: "Method not allowed." })

	const { id, content, spoiler } = req.body

	var data
	if (content) data.content = content
	if (spoiler) data.spoiler = spoiler

	try {
		await prisma.user.update({
			where: { email: req.user.email },
			data: {
				comments: {
					update: {
						where: { id },
						data,
					},
				},
			},
		})
		return res.sendStatus(200)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default handler
