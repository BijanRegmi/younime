import { TbError404 } from "react-icons/tb"

export const NoResourcePlayer = () => {
    return (
        <div
            id="videoContainer"
            className="bg-black self-center justify-self-center w-full max-w-[1200px] aspect-[16/9] flex justify-center items-center flex-col gap-4 videoplayer border border-white rounded"
        >
            <TbError404 className="text-8xl" />
            <span className="block">No resources found</span>
        </div>
    )
}
