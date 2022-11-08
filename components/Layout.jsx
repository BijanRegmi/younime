import styles from "../styles/index.module.css"

const Layout = props => {
	return (
		<main className={styles.main}>
			<div className={styles.header}>
			</div>
			<div className={styles.content}>{props.children}</div>
		</main>
	)
}

export default Layout
