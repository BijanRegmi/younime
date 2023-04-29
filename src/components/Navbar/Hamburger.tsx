"use client"

import { useContext, useEffect } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Ham from "@/assets/misc/hamburger.svg"

const Hamburger = () => {
    const context = useContext(GlobalContext)

    const toggle = () => {
        context.setState(oldState => {
            return {
                ...oldState,
                sidebar: !oldState.sidebar,
            }
        })
    }

    return (
        <div className="flex-shrink-0 w-sidebarNarrow aspect-square cursor-pointer flex justify-center items-center">
            <Ham
                className="w-2/3 aspect-square fill-accent-900 p-2 rounded-full hover:bg-accent-250"
                onClick={toggle}
            />
        </div>
    )
}

export default Hamburger
