import UserCard from "@/components/User/Card"
import HistoryTab from "@/components/User/HistoryTab"
import { getUser } from "@/lib/getUser"
import db from "@/server/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Dev Profile" }

const Page = async () => {
    const userId = await db.user.findUnique({
        where: { email: `${process.env.DEV_EMAIL}` },
        select: { id: true },
    })
    if (!userId) return notFound()
    const data = await getUser({
        userId: userId.id,
    })

    return (
        <div className="flex flex-col h-full w-full justify-start gap-2 overflow-hidden">
            <UserCard data={data} />
            <HistoryTab hist={data.hist} userId={userId.id} />
        </div>
    )
}

export default Page
