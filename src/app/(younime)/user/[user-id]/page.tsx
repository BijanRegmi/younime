import UserCard from "@/components/User/Card"
import HistoryTab from "@/components/User/HistoryTab"
import { getUser } from "@/lib/getUser"

const Page = async ({ params }: { params: { "user-id": string } }) => {
    const userId = params["user-id"]
    const data = await getUser({
        userId,
    })

    return (
        <div className="flex flex-col h-full w-full justify-start gap-2 overflow-hidden">
            <UserCard data={data} />
            <HistoryTab hist={data.hist} userId={userId} />
        </div>
    )
}

export default Page
