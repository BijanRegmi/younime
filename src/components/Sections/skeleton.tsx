const VideoCardSkeleton = () => (
    <div className="w-96 h-80 flex flex-col rounded-xl bg-accent-150 animate-pulse duration-100" />
)

const SectionSkeleton = ({
    title,
    length,
}: {
    title?: string
    length: number
}) => {
    return (
        <>
            {title && <span className="ml-4">{title}</span>}
            <div className="grid grid-cols-[repeat(auto-fill,24rem)] gap-x-4 gap-y-8 justify-center py-3 w-full border-b border-accent-300 overflow-scroll">
                {Array.from({ length }).map((_, idx) => (
                    <VideoCardSkeleton key={idx} />
                ))}
            </div>
        </>
    )
}

export default SectionSkeleton
