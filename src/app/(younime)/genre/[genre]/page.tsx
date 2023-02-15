import VideoCard from "@/components/VideoCard"
import prisma from "@/prisma"
import { notFound } from "next/navigation"

const Page = async ({ params }: { params: { "genre": string } }) => {
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

    return (
        <div className="flex flex-row flex-wrap justify-evenly gap-x-4 gap-y-8 overflow-scroll h-[90%] pt-2">
            {result.anime.map(anime => (
                <VideoCard key={anime.id} anime={anime} />
            ))}
        </div>
    )
}

export default Page
