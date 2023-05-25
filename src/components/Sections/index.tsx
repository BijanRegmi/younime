import { type CardAnime } from "@/index"
import VideoCard from "../VideoCard"

const Section = (props: { animes: CardAnime[]; title: String }) => {
    if (props.animes.length == 0) return <></>
    return (
        <>
            <span className="ml-4">{props.title}</span>
            <div className="grid grid-cols-[repeat(auto-fill,24rem)] gap-x-4 gap-y-8 justify-center py-3 w-full border-b border-accent-300">
                {props.animes.map(anime => (
                    <VideoCard key={anime.id} anime={anime} />
                ))}
            </div>
        </>
    )
}

export default Section
