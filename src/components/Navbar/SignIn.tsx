import Link from "next/link"
import { HiOutlineUserCircle } from "react-icons/hi"

const SignIn = () => {
    return (
        <Link
            href={"/auth"}
            className="flex-shrink-0 items-center border border-solid border-white rounded-[1.3rem] p-[0.1rem/0.8rem] cursor-pointer text-white decoration-solid no-underline hover:bg-[#333] h-full flex justify-center gap-2"
        >
            <HiOutlineUserCircle className="h-full text-2xl" />
            <span>SignIn</span>
        </Link>
    )
}

export default SignIn
