import Link from "next/link"
import AccountSvg from "@/assets/misc/account.svg"
import styles from "@/styles/Navbar/header.module.css"

const SignIn = () => {
	return (
		<Link href={"/api/auth/signin"} className={styles.signin}>
			<AccountSvg />
			<span>SignIn</span>
		</Link>
	)
}

export default SignIn
