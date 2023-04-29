import { MouseEvent, useState } from "react"

const useShowOnMouseMove = <T>() => {
    const [timeout, settimeout] = useState<NodeJS.Timeout | null>(null)
    const [show, setShow] = useState(false)

    return {
        show,
        setShow,
        cleartimeout: () => {
            if (timeout) clearTimeout(timeout)
        },
        onMouseMove: (e: MouseEvent<T>) => {
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
