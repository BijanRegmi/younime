import "@/styles/globals.css"
import styles from "@/styles/index.module.css"

import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

import SessionContext from "@/components/Context/SessionContext"
import QueryContext from "@/components/Context/QueryContext"

import Header from "@/components/Navbar"

export default async function RootLayout({ children }) {
	const session = await unstable_getServerSession(authOptions)

	return (
		<html>
			<head></head>
			<body>
				<SessionContext session={session}>
					<QueryContext>
						<main>
							<Header session={session} />
							<div className={styles.content}>{children}</div>
						</main>
					</QueryContext>
				</SessionContext>
			</body>
		</html>
	)
}
