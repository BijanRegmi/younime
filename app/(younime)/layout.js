import "@/styles/globals.css"
import layout from "@/styles/index.module.css"

import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

import SessionContext from "@/components/Context/SessionContext"
import QueryContext from "@/components/Context/QueryContext"

import Header from "@/components/Navbar"
import Sidebar from "@/components/Navbar/Sidebar"
import ReactContext from "@/components/Context/ReactContext"

export default async function RootLayout({ children }) {
	const session = await unstable_getServerSession(authOptions)

	return (
		<html>
			<head></head>
			<body>
				<SessionContext session={session}>
					<QueryContext>
						<ReactContext>
							<Header session={session} />
							<div className={layout.content}>
								<Sidebar />
								{children}
							</div>
						</ReactContext>
					</QueryContext>
				</SessionContext>
			</body>
		</html>
	)
}
