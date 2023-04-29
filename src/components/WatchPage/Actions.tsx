"use client"
import { useEffect, useRef, useState } from "react"

import None from "@/assets/states/none.svg"
import Completed from "@/assets/states/completed.svg"
import Considering from "@/assets/states/considering.svg"
import Dropped from "@/assets/states/dropped.svg"
import Hold from "@/assets/states/hold.svg"
import Watching from "@/assets/states/watching.svg"
import useRequireAuth from "@/hooks/useRequireAuth"
import { notFound, usePathname } from "next/navigation"
import { AnimeStatus } from "@prisma/client"
import { trpc } from "../Context/TrpcContext"
import { WatchAnime } from "@/utils/getWatchAnime"

const Actions = ({
    history,
}: {
    history: WatchAnime["history"][number] | undefined
}) => {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState<
        WatchAnime["history"][number]["status"] | undefined
    >()

    useEffect(() => {
        setStatus(history?.status)
    }, [history?.status])

    const ref = useRef<HTMLDivElement>(null)
    const { ref: authref } = useRequireAuth<HTMLDivElement>()

    const toggle = () => {
        setOpen(o => !o)
    }

    useEffect(() => {
        if (open) {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
        }
    }, [ref, open])

    const paths = usePathname()?.split("/")
    if (!paths) return notFound()
    const animeId = paths[1]
    const epId = Number(paths[2])

    const options = {
        WATCHING: Watching,
        COMPLETED: Completed,
        HOLD: Hold,
        CONSIDERING: Considering,
        DROPPED: Dropped,
    }

    const { mutate: addMutate } = trpc.playlist.add.useMutation()
    const { mutate: removeMutate } = trpc.playlist.remove.useMutation()

    const mutateStatus = (stat: AnimeStatus) => {
        if (stat !== status)
            addMutate(
                { status: stat, animeId, epId },
                {
                    onSuccess: () => {
                        setStatus(stat)
                    },
                }
            )
        else
            removeMutate(
                { animeId },
                {
                    onSuccess: () => {
                        setStatus(undefined)
                    },
                }
            )
    }

    return (
        <div className="h-12 relative" ref={authref}>
            <None
                className={
                    "h-full aspect-square text-white fill-none cursor-pointer transition-transform " +
                    (open ? "rotate-45" : "")
                }
                onClick={toggle}
            />

            {open && (
                <div
                    className="absolute top-full right-1/2 bg-accent-100 border border-solid border-accent-300 rounded-2xl flex flex-col p-2"
                    ref={ref}
                >
                    {(
                        Object.keys(AnimeStatus) as Array<
                            keyof typeof AnimeStatus
                        >
                    ).map((statusKey, idx) => {
                        const selected = statusKey === status?.toString()
                        const Item = options[statusKey]
                        return (
                            <div
                                key={idx}
                                className={
                                    "h-10 flex flex-row justify-center items-center cursor-pointer rounded-md hover:bg-accent-150 " +
                                    (selected
                                        ? "bg-accent-150 border border-solid border-accent-500"
                                        : "")
                                }
                                onClick={e => {
                                    e.preventDefault()
                                    mutateStatus(statusKey)
                                }}
                            >
                                <Item className="h-4/5 aspect-square text-white fill-none" />
                                <span className="flex-grow">{statusKey}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Actions
