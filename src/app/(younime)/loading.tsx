import SectionSkeleton from "@/components/Sections/skeleton"

const loading = () => {
    return (
        <>
            <SectionSkeleton length={4} title="Continue Watching" />
            <SectionSkeleton length={4} title="You may be interested in" />
            <SectionSkeleton length={4} title="Ongoing" />
            <SectionSkeleton length={4} title="Random" />
        </>
    )
}
export default loading
