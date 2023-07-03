import { getUser } from "@/lib/getUser"
import Image from "next/image"
import { notFound } from "next/navigation"

const NonEditableInfo = ({
    data,
}: {
    data: Awaited<ReturnType<typeof getUser>>
}) => {
    const { user, hist } = data
    if (!user) return notFound()

    const hist_keys = Object.keys(data.hist) as Array<keyof typeof hist>

    return (
        <>
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
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">
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
                        <div
                            key={idx}
                            className="inline-block px-2 text-center"
                        >
                            <span className="block text-4xl">{hist[k]}</span>
                            <span className="text-xs">{k.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NonEditableInfo
