"use client"

import { useContext, useEffect } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Ham from "@/assets/misc/hamburger.svg"

const Hamburger = () => {
    const context = useContext(GlobalContext)

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--sidebarwidth",
            context.state.sidebar ? "3rem" : "12rem"
        )
    }, [context.state.sidebar])

    const toggle = () => {
        context.setState(oldState => {
            return { ...oldState, sidebar: !oldState.sidebar }
        })
    }

    return (
        <Ham
            className="fill-accent-900 flex-shrink-0 w-sidebarSmall aspect-square p-2 cursor-pointer rounded-full hover:bg-accent-400"
            onClick={toggle}
        />
    )
}

export default Hamburger
