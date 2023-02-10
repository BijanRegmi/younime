"use client"
import { SessionProvider } from "next-auth/react"

const SessionContext = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	)
}

export default SessionContext
