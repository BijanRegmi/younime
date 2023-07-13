import { signIn, useSession } from "next-auth/react"
import { useEffect, useRef, MouseEvent } from "react"

const useRequireAuth = <T>() => {
    const ref = useRef<T>(null)
    const session = useSession()

    useEffect(() => {
        const handleClick = (e: MouseEvent<HTMLElement>) => {
            if (session.status == "authenticated") return
            e.stopPropagation()
            signIn()
        }

        const el = ref.current
        /* @ts-expect-error Types ;-; */
        el?.addEventListener("click", handleClick)

        return () => {
            /* @ts-expect-error Types ;-; */
            el?.removeEventListener("click", handleClick)
        }
    }, [ref, session.status])

    return { ref, session }
}

export default useRequireAuth
