"use client"
import { TbMoodEmpty } from "react-icons/tb"
import { trpc } from "@/components/Context/TrpcContext"
import Section from "@/components/Sections"
import { getUser } from "@/lib/getUser"
import { useState } from "react"

const HistoryTab = ({
    hist,
    userId,
}: {
    hist: Awaited<ReturnType<typeof getUser>>["hist"]
    userId: string
}) => {
    const hist_keys = Object.keys(hist) as Array<keyof typeof hist>
    const [activeTab, setActiveTab] = useState(hist_keys[0])

    const { data } = trpc.playlist.get.useQuery(
        {
            status: activeTab,
            userId: userId,
        },
        {
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )

    return (
        <div className="flex flex-col border border-accent-300 rounded-lg overflow-scroll">
            <ul className="flex py-4">
                {hist_keys.map((k, idx) => (
                    <li
                        key={idx}
                        className={`grow text-center py-2 cursor-pointer ${k == activeTab
                                ? "border-b border-white text-accent-900"
                                : "text-accent-700"
                            }`}
                        onClick={() => setActiveTab(k)}
                    >
                        {k.toUpperCase()}
                    </li>
                ))}
            </ul>
            {data && data.hist.length != 0 ? (
                <div className="overflow-scroll">
                    <Section animes={data.hist} />
                </div>
            ) : (
                <div className="w-full flex flex-col py-10 gap-4 items-center justify-center">
                    <TbMoodEmpty className="text-6xl" />
                    <span>Nothing here</span>
                </div>
            )}
        </div>
    )
}

export default HistoryTab
