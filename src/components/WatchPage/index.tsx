import { authOptions } from "@/api/auth/[...nextauth]"
import prisma from "@/prisma"
import { getServerSession } from "next-auth"
import Comments from "../Comments"
import VideoPlayer from "../VideoPlayer"
import { AnimeStatus } from "@prisma/client"
import { notFound } from "next/navigation"
import { getSources } from "@/utils/getSources"

const WatchPage = async ({
    params,
}: {
    params: { "ep-id": string; "anime-id": string }
}) => {
    const id = Number(params["ep-id"])
    const animeId = params["anime-id"]

    if (isNaN(id)) return notFound()

    const result = await prisma.episode.findUnique({
        where: { id_animeId: { id, animeId } },
        select: { file_url: true },
    })

    if (!result) return notFound()

    const sources = await getSources(result.file_url)

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
            <VideoPlayer sources={sources} />
            <div className="comments">
                <Comments />
            </div>
        </>
    )
}

export default WatchPage
