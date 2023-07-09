import { AiOutlineLoading3Quarters } from "react-icons/ai"

const loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
            <span>Loading</span>
        </div>
    )
}
export default loading
