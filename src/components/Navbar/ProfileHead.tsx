"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth"
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai"
import { CiLogout } from "react-icons/ci"

const ProfileHead = ({ user }: { user: Session["user"] }) => {
    const [show, setShow] = useState(false)

    return (
        <div className="h-full aspect-square relative">
            <Image
                src={
                    user.image ||
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                fill={true}
                alt={user.name as string}
                className="h-full w-full rounded-full object-contain cursor-pointer"
                onClick={() => setShow(old => !old)}
            />
            {show ? (
                <div className="absolute top-full right-[10%] min-w-[250px] bg-accent-200 rounded-lg flex flex-col gap-2 z-10 py-4">
                    <div className="flex flex-row w-full px-4 gap-2 items-center">
                        <div className="relative w-16 aspect-square overflow-hidden">
                            <Image
                                src={
                                    user.image ||
                                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                }
                                fill={true}
                                alt={user.name as string}
                                className="rounded-full"
                            />
                        </div>
                        <div className="break-words">
                            <div className="break-words text-accent-850 font-bold">
                                {user.name ?? "undefined"}
                            </div>
                            <div className="break-words text-accent-850 text-sm">
                                {user.email ?? "undefined"}
                            </div>
                        </div>
                    </div>

                    <hr className="w-full h-[1px] bg-accent-600 border-none" />

                    <Link
                        href={`/user/me`}
                        className="flex flex-row gap-2 items-center hover:bg-accent-300 py-2 px-4"
                    >
                        <AiOutlineUser className="border-2 w-6 h-6" />
                        <span>Your Profile</span>
                    </Link>
                    <Link
                        href="/api/auth/signout"
                        className="flex flex-row gap-2 items-center hover:bg-accent-300 py-2 px-4"
                    >
                        <CiLogout className="w-6 h-6" />
                        <span>SignOut</span>
                    </Link>

                    <hr className="w-full h-[1px] bg-accent-600 border-none" />

                    <div className="flex flex-row gap-2 items-center hover:bg-accent-300 py-2 px-4 cursor-pointer">
                        <AiOutlineSetting className="w-6 h-6" />
                        <span>Settings</span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ProfileHead
