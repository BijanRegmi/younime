import Image from "next/image"
import Link from "next/link"
import { CardAnime } from "../.."
import { formatString } from "@/lib/helpers"

const VideoCard = ({ anime }: { anime: CardAnime }) => {
    return (
        <div className="w-96 h-80 flex flex-col rounded-xl border-accent-250 border">
            <Link href={`/${anime.id}`} className="h-2/3">
                <div className="w-full h-full relative cursor-pointer transition-transform border-b border-accent-350 after:inset-0 after:flex after:items-center after:justify-center after:content-['Play'] after:absolute after:text-accent-900 after:bg-black after:rounded-t-xl after:opacity-0 after:transition-opacity hover:after:opacity-80">
                    <Image
                        src={anime.thumbnail || ""}
                        className="h-full w-full rounded-t-xl object-contain bg-accent-150"
                        alt="Thumbnail"
                        fill={true}
                    />
                </div>
            </Link>
            <div className="h-1/3 p-2 bg-accent-100 rounded-b-xl">
                <h1
                    style={{
                        display: "-webkit-box",
                        lineClamp: 2,
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                    title={anime.title}
                    className="font-semibold text-accent-900 overflow-hidden text-ellipsis border-b border-solid border-accent-150 h-2/3"
                >
                    {anime.title}
                </h1>
                <div className="flex justify-start h-1/3 items-center gap-4">
                    <span className="text-accent-850 flex flex-row items-center gap-1">
                        {anime.score} <span className="text-sm">☆</span>
                    </span>
                    <span>|</span>
                    <span className="text-accent-850">
                        {formatString(anime.type || "Unknown")}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
