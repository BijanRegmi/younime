"use client"

import { useContext } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Ham from "@/assets/misc/hamburger.svg"
import styles from "@/styles/header.module.css"

const Hamburger = () => {
	const context = useContext(GlobalContext)

	const toggle = e => {
		e.preventDefault()

		context.setState(oldState => ({
			...oldState,
			sidebar: !oldState.sidebar,
		}))
	}

	return <Ham className={styles.ham} onClick={toggle} />
}

export default Hamburger
