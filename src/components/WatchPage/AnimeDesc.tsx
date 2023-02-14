import Image from "next/image"
import Synopsis from "@/components/WatchPage/synopsis"
import Actions from "@/components/WatchPage/Actions"
import { WatchAnime } from "@/utils/getWatchAnime"

const AnimeDesc = ({ anime }: { anime: WatchAnime }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="px-1 py-2 flex flex-row gap-2">
                <div className="relative h-full aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                        src={anime.thumbnail || ""}
                        alt={`Thumbnail-${anime.title}`}
                        className="object-cover"
                        fill={true}
                    />
                </div>
                <div className="flex flex-col gap-[0.1rem] flex-grow">
                    <h1>{anime.title}</h1>
                    <h5>{anime.alttitle}</h5>
                    <div className="text-[color:var(--fg-color-2)] mx-[-0.4rem]">
                        <span className="text-[color:var(--fg-color)] font-bold mx-[0.4rem] after:content-[':']">
                            Rating
                        </span>
                        {anime.age_rating}
                        <span className="text-[color:var(--fg-color)] font-bold mx-[0.4rem] after:content-[':']">
                            Score
                        </span>
                        {anime.score}☆
                    </div>
                    <div className="text-[color:var(--fg-color-2)] mx-[-0.4rem]">
                        <span className="text-[color:var(--fg-color)] font-bold mx-[0.4rem] after:content-[':']">
                            Studio
                        </span>
                        {anime.studio}
                        <span className="text-[color:var(--fg-color)] font-bold mx-[0.4rem] after:content-[':']">
                            Season
                        </span>
                        {anime.season}
                        <span className="text-[color:var(--fg-color)] font-bold mx-[0.4rem] after:content-[':']">
                            Type
                        </span>
                        {anime.type}
                    </div>
                    <div className="text-[color:var(--fg-color-2)] mx-[-0.4rem]">
                        <span className="text-[color:var(--fg-color)] font-bold mx-[0.4rem] after:content-[':']">
                            Episodes
                        </span>
                        {anime._count.episodes}
                    </div>
                </div>
                <Actions history={anime.history[0]} />
            </div>
            <div className="p-1 flex flex-row flex-wrap gap-[0.3rem]">
                {anime.genres.map((g, idx) => (
                    <div
                        key={idx}
                        className="border border-solid border-[color:var(--fg-color-2)] bg-[color:var(--bg-color-3)] px-[10px] py-[2px] cursor-default hover:bg-[color:var(--bg-color-2)]"
                    >
                        {g.name}
                    </div>
                ))}
            </div>
            <Synopsis synopsis={anime.synopsis} />
        </div>
    )
}

export default AnimeDesc
