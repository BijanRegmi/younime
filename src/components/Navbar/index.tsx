import prisma from "@/prisma"

import SearchBar from "@/components/Navbar/SearchBar"
import SignIn from "@/components/Navbar/SignIn"
import ProfileHead from "@/components/Navbar/ProfileHead"
import HamBurger from "@/components/Navbar/Hamburger"

import styles from "@/styles/Navbar/header.module.css"
import { Session } from "next-auth"

export type SearchAnime = {
	id: number
	title: string
	alttitle: string | null
}

const Header = async ({ session }: { session: Session | null }) => {
	const animeList: SearchAnime[] = await prisma.anime.findMany({
		select: {
			id: true,
			title: true,
			alttitle: true,
		},
	})

	return (
		<div className={styles.header}>
			<HamBurger />
			<div className={styles.logo}>Younime</div>
			<SearchBar animeList={animeList} />
			{session?.user ? <ProfileHead user={session.user} /> : <SignIn />}
		</div>
	)
}

export default Header
