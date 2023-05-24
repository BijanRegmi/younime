import { getHistory } from "@/lib/getHistory"
import { AnimeStatus } from "@prisma/client"
import { notFound, redirect } from "next/navigation"
import prisma from "@/prisma"
import { getServerSession } from "next-auth"
import VideoCard from "@/components/VideoCard"

const HistoryPage = async ({
    searchParams,
}: {
    searchParams: { status?: string }
}) => {
    const session = await getServerSession()
    if (!session) redirect("/api/auth/signin")

    const status = searchParams.status?.toUpperCase() as AnimeStatus

    if (!Object.keys(AnimeStatus).includes(status)) return notFound()

    const histories = await getHistory({ status, session, prisma })

    if (histories.length === 0) {
        return (
            <div className="h-full w-full flex justify-center items-center text-3xl font-bold">
                Nothing Here :(
            </div>
        )
    }

    return (
        <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-8 px-4 overflow-scroll h-full">
            {histories.map(history => (
                <VideoCard anime={history.anime} key={history.anime.id} />
            ))}
        </div>
    )
}

export default HistoryPage
