import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, MouseEvent } from "react"

const useRequireAuth = <T>() => {
	const ref = useRef<T>(null)
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		const handleClick = (e: MouseEvent<HTMLElement>) => {
			if (session.status == "authenticated") return
			e.stopPropagation()
			router.push("/api/auth/signin")
		}

		const el = ref.current
		/* @ts-expect-error Types ;-; */
		el?.addEventListener("click", handleClick)

		return () => {
			/* @ts-expect-error Types ;-; */
			el?.removeEventListener("click", handleClick)
		}
	}, [ref, session.status, router])

	return { ref, session }
}

export default useRequireAuth
