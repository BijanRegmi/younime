"use client"

import { useContext } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Ham from "@/assets/misc/hamburger.svg"

const Hamburger = () => {
    const context = useContext(GlobalContext)

    const toggle = () => {
        context.setState(oldState => ({
            ...oldState,
            sidebar: !oldState.sidebar,
        }))
    }

    return (
        <Ham
            className="fill-accent-900 flex-shrink-0 w-sidebarSmall aspect-square p-2 cursor-pointer rounded-full hover:bg-accent-400"
            onClick={toggle}
        />
    )
}

export default Hamburger
