const _validators = {
	email: value => {
		const emailRegex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

		return [
			(value.match(emailRegex) && value) || undefined,
			"Email format is invalid.",
		]
	},
	password: value => [
		(value.length >= 8 && value) || undefined,
		"Password length must be greater or equal to 8.",
	],
}

const validator = next => {
	return (req, res) => {
		let validBody = {}
		for (let property in req.body) {
			if (property in _validators) {
				var result = _validators[property](req.body[property])
				if (result[0] === undefined)
					return res.status(400).json({
						message: result[1],
					})
				validBody[property] = result[0]
			}
		}
		req.validBody = validBody
		return next(req, res)
	}
}

export default validator
