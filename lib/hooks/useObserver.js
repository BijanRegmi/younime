const { useRef, useCallback, useEffect } = require("react")

const useOnIntersection = ({ onIntersect }) => {
	const ref = useRef(null)

	const handleObserver = useCallback(
		entries => {
			const [target] = entries
			if (target.isIntersecting) {
				onIntersect()
			}
		},
		[onIntersect]
	)

	useEffect(() => {
		const element = ref.current
		const option = { threshold: 0 }
		const observer = new IntersectionObserver(handleObserver, option)
		observer.observe(element)
		return () => observer.unobserve(element)
	})

	return ref
}

export default useOnIntersection
