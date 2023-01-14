import Link from "next/link"
import prisma from "@/prisma"

import styles from "@/styles/index.module.css"
import "@/styles/globals.css"

import HamburgerSvg from "@/assets/hamburger.svg"
import SearchBar from "@/components/Navbar/SearchBar"

import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import SessionContext from "@/components/Context/SessionContext"
import ProfileHead from "@/components/Navbar/ProfileHead"
import SignIn from "@/components/Navbar/SignIn"
import QueryContext from "@/components/Context/QueryContext"

export default async function RootLayout({ children }) {
	const animeList = await prisma.anime.findMany({
		select: {
			id: true,
			title: true,
			alttitle: true,
		},
	})

	const session = await unstable_getServerSession(authOptions)

	return (
		<html>
			<head></head>
			<body>
				<SessionContext session={session}>
					<QueryContext >
						<main className={styles.main}>
							<div className={styles.header}>
								<HamburgerSvg className={styles.ham} />
								<Link href={"/"} className={styles.logo}>
									yoUnime
								</Link>
								<SearchBar animeList={animeList} />
								{session?.user ? (
									<ProfileHead user={session.user} />
								) : (
									<SignIn />
								)}
							</div>
							<div className={styles.content}>{children}</div>
						</main>
					</QueryContext>
				</SessionContext>
			</body>
		</html>
	)
}
