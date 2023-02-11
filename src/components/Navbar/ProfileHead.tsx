"use client"
import { useState } from "react"
import Image from "next/image"
import styles from "@/styles/Navbar/account.module.css"
import Link from "next/link"
import { Session } from "next-auth"

const ProfileHead = ({ user }: { user: Session["user"] }) => {
	const [show, setShow] = useState(false)
	return (
		<div className={styles.profileHead}>
			<Image
				src={user.image as string}
				fill={true}
				alt={user.name as string}
				className={styles.pfp}
				onClick={() => setShow(old => !old)}
			/>
			{show ? (
				<div className={styles.accountPopup}>
					<div className={styles.avatar}>
						<Image
							src={user.image as string}
							fill={true}
							alt={user.name as string}
							style={{
								objectFit: "cover",
								borderRadius: "50%",
							}}
						/>
					</div>
					<div className={styles.details}>
						<div className={styles.name}>
							{user.name ?? "undefined"}
						</div>
						<div className={styles.email}>
							{user.email ?? "undefined"}
						</div>
					</div>
					<Link href="/api/auth/signout">
						<button>SignOut</button>
					</Link>
				</div>
			) : null}
		</div>
	)
}

export default ProfileHead
