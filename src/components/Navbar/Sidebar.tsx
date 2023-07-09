"use client"
import Link from "next/link"

import { useContext } from "react"
import { GlobalContext } from "@/components/Context/ReactContext"

import { TbHexagonLetterG, TbArrowBigUp } from "react-icons/tb"
import { AiOutlineHome, AiOutlineReload, AiOutlineStock } from "react-icons/ai"
import { IconType } from "react-icons"
import SignIn from "./SignIn"
import { useSession } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { usePathname } from "next/navigation"

const Sidebar = () => {
    const context = useContext(GlobalContext)
    const open = context.state.sidebar

    const session = useSession()

    const path = usePathname()

    const links: [string, IconType, string][] = [
        ["/", AiOutlineHome, "Home"],
        ["/genre", TbHexagonLetterG, "Genres"],
        ["/top", TbArrowBigUp, "Top"],
        ["/ongoing", AiOutlineReload, "Ongoing"],
        ["/upcoming", AiOutlineStock, "Upcoming"],
    ]

    return (
        <div
            className={
                "h-full flex-shrink-0 overflow-x-hidden flex flex-col gap-2 border border-solid border-y-0 border-l-0 border-r-accent-300 " +
                (open ? "w-sidebarWide" : "w-sidebarNarrow")
            }
        >
            {links.map(([href, Item, Text], idx) => {
                const active =
                    href == "/" ? path == href : path?.startsWith(href)
                return (
                    <Link
                        key={idx}
                        href={href}
                        className={`flex-row w-full flex-shrink-0 no-underline decoration-solid rounded-2xl flex items-center hover:bg-accent-250 ${
                            active ? "bg-accent-150" : ""
                        }`}
                        title={!open ? Text : ""}
                    >
                        <div className="w-sidebarNarrow aspect-square flex-shrink-0 flex justify-center items-center">
                            <Item className="w-2/3 text-[1.5em] aspect-square" />
                        </div>
                        {open && (
                            <span className="text-sm text-accent-900">
                                {Text}
                            </span>
                        )}
                    </Link>
                )
            })}

            {open && (
                <>
                    <div className="flex-grow" />
                    <hr className="bg-accent-400 border-0 h-[1px] w-full my-2" />
                    <div className="h-14 py-2 px-8">
                        {session.status == "authenticated" ? (
                            <Link
                                href="/api/auth/signout"
                                className="flex-shrink-0 items-center border border-solid border-white rounded-[1.3rem] p-[0.1rem/0.8rem] cursor-pointer text-white decoration-solid no-underline hover:bg-[#333] h-full flex justify-center gap-2"
                            >
                                <CiLogout className="h-4/5 fill-white font-bold" />
                                <span>SignOut</span>
                            </Link>
                        ) : (
                            <SignIn />
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Sidebar
