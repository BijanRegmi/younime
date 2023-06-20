import { getConnectedAccount } from "@/lib/getConnectedAccounts"
import { getUser } from "@/lib/getUser"
import { Session } from "next-auth"
import Image from "next/image"
import { notFound } from "next/navigation"
import { UserAccounts } from "./Accounts"

const UserCard = ({
    data,
    accounts,
    session,
}: {
    data: Awaited<ReturnType<typeof getUser>>
    accounts: Awaited<ReturnType<typeof getConnectedAccount>>
    session: Session | null
}) => {
    const { user, hist } = data
    if (!user) return notFound()

    const self = session?.user.id == user.id

    const hist_keys = Object.keys(data.hist) as Array<keyof typeof hist>

    return (
        <div className="border border-accent-300 rounded-md p-4 flex w-full items-center justify-center">
            <div className="relative w-40 aspect-square rounded-full overflow-hidden">
                <Image
                    src={
                        user.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt={"Image"}
                    fill
                />
            </div>
            <div className="">
                <h1 className="text-2xl font-bold w-fit mx-auto">
                    {user.name}
                </h1>
                <h2 className="w-fit mx-auto">{user.bio}</h2>
                <h3 className="mx-auto w-fit text-accent-800">
                    Joined:{" "}
                    {user.createdAt.toLocaleDateString("en-US", {
                        day: "2-digit",
                        year: "numeric",
                        month: "short",
                    })}
                </h3>
                <div className="">
                    {hist_keys.map((k, idx) => (
                        <div key={idx} className="inline-block px-2 text-center">
                            <span className="block text-4xl">
                                {hist[k]}
                            </span>
                            <span className="text-xs">{k.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>
            {self && (
                <UserAccounts
                    accounts={accounts}
                    email={session.user.email || ""}
                />
            )}
        </div>
    )
}

export default UserCard
