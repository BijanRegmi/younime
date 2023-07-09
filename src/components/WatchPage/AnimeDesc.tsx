import Image from "next/image"
import Synopsis from "@/components/WatchPage/synopsis"
import Actions from "@/components/WatchPage/Actions"
import { WatchAnime } from "@/lib/getWatchAnime"
import Link from "next/link"

const DataRow = ({ datas }: { datas: { title: string; value: any }[] }) => {
    return (
        <div className="text-accent-700 mx-[-0.4rem]">
            {datas.map((data, idx) => {
                return (
                    <>
                        <span
                            key={idx}
                            className="text-accent-800 font-semibold mx-[0.4rem] after:content-[':']"
                        >
                            {data.title}
                        </span>
                        {data.value}
                    </>
                )
            })}
        </div>
    )
}

const AnimeDesc = ({ anime }: { anime: WatchAnime }) => {
    return (
        <div className="flex flex-col gap-2 animedesc">
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
                    <h1 className="text-2xl font-semibold text-accent-900">
                        {anime.title}
                    </h1>
                    <h2 className="text-sm text-accent-800">
                        {anime.alttitle}
                    </h2>
                    <DataRow
                        datas={[
                            { title: "Rating", value: anime.age_rating },
                            { title: "Score", value: `${anime.score}☆` },
                        ]}
                    />
                    <DataRow
                        datas={[
                            { title: "Studio", value: anime.studio },
                            { title: "Season", value: anime.season },
                            { title: "Type", value: anime.type },
                        ]}
                    />
                    <DataRow
                        datas={[
                            { title: "Episodes", value: anime._count.episodes },
                        ]}
                    />
                </div>
                <Actions history={anime.history?.at(0)} />
            </div>
            <div className="p-1 flex flex-row flex-wrap gap-[0.3rem]">
                {anime.genres.map((g, idx) => (
                    <Link
                        href={`/genre/${g.name}`}
                        key={idx}
                        className="border border-solid border-accent-300 bg-accent-150 px-2 py-1 cursor-pointer rounded-md hover:border-accent-600"
                    >
                        {g.name}
                    </Link>
                ))}
            </div>
            <Synopsis synopsis={anime.synopsis} />
        </div>
    )
}

export default AnimeDesc
