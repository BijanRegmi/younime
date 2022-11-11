import { sign, verify } from "jsonwebtoken"

export const tokenize = data => {
	return sign(data, process.env.TOKEN_SECRET, { expiresIn: "2d" })
}

export const verifyToken = token => {
	try {
		const data = verify(token, process.env.TOKEN_SECRET)
		return { success: true, payload: data }
	} catch (err) {
		console.error(err)
		return { success: false, message: err.message }
	}
}
