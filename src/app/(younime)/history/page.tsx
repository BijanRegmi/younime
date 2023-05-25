import { getHistory } from "@/lib/getHistory"
import { AnimeStatus } from "@prisma/client"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import Section from "@/components/Sections"

const HistoryPage = async ({
    searchParams,
}: {
    searchParams: { status?: string }
}) => {
    const session = await getServerSession()
    if (!session) redirect("/api/auth/signin")

    const status = searchParams.status?.toUpperCase() as AnimeStatus

    if (!Object.keys(AnimeStatus).includes(status)) return notFound()

    const animes = await getHistory({ status })

    if (animes.length === 0) {
        return (
            <div className="h-full w-full flex justify-center items-center text-3xl font-bold">
                Nothing Here :(
            </div>
        )
    }

    return <Section animes={animes} />
}

export default HistoryPage
