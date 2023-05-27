import { MouseEvent, useState } from "react"

const useShowOnMouseMove = <T>() => {
    const [timeout, settimeout] = useState<NodeJS.Timeout | null>(null)
    const [show, setShow] = useState(false)

    const display = (milliSec: number) => {
        settimeout(
            setTimeout(() => {
                setShow(false)
            }, milliSec)
        )
        setShow(true)
    }

    return {
        show,
        setShow,
        display,
        cleartimeout: () => {
            if (timeout) clearTimeout(timeout)
        },
        onMouseMove: (e: MouseEvent<T>) => {
            e.preventDefault()
            if (timeout) {
                clearTimeout(timeout)
                settimeout(null)
            }
            display(5000)
        },
    }
}

export default useShowOnMouseMove
