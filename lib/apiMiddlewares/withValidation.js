const { z } = require("zod")

export const withValidation = (schema, handler, location = "body") => {
	return async (req, res) => {
		try {
			const data = req[location] || {}

			req[location] = await schema.parseAsync(data)

			return handler(req, res)
		} catch (err) {
			console.log(err)
			if (err instanceof z.ZodError)
				return res.status(422).json(err.issues)

			return res.status(422).end()
		}
	}
}
