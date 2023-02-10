import "@/styles/globals.css"
import layout from "@/styles/index.module.css"

import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

import SessionContext from "@/components/Context/SessionContext"
import { TrpcProvider } from "@/components/Context/TrpcContext"

import Header from "@/components/Navbar"
import Sidebar from "@/components/Navbar/Sidebar"
import ReactContext from "@/components/Context/ReactContext"
import { ReactNode } from "react"

export default async function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = await getServerSession(authOptions)

	return (
		<html>
			<head></head>
			<body>
				<SessionContext session={session}>
					<TrpcProvider>
						<ReactContext>
							{/* @ts-expect-error Server Component */}
							<Header session={session} />
							<div className={layout.content}>
								<Sidebar />
								{children}
							</div>
						</ReactContext>
					</TrpcProvider>
				</SessionContext>
			</body>
		</html>
	)
}