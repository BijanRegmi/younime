"use client"
import useOnIntersection from "@/hooks/useObserver"
import { Fragment } from "react"
import { trpc } from "../Context/TrpcContext"
import { VideoCardSkeleton } from "../Sections/skeleton"
import VideoCard from "../Sections/VideoCard"

const EndlessTop = ({ prefetched }: { prefetched: number }) => {
    const observerRef = useOnIntersection<HTMLDivElement>({
        onIntersect: () => {
            if (hasNextPage || !data || data.pages.length == 0) fetchNextPage()
        },
    })

    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = trpc.anime.top.useInfiniteQuery(
        {
            prefetched,
        },
        {
            getNextPageParam: lastPage => lastPage.nextCursor,
            enabled: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )

    return (
        <>
            {isSuccess &&
                data.pages.map((page, pageIdx) => (
                    <Fragment key={pageIdx}>
                        {page.animes.map(anime => (
                            <VideoCard key={anime.id} anime={anime} />
                        ))}
                    </Fragment>
                ))}

            {((isFetchingNextPage && hasNextPage) || isFetching) && (
                <>
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <VideoCardSkeleton key={idx} />
                    ))}
                </>
            )}

            <div className="h-0 w-0 mt-24" ref={observerRef} />
        </>
    )
}

export default EndlessTop
