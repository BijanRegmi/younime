import Image from "next/image"
import Link from "next/link"
import { CardAnime } from ".."

const VideoCard = ({ anime }: { anime: CardAnime }) => {
    return (
        <div className="w-96 h-80 flex flex-col rounded-xl">
            <Link href={`/${anime.id}`} className="h-2/3">
                <div className="w-full h-full relative cursor-pointer transition-transform after:inset-0 after:flex after:items-center after:justify-center after:content-['Play'] after:absolute after:text-accent-900 after:bg-black after:rounded-md after:opacity-0 after:transition-opacity hover:after:opacity-80">
                    <Image
                        src={anime.thumbnail || ""}
                        className="h-full w-full rounded-md object-contain bg-[radial-gradient(circle,#eaeaea_0%,#8b8b8b_100%)]"
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
                <div className="flex justify-start h-1/3 items-center gap-4 my-1">
                    <div className="py-1 px-3 bg-accent-100 border border-solid border-accent-600 text-accent-850 rounded-md cursor-pointer">
                        {anime.score} / 10
                    </div>
                    <div className="py-1 px-3 bg-accent-100 border border-solid border-accent-600 text-accent-850 rounded-md cursor-pointer">
                        {anime.type}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
