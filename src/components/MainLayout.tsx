"use client"

import { ReactNode } from "react"
import { useRecoilState } from "recoil"
import { sidebarAtom } from "./Context/state"

export const MainLayout = ({ children }: { children: ReactNode }) => {
    const [sidebar] = useRecoilState(sidebarAtom)
    return (
        <main
            className={`h-full max-h-full flex-grow flex-shrink overflow-scroll max-w-[149rem] px-2 ${
                sidebar ? "w-mainNarrow" : "w-mainWide"
            }`}
        >
            {children}
        </main>
    )
}
