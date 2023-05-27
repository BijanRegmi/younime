"use client"

import Play from "@/assets/videoplayer/play.svg"
import { notFound, usePathname } from "next/navigation"
import { ReactNode, useEffect, useRef } from "react"
import Link from "next/link"
import { WatchAnime } from "@/lib/getWatchAnime"

const EpList = ({ episodes }: { episodes: WatchAnime["episodes"] }) => {
    const ref = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        ref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        })
    }, [ref])

    const paths = usePathname()?.split("/")
    if (!paths) return notFound()
    const animeId = paths[1]
    const epId = Number(paths[2])
    const curr = episodes.find(ep => ep.id === epId)
    const total = episodes.length

    return (
        <div className="flex flex-col gap-1 w-full overflow-hidden eplist border border-accent-250 border-solid rounded-lg p-4">
            <div className="justify-self-center border-b border-accent-450 border-solid">
                <span className="font-bold">Playing</span> {curr?.order} /{" "}
                {total}
                <br />
                <span className="text-accent-700">{curr?.name}</span>
            </div>
            <div className="overflow-scroll flex-grow flex flex-col">
                {episodes.map(ep => {
                    const playing = epId == ep.id
                    return (
                        <Link
                            key={ep.id}
                            className="h-12 bg-accent-150 m-1 p-1 flex items-center gap-4 cursor-pointer hover:bg-accent-250 shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] rounded-md"
                            ref={playing ? ref : undefined}
                            href={`/${animeId}/${ep.id}`}
                        >
                            <Play
                                className={`w-12 aspect-square text-white transition-opacity ease-linear ${playing ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                            <span className="inline-block">{ep.order}:</span>
                            <span
                                className="overflow-hidden w-full whitespace-nowrap text-ellipsis inline-block"
                                title={ep.name}
                            >
                                {ep.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default EpList
