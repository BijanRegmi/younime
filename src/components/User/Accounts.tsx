"use client"

import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { getConnectedAccount } from "@/lib/getConnectedAccounts"

export const UserAccounts = ({
    accounts,
    email,
}: {
    accounts: Awaited<ReturnType<typeof getConnectedAccount>>
    email: string
}) => {
    return (
        <div className="h-full flex flex-col justify-around px-4">
            <div
                className={`bg-white rounded-md border border-solid border-gray-500 shadow-sm whitespace-nowrap px-4 py-2 flex gap-2 w-full items-center ${accounts.google ? "cursor-default" : "cursor-pointer"
                    }`}
                title={accounts.google ? email : "Sign In with Google"}
                onClick={() =>
                    !accounts.google &&
                    signIn("google", {
                        callbackUrl: window.location.toString(),
                    })
                }
            >
                <AiOutlineGoogle className="w-6 h-6 text-black" />
                <span className="align-middle text-base text-black">
                    {accounts.google ? "Connected" : "Connect"}
                </span>
            </div>
            <div
                className={`bg-white rounded-md border border-solid border-gray-500 shadow-sm whitespace-nowrap px-4 py-2 flex gap-2 w-full items-center ${accounts.github ? "cursor-default" : "cursor-pointer"
                    }`}
                title={accounts.github ? email : "Sign In with Github"}
            >
                <AiOutlineGithub className="w-6 h-6 text-black" />
                <span className="align-middle text-base text-black">
                    {accounts.github ? "Connected" : "Connect"}
                </span>
            </div>
        </div>
    )
}
