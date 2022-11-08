import prisma from "../../prisma"

const handler = async (req, res) => {
	try {
		const response =
			await prisma.$queryRaw`select id, title, score, studio, thumbnail from anime order by random() limit 32;`
		return res.json(response)
	} catch (err) {
		console.log(err.message)
		return res.status(400).json({
			message: "Something went wrong.",
		})
	}
}

export default handler
