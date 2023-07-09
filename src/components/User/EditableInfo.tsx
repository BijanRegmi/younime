"use client"

import { getUser } from "@/lib/getUser"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai"
import { BiUndo } from "react-icons/bi"
import { trpc } from "../Context/TrpcContext"

const EditableInfo = ({
    data,
}: {
    data: Awaited<ReturnType<typeof getUser>>
}) => {
    const { user, hist } = data
    const [actual, setActual] = useState({ name: "", bio: "" })
    const [editing, setEditing] = useState({
        name: "",
        bio: "",
        active: false,
    })

    useEffect(() => {
        if (user) {
            setEditing({ name: user.name || "", bio: user.bio, active: false })
            setActual({ name: user.name || "", bio: user.bio })
        }
    }, [user])

    if (!user) return notFound()

    const startEdit = () =>
        setEditing({ name: actual.name, bio: actual.bio, active: true })
    const stopEdit = () => setEditing({ name: "", bio: "", active: false })

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEditing(o => ({ ...o, [e.target.name]: e.target.value }))

    const { mutate } = trpc.user.edit.useMutation({
        onSuccess: () => {
            setActual({ name: editing.name, bio: editing.bio })
            stopEdit()
        },
    })

    const onSave = () => {
        mutate({ name: editing.name, bio: editing.bio })
    }

    const hist_keys = Object.keys(data.hist) as Array<keyof typeof hist>

    return (
        <>
            <div className="relative w-40 aspect-square rounded-full overflow-hidden">
                <Image
                    src={
                        user.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt={"Image"}
                    className="object-cover"
                    fill
                />
            </div>
            <form className="flex flex-col items-center relative group">
                <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    className={`text-2xl bg-transparent focus:outline-none font-bold w-min text-center border-b ${editing.active
                            ? "border-accent-400"
                            : "border-transparent"
                        }`}
                    disabled={!editing.active}
                    value={editing.active ? editing.name : actual.name || ""}
                />
                <input
                    type="text"
                    name="bio"
                    onChange={onChange}
                    className={`bg-transparent focus:outline-none w-min text-center border-b ${editing.active
                            ? "border-accent-400"
                            : "border-transparent"
                        }`}
                    disabled={!editing.active}
                    value={editing.active ? editing.bio : actual.bio}
                />
                <h3 className="mx-auto w-fit text-accent-800">
                    Joined:{" "}
                    {user.createdAt.toLocaleDateString("en-US", {
                        day: "2-digit",
                        year: "numeric",
                        month: "short",
                    })}
                </h3>
                <div className="">
                    {hist_keys.map((k, idx) => (
                        <div
                            key={idx}
                            className="inline-block px-2 text-center"
                        >
                            <span className="block text-4xl">{hist[k]}</span>
                            <span className="text-xs">{k.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
                {editing.active ? (
                    <>
                        <AiOutlineSave
                            className="w-6 h-6 absolute top-0 right-0 opacity-0 cursor-pointer group-hover:opacity-100"
                            onClick={onSave}
                        />
                        <BiUndo
                            className="w-6 h-6 absolute top-8 right-0 opacity-0 cursor-pointer group-hover:opacity-100"
                            onClick={stopEdit}
                        />
                    </>
                ) : (
                    <AiOutlineEdit
                        className="w-6 h-6 absolute top-0 right-0 opacity-0 cursor-pointer group-hover:opacity-100"
                        onClick={startEdit}
                    />
                )}
            </form>
        </>
    )
}

export default EditableInfo
