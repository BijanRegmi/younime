import prisma from "../../prisma"

const handler = async (req, res) => {
	const { id, skip = 0 } = req.query
	try {
		const response = await prisma.anime.findUnique({
			where: { id: Number(id) },
			select: {
				episodes: {
					select: {
						"name": true,
						"file_url": true,
					},
					orderBy: { id: "asc" },
					skip: Number(skip),
					take: 10,
				},
			},
		})
		return res.json(response)
	} catch (err) {
		console.log(err.message)
		return res.status(400).json({
			message: "Something went wrong.",
		})
	}
}

export default handler
