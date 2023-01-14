import prisma from "@/prisma"

import HamBurger from "@/assets/hamburger.svg"
import SearchBar from "@/components/Navbar/SearchBar"
import SignIn from "@/components/Navbar/SignIn"
import ProfileHead from "@/components/Navbar/ProfileHead"

import styles from "@/styles/header.module.css"

const Header = async ({ session }) => {
	const animeList = await prisma.anime.findMany({
		select: {
			id: true,
			title: true,
			alttitle: true,
		},
	})

	return (
		<div className={styles.header}>
			<HamBurger className={styles.ham} />
			<div className={styles.logo}>Younime</div>
			<SearchBar animeList={animeList} />
			{session?.user ? <ProfileHead user={session.user} /> : <SignIn />}
		</div>
	)
}

export default Header
