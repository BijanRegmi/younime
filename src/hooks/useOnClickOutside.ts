import { useEffect, useRef } from "react"

const useOnClickOutside = <T>({ handler }: { handler: () => void }) => {
    let ref = useRef<T>(null)

    useEffect(() => {
        let Handler = (event: MouseEvent) => {
            /* @ts-expect-error Types ;-; */
            if (!ref?.current?.contains(event.target)) handler()
        }
        document.addEventListener("mousedown", Handler)
        return () => document.removeEventListener("mousedown", Handler)
    })

    return ref
}

export default useOnClickOutside
