const { z } = require("zod")

export const withValidation = (schema, handler) => {
	return async (req, res) => {
		try {
			const body = req.body ? JSON.parse(req.body) : {}

			req.body = await schema.parseAsync(body)

			return handler(req, res)
		} catch (err) {
			if (err instanceof z.ZodError)
				return res.status(422).json(err.issues)

			return res.status(422).end()
		}
	}
}
