import prisma from "@/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import { notFound, redirect } from "next/navigation"

const Page = async ({ params }: { params: { "anime-id": string } }) => {
    const animeId = params["anime-id"]

    const session = await getServerSession(authOptions)

    // If the user is logged in and has a history record
    // for that anime, redirect to the last watched ep
    if (session && session?.user) {
        const res = await prisma.history_entry.findUnique({
            where: {
                userId_animeId: { userId: session.user.id || "", animeId },
            },
            select: { epId: true },
        })
        if (res?.epId) redirect(`/${animeId}/${res.epId}`)
    }

    // If no history record was found, redirect to the 1st ep of the anime
    const result = await prisma.episode.findFirst({
        where: { animeId },
        orderBy: { id: "asc" },
        select: { id: true },
    })

    if (result?.id != undefined) redirect(`/${animeId}/${result.id}`)
    else notFound()
}

export default Page
