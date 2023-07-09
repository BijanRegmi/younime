import { getConnectedAccount } from "@/lib/getConnectedAccounts"
import { getUser } from "@/lib/getUser"
import { Session } from "next-auth"
import { UserAccounts } from "./Accounts"
import EditableInfo from "./EditableInfo"
import { MalSync } from "./MalSync"
import NonEditableInfo from "./NonEditableInfo"

const UserCard = ({
    data,
    accounts,
    session,
}: {
    data: Awaited<ReturnType<typeof getUser>>
    accounts?: Awaited<ReturnType<typeof getConnectedAccount>>
    session?: Session
}) => {
    const self = session && accounts

    return (
        <div className="border border-accent-300 rounded-md p-4 flex w-full items-center justify-center">
            {self ? (
                <EditableInfo data={data} />
            ) : (
                <NonEditableInfo data={data} />
            )}
            {self && (
                <div className="h-full flex flex-col justify-around px-4">
                    <UserAccounts
                        accounts={accounts}
                        email={session.user.email || "No email"}
                    />
                    <MalSync />
                </div>
            )}
        </div>
    )
}

export default UserCard
