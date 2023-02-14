"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth"

const ProfileHead = ({ user }: { user: Session["user"] }) => {
    const [show, setShow] = useState(false)
    return (
        <div className="h-full aspect-square relative">
            <Image
                src={user.image as string}
                fill={true}
                alt={user.name as string}
                className="h-full w-full rounded-full object-contain"
                onClick={() => setShow(old => !old)}
            />
            {show ? (
                <div className="absolute -bottom-1 right-[10%] min-w-[250px] bg-[color:var(--bg-color-3)] rounded-lg p-4 grid grid-cols-[1fr_minmax(0,1fr)] items-center gap-x-2 z-10">
                    <div className="row-start-1 row-end-auto col-start-1 col-end-auto relative w-full aspect-square">
                        <Image
                            src={user.image as string}
                            fill={true}
                            alt={user.name as string}
                            style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                        />
                    </div>
                    <div className="row-start-1 row-end-auto col-start-2 col-end-auto break-words flex flex-col gap-[0.1rem]">
                        <div className="break-words text:[color:var(--fg-color-1)] font-bold">
                            {user.name ?? "undefined"}
                        </div>
                        <div className="break-words text:[color:var(--fg-color-1)]">
                            {user.email ?? "undefined"}
                        </div>
                    </div>
                    <Link href="/api/auth/signout">
                        <button>SignOut</button>
                    </Link>
                </div>
            ) : null}
        </div>
    )
}

export default ProfileHead
