import prisma from "../../prisma"

const handler = async (req, res) => {
	try {
		const response = await prisma.anime.findMany({
			select: {
				id: true,
				title: true,
				alttitle: true,
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
