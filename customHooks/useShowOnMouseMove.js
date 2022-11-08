import { useState } from "react"

const useShowOnMouseMove = () => {
	const [timeout, settimeout] = useState(null)
	const [show, setShow] = useState(false)

	return {
		show,
		onMouseMove: e => {
			e.preventDefault()
			if (timeout) {
				clearTimeout(timeout)
				settimeout(null)
			}

			settimeout(
				setTimeout(() => {
					setShow(false)
				}, 5000)
			)
			setShow(true)
		},
	}
}

export default useShowOnMouseMove
