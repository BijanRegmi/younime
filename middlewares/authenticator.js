import nookies from "nookies"
import { verifyToken } from "../utils/jwt"

const authenticator = next => {
	return (req, res) => {
		const { token } = nookies.get({ req })
		console.log("Token: ", token)
		const { success, payload, message } = verifyToken(token)

		if (!success) return res.status(400).json({ message })
		req.tokenObj = payload

		return next(req, res)
	}
}
export default authenticator
