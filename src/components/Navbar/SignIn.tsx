import Link from "next/link"
import AccountSvg from "@/assets/misc/account.svg"

const SignIn = () => {
    return (
        <Link
            href={"/auth"}
            className="flex-shrink-0 items-center gap-[0.3rem] border border-solid border-white rounded-[1.3rem] p-[0.1rem/0.8rem] cursor-pointer text-white decoration-solid no-underline hover:bg-[#333] h-full hidden sm:flex"
        >
            <AccountSvg className="h-4/5 fill-white" />
            <span>SignIn</span>
        </Link>
    )
}

export default SignIn
