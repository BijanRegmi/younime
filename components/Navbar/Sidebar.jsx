"use client"
import Link from "next/link"

import { useContext } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Home from "@/assets/sidebar/home.svg"
import Shorts from "@/assets/sidebar/shorts.svg"
import Subs from "@/assets/sidebar/subs.svg"
import Explore from "@/assets/sidebar/library.svg"
import SignIn from "@/components/Navbar/SignIn"

import styles from "@/styles/sidebar.module.css"

const Sidebar = () => {
	const context = useContext(GlobalContext)

	return (
		<div
			className={`${styles.sidebar} ${context?.state?.sidebar ? styles.opensidebar : ""
				}`}
		>
			<Link href="/" className={styles.navitem}>
				<Home />
				<span>Home</span>
			</Link>

			<Link href="/shorts" className={styles.navitem}>
				<Shorts />
				<span>Shorts</span>
			</Link>

			<Link href="/subs" className={styles.navitem}>
				<Subs />
				<span>Subs</span>
			</Link>

			<Link href="/explore" className={styles.navitem}>
				<Explore />
				<span>Explore</span>
			</Link>

			{context.state.sidebar && (
				<>
					<hr />
					<div className={styles.onexpand}>
						<div className={styles.signin}>
							<SignIn />
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Sidebar
