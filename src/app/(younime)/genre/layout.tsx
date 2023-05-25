import prisma from "@/prisma"
import Link from "next/link"
import { ReactNode } from "react"

const GenreLayout = async ({ children }: { children: ReactNode }) => {
    const genres = await prisma.genre.findMany({ select: { name: true } })

    genres.sort((a, b) => (a.name < b.name ? -1 : 1))

    return (
        <>
            <div className="overflow-scroll flex flex-row gap-2 border-b border-solid border-accent-150 py-2">
                {genres.map((genre, idx) => {
                    return (
                        <Link
                            href={`/genre/${genre.name}`}
                            key={idx}
                            className="px-3 py-1 whitespace-nowrap bg-accent-100 border border-solid border-accent-500 rounded-sm hover:border-accent-900"
                        >
                            {genre.name}
                        </Link>
                    )
                })}
            </div>
            {children}
        </>
    )
}

export default GenreLayout
