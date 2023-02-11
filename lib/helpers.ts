export const durationFormatter = (time: number) => {
	const leadingZeros = new Intl.NumberFormat(undefined, {
		minimumIntegerDigits: 2,
	})
	const seconds = Math.floor(time % 60)
	const minutes = Math.floor(time / 60) % 60
	const hours = Math.floor(time / 3600)
	if (hours === 0) {
		return `${minutes}:${leadingZeros.format(seconds)}`
	} else {
		return `${hours}:${leadingZeros.format(minutes)}:${leadingZeros.format(
			seconds
		)}`
	}
}
