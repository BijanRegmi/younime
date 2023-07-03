import { getConnectedAccount } from "@/lib/getConnectedAccounts"
import { getUser } from "@/lib/getUser"
import { Session } from "next-auth"
import { UserAccounts } from "./Accounts"
import EditableInfo from "./EditableInfo"
import NonEditableInfo from "./NonEditableInfo"

const UserCard = ({
    data,
    accounts,
    session,
}: {
    data: Awaited<ReturnType<typeof getUser>>
    accounts: Awaited<ReturnType<typeof getConnectedAccount>>
    session: Session | null
}) => {
    const self = session?.user.id == data.user?.id

    return (
        <div className="border border-accent-300 rounded-md p-4 flex w-full items-center justify-center">
            {self ? (
                <EditableInfo data={data} />
            ) : (
                <NonEditableInfo data={data} />
            )}
            {self && (
                <UserAccounts
                    accounts={accounts}
                    email={session?.user.email || ""}
                />
            )}
        </div>
    )
}

export default UserCard
