import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

export const withAuth = (handler, force = true) => {
	return async (req, res) => {
		const session = await unstable_getServerSession(req, res, authOptions)

		if (!session && force)
			return res.status(403).json({ message: "Need authorization." })

		req.user = session?.user
		return handler(req, res)
	}
}
