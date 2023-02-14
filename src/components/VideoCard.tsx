import Image from "next/image"
import Link from "next/link"
import { CardAnime } from ".."

const VideoCard = ({ anime }: { anime: CardAnime }) => {
    return (
        <div className="w-[250px] h-[300px] flex flex-col gap-[10px]">
            <Link href={`/${anime.id}`} style={{ height: "70%" }}>
                <div className="w-full h-full relative cursor-pointer transition-transform after:inset-0 after:flex after:items-center after:justify-center after:content-['Play'] after:absolute after:text-[color:var(--fg-color)] after:bg-black after:rounded-md after:opacity-0 after:transition-opacity hover:after:opacity-80">
                    <Image
                        src={anime.thumbnail as string}
                        // {/*TAILWIND: background-image: radial-gradient(circle, #eaeaea 0%, #8b8b8b 100%) */}
                        className="h-full w-full rounded-md object-contain"
                        alt="Thumbnail"
                        fill={true}
                    />
                </div>
            </Link>
            <div className="w-full h-[30%] flex flex-row gap-[10px]">
                {/*TAILWIND: background-image: radial-gradient(
                                circle,
                                rgb(196, 166, 166) 0%,
                                rgb(255, 11, 11) 100%
                            );
                */}
                <div className="h-1/2 aspect-square rounded-full flex items-center justify-center text-lg">
                    {anime.score}
                </div>
                <div className="w-full h-full flex flex-col justify-around">
                    <h4 className="w-full h-2/5 font-medium overflow-hidden text-ellipsis text-lg">
                        {anime.title}
                    </h4>
                    <div className="w-full text-[color:var(--fg-color-2)] flex items-center">
                        {anime.age_rating}
                    </div>
                    <div className="w-full flex items-center text-[color:var(--fg-color-2)]">
                        {anime.studio}
                        <span className="text-[color:inherit] font-medium ml-1">
                            [{anime.score}]
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
