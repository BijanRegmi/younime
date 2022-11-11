import Link from "next/link"
import prisma from "../prisma"

import styles from "../styles/index.module.css"
import "../styles/globals.css"

import HamburgerSvg from "../assets/hamburger.svg"
import SearchBar from "../components/SearchBar"

import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import SessionContext from "../components/Context/SessionContext"
import ProfileHead from "../components/ProfileHead"

export default async function RootLayout({ children }) {
	const animeList = await prisma.anime.findMany({
		select: {
			id: true,
			title: true,
			alttitle: true,
		},
	})
	console.log("Fetching animelist from db")

	const session = await unstable_getServerSession(authOptions)
	console.log(session)

	return (
		<html>
			<head></head>
			<body>
				<SessionContext session={session}>
					<main className={styles.main}>
						<div className={styles.header}>
							<HamburgerSvg className={styles.ham} />
							<Link href={"/"} className={styles.logo}>
								yoUnime
							</Link>
							<SearchBar animeList={animeList} />
							<ProfileHead />
						</div>
						<div className={styles.content}>{children}</div>
					</main>
				</SessionContext>
			</body>
		</html>
	)
}
