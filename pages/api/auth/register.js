import prisma from "../../../prisma"
import { hashPassword } from "../../../utils/crypto"
import validator from "../../../middlewares/validator"

const handler = async (req, res) => {
	if (req.method != "POST") return res.status(405).send()

	const { email, password } = req.validBody

	if (!email || !password) {
		return res.status(400).json({
			message: "One or more required field is missing.",
		})
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				password: true,
				accounts: { select: { provider: true } },
			},
		})

		// If a user exists that has logged in any providers.
		if (user && user.password)
			return res.status(400).json({ message: "User already registered." })
		else if (user)
			return res.status(400).json({
				message: `User already registered with (${user.accounts
					.map(account => account.provider)
					.join(", ")}) providers.`,
			})

		await prisma.user.create({
			data: {
				email,
				password: hashPassword(password),
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
