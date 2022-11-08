import styles from "../styles/index.module.css"
import HamburgerSvg from "../assets/hamburger.svg"
import Link from "next/link"
import SearchBar from "./SearchBar"

const Layout = props => {
	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<HamburgerSvg className={styles.ham} />
				<Link href={"/"} className={styles.logo}>
					yoUnime
				</Link>
				<SearchBar />
				<div className={styles.profile}>IMMkkdsjfkdsjfO</div>
			</div>
			<div className={styles.content}>{props.children}</div>
		</main>
	)
}

export default Layout
