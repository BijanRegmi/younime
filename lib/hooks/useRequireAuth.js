import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

const useRequireAuth = () => {
	const ref = useRef()
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		const handleClick = e => {
			if (session.status == "authenticated") return
			e.stopPropagation()
			router.push("/api/auth/signin")
		}

		const el = ref.current
		el?.addEventListener("click", handleClick)

		return () => {
			el?.removeEventListener("click", handleClick)
		}
	}, [ref, session.status, router])

	return { ref, session }
}

export default useRequireAuth
