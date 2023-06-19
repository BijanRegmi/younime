import { BiCommentX } from "react-icons/bi"
const NoComments = () => {
    return (
        <div className="w-full flex flex-col py-10 gap-4 items-center justify-center">
            <BiCommentX className="text-6xl" />
            <span>
                No Comments
                <span className="text-2xl"> :(</span>
            </span>
        </div>
    )
}

export default NoComments
