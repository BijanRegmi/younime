import prisma from "../../prisma"

const handler = async (req, res) => {
	const { id = 0 } = req.query
	try {
		const response = await prisma.anime.findUnique({
			where: { id: Number(id) },
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
