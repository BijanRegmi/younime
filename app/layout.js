import Link from "next/link"
import prisma from "../prisma"

import styles from "../styles/index.module.css"
import "../styles/globals.css"

import HamburgerSvg from "../assets/hamburger.svg"
import SearchBar from "../components/SearchBar"

export default async function RootLayout({ children }) {
	const animeList = await prisma.anime.findMany({
		select: {
			id: true,
			title: true,
			alttitle: true,
		},
	})
	console.log("Fetching animelist from db")

	return (
		<html>
			<head></head>
			<body>
				<main className={styles.main}>
					<div className={styles.header}>
						<HamburgerSvg className={styles.ham} />
						<Link href={"/"} className={styles.logo}>
							yoUnime
						</Link>
						<SearchBar animeList={animeList} />
						<div className={styles.profile}>IMMkkdsjfkdsjfO</div>
					</div>
					<div className={styles.content}>{children}</div>
				</main>
			</body>
		</html>
	)
}
