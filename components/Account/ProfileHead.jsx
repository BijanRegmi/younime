"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import styles from "../../styles/account.module.css"

const ProfileHead = () => {
	const [show, setShow] = useState(false)
	const session = useSession()
	console.log(session)
	return (
		<div className={styles.profileHead}>
			<Image
				src={session.data?.user.image ?? "https://i.pravatar.cc/300"}
				fill={true}
				alt={session.data?.user.name}
				className={styles.pfp}
				onClick={() => setShow(old => !old)}
			/>
			{show ? (
				<div className={styles.accountPopup}>
					<div className={styles.avatar}>
						<Image
							src={
								session.data?.user.image ??
								"https://i.pravatar.cc/300"
							}
							fill={true}
							alt={session.data?.user.name}
							style={{
								objectFit: "cover",
								borderRadius: "50%",
							}}
						/>
					</div>
					<div className={styles.details}>
						<div className={styles.name}>
							{session.data?.user.name ?? "undefined"}
						</div>
						<div className={styles.email}>
							{session.data?.user.email ?? "undefined"}
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default ProfileHead
