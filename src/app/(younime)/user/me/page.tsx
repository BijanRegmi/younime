import UserCard from "@/components/User/Card"
import HistoryTab from "@/components/User/HistoryTab"
import { getConnectedAccount } from "@/lib/getConnectedAccounts"
import { getUser } from "@/lib/getUser"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const Page = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.id) redirect("/api/auth/signin")

    const data = await getUser({
        userId: session.user.id,
    })

    const accounts = await getConnectedAccount({ userId: session?.user.id })

    return (
        <div className="flex flex-col h-full w-full justify-start gap-2 overflow-hidden">
            <UserCard data={data} accounts={accounts} session={session} />
            <HistoryTab hist={data.hist} userId={session.user.id} />
        </div>
    )
}

export default Page
