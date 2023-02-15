import prisma from "@/prisma"

import SearchBar from "@/components/Navbar/SearchBar"
import SignIn from "@/components/Navbar/SignIn"
import ProfileHead from "@/components/Navbar/ProfileHead"
import HamBurger from "@/components/Navbar/Hamburger"

import { Session } from "next-auth"
import { getSearchList } from "@/utils/getSearchList"

const Header = async ({ session }: { session: Session | null }) => {
    const animeList = await getSearchList({ prisma })

    return (
        <div className="flex items-center justify-center h-14 p-1">
            <HamBurger />
            <div className="text-center w-sidebarExtend px-2 text-accent-900 decoration-solid no-underline font-semibold cursor-pointer">
                Younime
            </div>
            <SearchBar animeList={animeList} />
            {session?.user ? <ProfileHead user={session.user} /> : <SignIn />}
        </div>
    )
}

export default Header
