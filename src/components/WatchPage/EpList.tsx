"use client"

import Play from "@/assets/videoplayer/play.svg"
import { notFound, usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { WatchAnime } from "@/utils/getWatchAnime"

const EpList = ({ episodes }: { episodes: WatchAnime["episodes"] }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        })
    }, [ref])

    const paths = usePathname()?.split("/")
    if (!paths) return notFound()
    const animeId = Number(paths[1])
    const epId = Number(paths[2])
    const curr = episodes.find(ep => ep.id === epId)

    return (
        <div className="flex flex-col gap-1 w-full overflow-hidden eplist">
            <div className="justify-self-center flex-grow">
                Currently Playing: {curr?.name}
            </div>
            <div className="overflow-scroll flex-grow">
                {episodes.map(ep => {
                    const playing = epId == ep.id
                    return (
                        <div
                            key={ep.id}
                            // TAILWINDCSS: box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                            // 	rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                            className="h-8 bg-accent-300 m-1 p-1 flex items-center gap-[0.3rem] cursor-pointer hover:bg-accent-250"
                            ref={playing ? ref : undefined}
                        >
                            <Play
                                className={`h-full aspect-square text-white ${playing ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                            <Link
                                href={`/${animeId}/${ep.id}`}
                                className="no-underline decoration-solid text-[color:inherit]"
                            >
                                {ep.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EpList
