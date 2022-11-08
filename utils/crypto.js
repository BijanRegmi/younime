const bcrypt = require("bcrypt")

export const hashPassword = password => {
	return bcrypt.hashSync(password, 10)
}

export const comparePassword = (raw, hashed) => {
	return bcrypt.compareSync(raw, hashed)
}
