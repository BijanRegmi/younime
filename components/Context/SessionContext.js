"use client"

import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

const SessionContext = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default SessionContext
