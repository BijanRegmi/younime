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

    const navItemCss =
        (open
            ? "w-[var(--sidebar-smol-size) px-4 py-[0.4rem] flex-row justify-start gap-2 h-12 "
            : "w-[var(--sidebar-smol-size)] px-[0.3rem] py-4 flex-col justify-center ") +
        " flex-shrink-0 no-underline decoration-solid rounded-2xl flex items-center hover:bg-[#333a]"
    const navItemSvgCss =
        "flex-shrink-0 " +
        (open ? "h-4/5" : "w-4/5") +
        " aspect-square fill-white"
    const navItemSpanCss = "text-white " + (open ? "" : "h-1/5") + " text-sm"

    return (
        <div className="h-full flex-shrink-0 overflow-x-hidden flex flex-col gap-2">
            <Link href="/" className={navItemCss}>
                <Home className={navItemSvgCss} />
                <span className={navItemSpanCss}>Home</span>
            </Link>

            <Link href="/shorts" className={navItemCss}>
                <Shorts className={navItemSvgCss} />
                <span className={navItemSpanCss}>Shorts</span>
            </Link>

            <Link href="/subs" className={navItemCss}>
                <Subs className={navItemSvgCss} />
                <span className={navItemSpanCss}>Subs</span>
            </Link>

            <Link href="/explore" className={navItemCss}>
                <Explore className={navItemSvgCss} />
                <span className={navItemSpanCss}>Explore</span>
            </Link>

            {context.state.sidebar && (
                <>
                    <hr className="bg-[#333] h-[1px] w-full" />
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
