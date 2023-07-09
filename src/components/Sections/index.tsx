import { type CardAnime } from "@/index"
import { ReactNode } from "react"
import VideoCard from "./VideoCard"

const Section = (props: {
    animes: CardAnime[]
    title?: String
    children?: ReactNode
}) => {
    if (props.animes.length == 0) return <></>
    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fill,24rem)] gap-x-4 gap-y-8 justify-center py-3 w-full border-b border-accent-300 overflow-scroll">
                {props.title && (
                    <span className="col-span-full text-center">{props.title}</span>
                )}
                {props.animes.map(anime => (
                    <VideoCard key={anime.id} anime={anime} />
                ))}
                {props.children}
            </div>
        </>
    )
}

export default Section
