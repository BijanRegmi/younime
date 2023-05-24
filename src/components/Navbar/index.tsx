import prisma from "@/prisma"

import SearchBar from "@/components/Navbar/SearchBar"
import SignIn from "@/components/Navbar/SignIn"
import ProfileHead from "@/components/Navbar/ProfileHead"
import HamBurger from "@/components/Navbar/Hamburger"

import { Session } from "next-auth"
import { getSearchList } from "@/lib/getSearchList"
import Link from "next/link"

const Header = async ({ session }: { session: Session | null }) => {
    const animeList = await getSearchList({ prisma })

    return (
        <div className="flex items-center justify-center h-20 py-3">
            <HamBurger />
            <Link
                className="w-sidebarExtra text-accent-900 text-xl decoration-solid no-underline font-semibold cursor-pointer"
                href={"/"}
            >
                Younime
            </Link>
            <SearchBar animeList={animeList} />
            {session?.user ? (
                <ProfileHead user={session.user} />
            ) : (
                <div className="h-4/5">
                    <SignIn />
                </div>
            )}
        </div>
    )
}

export default Header
