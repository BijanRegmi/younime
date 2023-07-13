import Link from "next/link"
import { AiOutlineGithub, AiOutlineUser } from "react-icons/ai"

export const Links = () => {
    return (
        <div className="w-full flex flex-row items-center justify-around pb-2">
            <Link
                href="https://github.com/BijanRegmi/younime"
                title="Source Code"
            >
                <AiOutlineGithub className="w-6 h-6" />
            </Link>
            <Link
                href="/user/dev"
                title="Developer"
            >
                <AiOutlineUser className="w-6 h-6" />
            </Link>
        </div>
    )
}
