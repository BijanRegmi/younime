"use client"
import Link from "next/link"

import { useContext } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import Home from "@/assets/sidebar/home.svg"
import Shorts from "@/assets/sidebar/shorts.svg"
import Subs from "@/assets/sidebar/subs.svg"
import Explore from "@/assets/sidebar/library.svg"
import SignIn from "@/components/Navbar/SignIn"

const Sidebar = () => {
    const context = useContext(GlobalContext)
    const open = context.state.sidebar

    const links = [
        ["/", Home, "Home"],
        ["/genre", Shorts, "Genres"],
        ["/top", Subs, "Top"],
        ["/explore", Explore, "Explore"],
    ]

    return (
        <div
            className={
                "h-full flex-shrink-0 overflow-x-hidden flex flex-col gap-2 border border-solid border-y-0 border-l-0 border-r-accent-150 " +
                (open ? "w-sidebarFull" : "w-sidebarSmall")
            }
        >
            {links.map(([href, Item, Text], idx) => {
                return (
                    <Link
                        href={href}
                        key={idx}
                        className={
                            (open
                                ? "p-2 flex-row justify-start gap-2 h-12 "
                                : "py-2 px-3 flex-col justify-center ") +
                            " w-full flex-shrink-0 no-underline decoration-solid rounded-2xl flex items-center hover:bg-accent-450"
                        }
                    >
                        <Item
                            className={
                                "fill-accent-900 flex-shrink-0 aspect-square " +
                                (open ? "h-4/5" : "w-4/5")
                            }
                        />
                        <span
                            className={
                                "text-sm text-accent-900 " +
                                (open ? "" : "h-1/5")
                            }
                        >
                            {Text}
                        </span>
                    </Link>
                )
            })}

            {context.state.sidebar && (
                <>
                    <hr className="bg-accent-400 h-[1px] w-5/6 m-auto" />
                    <div className="py-2 flex-grow">
                        <div className="h-12 px-2">
                            <SignIn />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Sidebar
