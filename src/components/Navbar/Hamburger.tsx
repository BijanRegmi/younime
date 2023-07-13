"use client"

import Ham from "@/assets/misc/hamburger.svg"
import { useRecoilState } from "recoil"
import { sidebarAtom } from "../Context/state"

const Hamburger = () => {
    const [_sidebar, setSidebar] = useRecoilState(sidebarAtom)

    const toggle = () => setSidebar(o => !o)

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
