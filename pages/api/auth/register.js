import prisma from "@/prisma"
import { hashSync } from "bcryptjs"

import { withMethods } from "@/lib/apiMiddlewares/withMethods"
import { withValidation } from "@/lib/apiMiddlewares/withValidation"
import { registerSchema } from "@/lib/validations/register"

const handler = async (req, res) => {
	const { email, password } = req.body
	try {
		await prisma.user.create({
			data: {
				email,
				password: hashSync(password),
			},
		})

		return res.status(200).json({
			message: "Account successfully created.",
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

export default withMethods(["POST"], withValidation(registerSchema, handler))
