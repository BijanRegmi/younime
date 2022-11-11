"use client"

import { useSession } from "next-auth/react"

const ProfileHead = () => {
	const session = useSession()
	console.log(session)
	if (session.status == "authenticated") {
		return <button>Logout {session.data.user.name}</button>
	} else {
		return <button>Login</button>
	}
}

export default ProfileHead
