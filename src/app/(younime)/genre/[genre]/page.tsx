import Section from "@/components/Sections"
import prisma from "@/prisma"
import { notFound } from "next/navigation"

const Page = async ({ params }: { params: { genre: string } }) => {
    const genre = params.genre

    const result = await prisma.genre.findUnique({
        where: { name: decodeURIComponent(genre) },
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
                take: 12,
            },
        },
    })

    if (!result || !result.anime.length) return notFound()

    return <Section animes={result.anime} />
}

export default Page
