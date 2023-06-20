import UserCard from "@/components/User/Card"
import HistoryTab from "@/components/User/HistoryTab"
import { getConnectedAccount } from "@/lib/getConnectedAccounts"
import { getUser } from "@/lib/getUser"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

const Page = async ({ params }: { params: { "user-id": string } }) => {
    const userId = params["user-id"]
    const data = await getUser({
        userId,
    })

    const session = await getServerSession(authOptions)

    const accounts = await getConnectedAccount({ userId: session?.user.id })

    return (
        <div className="flex flex-col h-full w-full justify-start gap-2 overflow-hidden">
            <UserCard data={data} accounts={accounts} session={session} />
            <HistoryTab hist={data.hist} userId={userId} />
        </div>
    )
}

export default Page
