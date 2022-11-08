import prisma from "../../prisma"

const handler = async (req, res) => {
	const str = req.query.q
	try {
		const response = await prisma.anime.findMany({
			where: {
				OR: [
					{
						title: {
							startsWith: str,
							mode: "insensitive",
						},
					},
					{
						alttitle: {
							startsWith: str,
							mode: "insensitive",
						},
					},
				],
			},
			orderBy: {
				id: "asc",
			},
			take: 10,
			select: {
				id: true,
				title: true,
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
