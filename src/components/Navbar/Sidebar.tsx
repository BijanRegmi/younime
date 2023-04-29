"use client"
import Link from "next/link"

import { ReactNode, useContext } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Completed from "@/assets/states/completed.svg"
import Considering from "@/assets/states/considering.svg"
import Dropped from "@/assets/states/dropped.svg"
import Hold from "@/assets/states/hold.svg"
import Watching from "@/assets/states/watching.svg"

import Home from "@/assets/sidebar/home.svg"
import Shorts from "@/assets/sidebar/shorts.svg"
import Subs from "@/assets/sidebar/subs.svg"

const Sidebar = () => {
    const context = useContext(GlobalContext)
    const open = context.state.sidebar

    const links = [
        ["/", Home, "Home"],
        ["/genre", Shorts, "Genres"],
        ["/top", Subs, "Top"],
    ]

    const hiddenLinks = [
        ["/history?status=watching", Watching, "Watching"],
        ["/history?status=completed", Completed, "Completed"],
        ["/history?status=hold", Hold, "Hold"],
        ["/history?status=considering", Considering, "Considering"],
        ["/history?status=dropped", Dropped, "Dropped"],
    ]

    return (
        <div
            className={
                "h-full flex-shrink-0 overflow-x-hidden flex flex-col gap-2 border border-solid border-y-0 border-l-0 border-r-accent-150 " +
                (open ? "w-sidebarWide" : "w-sidebarNarrow")
            }
        >
            {links.map(([href, Item, Text], idx) => {
                return (
                    <NavItem
                        key={idx}
                        href={href}
                        text={Text}
                        sidebarOpen={open}
                    >
                        <div className="w-sidebarNarrow aspect-square flex-shrink-0 flex justify-center items-center">
                            <Item className="fill-accent-900 w-2/3 aspect-square" />
                        </div>
                    </NavItem>
                )
            })}

            {open && (
                <>
                    <hr className="bg-accent-400 h-[1px] w-5/6 m-auto" />
                    <span className="place-self-center text-accent-700">
                        History
                    </span>
                    {hiddenLinks.map(([href, Item, Text], idx) => {
                        return (
                            <NavItem
                                key={idx}
                                href={href}
                                text={Text}
                                sidebarOpen={open}
                            >
                                <div className="w-sidebarNarrow aspect-square flex-shrink-0 flex justify-center items-center">
                                    <Item className="fill-none w-2/3 text-white aspect-square" />
                                </div>
                            </NavItem>
                        )
                    })}
                </>
            )}
        </div>
    )
}

const NavItem = ({
    children,
    href,
    text,
    sidebarOpen,
}: {
    children: ReactNode
    href: string
    text: string
    sidebarOpen: boolean
}) => {
    return (
        <Link
            href={href}
            className={
                (sidebarOpen ? "flex-row" : "flex-col") +
                " w-full flex-shrink-0 no-underline decoration-solid rounded-2xl flex items-center hover:bg-accent-250"
            }
        >
            {children}
            <span
                className={
                    "text-sm text-accent-900 " + (sidebarOpen ? "" : "h-1/5")
                }
            >
                {text}
            </span>
        </Link>
    )
}

export default Sidebar
