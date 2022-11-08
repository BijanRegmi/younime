import prisma from "../../../prisma"
import { hashPassword } from "../../../utils/crypto"
import validator from "../../../middlewares/validator"

const handler = async (req, res) => {
	if (req.method != "POST") return res.status(405).send()

	const { email, password, userTag } = req.validBody

	if (!email || !password || !userTag) {
		return res.status(400).json({
			message: "One or more required field is missing.",
		})
	}

	try {
		await prisma.user.create({
			data: {
				email,
				password: hashPassword(password),
				userTag,
			},
		})

		return res.status(200).json({
			message: "Account successfully created.",
		})
	} catch (err) {
		if (err.code == "P2002") {
			// Unique constraint failed
			return res.status(400).json({
				message: `An account already exists with this ${err.meta.target}.`,
			})
		}
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default validator(handler)
