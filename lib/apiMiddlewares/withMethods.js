export const withMethods = (methods, handler) => {
	return async (req, res) => {
		const valid = methods.includes(req.method)
		if (!valid) return res.status(405).end()

		return handler(req, res)
	}
}
