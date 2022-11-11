const bcrypt = require("bcryptjs")

export const hashPassword = password => {
	return bcrypt.hashSync(password, 10)
}

export const comparePassword = (raw, hashed) => {
	return bcrypt.compareSync(raw, hashed)
}
