import { EndlessGenre } from "@/components/Endless/Genre"
import Section from "@/components/Sections"
import prisma from "@/prisma"
import { notFound } from "next/navigation"

const Page = async ({ params }: { params: { genre: string } }) => {
    const genre = decodeURIComponent(params.genre)

    const result = await prisma.genre.findUnique({
        where: { name: genre },
        select: {
            anime: {
                select: {
                    id: true,
                    title: true,
                    score: true,
                    type: true,
                    thumbnail: true,
                },
                orderBy: { score: "desc" },
                take: 32,
            },
        },
    })

    if (!result || !result.anime.length) return notFound()

    return (
        <Section animes={result.anime}>
            <EndlessGenre prefetched={result.anime.length} genre={genre} />
        </Section>
    )
}

export default Page
