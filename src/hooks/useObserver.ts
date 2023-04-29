import { useRef, useCallback, useEffect } from "react"

const useOnIntersection = <T extends Element>({
    onIntersect,
}: {
    onIntersect: () => void
}) => {
    const ref = useRef<T>(null)

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries
            if (target.isIntersecting) {
                onIntersect()
            }
        },
        [onIntersect]
    )

    useEffect(() => {
        const element = ref.current
        if (!element) return
        const option = { threshold: 0 }
        const observer = new IntersectionObserver(handleObserver, option)
        observer.observe(element)
        return () => observer.unobserve(element)
    })

    return ref
}

export default useOnIntersection
