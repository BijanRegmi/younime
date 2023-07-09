import SectionSkeleton from "@/components/Sections/skeleton"

const loading = () => {
    return (
        <div className="flex flex-col h-full w-full justify-start gap-2 overflow-hidden">
            <div className="border border-accent-300 rounded-md w-full p-4 bg-accent-150 ">
                <div className="h-40 w-40" />
            </div>

            <div className="flex flex-col border border-accent-300 rounded-lg overflow-scroll">
                <ul className="flex py-4">
                    <li className="grow py-2 text-center border-b border-white text-accent-900">
                        WATCHING
                    </li>
                    {["completed", "hold", "considering", "dropped"].map(
                        (_, idx) => (
                            <li
                                key={idx}
                                className="grow py-2 text-center text-accent-700 uppercase"
                            >
                                {_}
                            </li>
                        )
                    )}
                </ul>
                <div className="overflow-scroll">
                    <SectionSkeleton length={4} />
                </div>
            </div>
        </div>
    )
}

export default loading
