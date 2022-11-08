import { useEffect, useRef } from "react"

const useOnClickOutside = handler => {
	let ref = useRef()

	useEffect(() => {
		let Handler = event => {
			if (!ref.current.contains(event.target)) handler()
		}
		document.addEventListener("mousedown", Handler)
		return () => document.removeEventListener("mousedown", Handler)
	})

	return ref
}

export default useOnClickOutside
