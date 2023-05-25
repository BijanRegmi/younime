"use client"

import { ReactNode, useContext } from "react"
import { GlobalContext } from "./Context/ReactContext"

export const MainLayout = ({ children }: { children: ReactNode }) => {
    const context = useContext(GlobalContext)
    return (
        <main
            className={`h-full max-h-full flex-grow flex-shrink overflow-scroll max-w-[149rem] ${
                context.state.sidebar ? "w-mainNarrow" : "w-mainWide"
            }`}
        >
            {children}
        </main>
    )
}
