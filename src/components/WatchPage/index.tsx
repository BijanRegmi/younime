import { authOptions } from "@/api/auth/[...nextauth]"
import prisma from "@/prisma"
import { getServerSession } from "next-auth"
import Comments from "../Comments"
import VideoPlayer from "../VideoPlayer"
import { AnimeStatus } from "@prisma/client"
import { notFound } from "next/navigation"
import { getAnimeResources } from "@/lib/getAnimeResources"

const WatchPage = async ({
    params,
}: {
    params: { "ep-id": string; "anime-id": string }
}) => {
    const id = Number(params["ep-id"])
    const animeId = Number(params["anime-id"])

    if (isNaN(id)) return notFound()

    const result = await prisma.episode.findUnique({
        where: { id },
        select: { id: true },
    })

    if (!result) return notFound()

    const resources = await getAnimeResources(result.id)

    if (!resources || (!resources.sub && !resources.dub)) return notFound()

    const session = await getServerSession(authOptions)
    if (session && session.user?.id) {
        await prisma.history_entry.updateMany({
            where: {
                animeId,
                userId: session.user.id,
                status: AnimeStatus.WATCHING,
            },
            data: { epId: id },
        })
    }

    return (
        <>
            <VideoPlayer resources={resources} />
            <div className="comments">
                <Comments />
            </div>
        </>
    )
}

export default WatchPage
