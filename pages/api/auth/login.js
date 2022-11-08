import prisma from "../../../prisma"
import { comparePassword } from "../../../utils/crypto"
import nookies from "nookies"
import { tokenize } from "../../../utils/jwt"

const handler = async (req, res) => {
	if (req.method != "POST") return res.status(405).send()

	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			message: "One or more required field is missing.",
		})
	}

	const user = await prisma.user.findUnique({ where: { email } })
	if (user === null) return res.json({ message: "User not registered." })

	if (!comparePassword(password, user.password))
		return res.json({ message: "Password incorrect." })

	const token = tokenize({ id: user.id })
	nookies.set({ res }, "token", token)

	return res.json({ message: "Success", id: user.id })
}

export default handler
