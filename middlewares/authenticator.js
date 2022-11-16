import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"

const authenticator = next => {
	return async (req, res) => {
		const session = await unstable_getServerSession(authOptions)

		if (!session.user)
			return res.status(400).json({ message: "Not logged in." })

		req.user = session.user
		return next(req, res)
	}
}
export default authenticator
