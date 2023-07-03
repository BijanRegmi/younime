"use client"

import { getUser } from "@/lib/getUser"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai"
import { BiUndo } from "react-icons/bi"

const EditableInfo = ({
    data,
}: {
    data: Awaited<ReturnType<typeof getUser>>
}) => {
    const { user, hist } = data
    const [editing, setEditing] = useState({
        name: "",
        bio: "",
        active: false,
    })

    useEffect(() => {
        if (user)
            setEditing({ name: "Edit name", bio: user.bio, active: false })
    }, [user])

    if (!user) return notFound()

    const toggleEdit = () => setEditing(o => ({ ...o, active: !o.active }))
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEditing(o => ({ ...o, [e.target.name]: e.target.value }))

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
                    fill
                />
            </div>
            <form className="flex flex-col items-center relative group">
                <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    className={`text-2xl bg-transparent focus:outline-none font-bold w-min text-center border-b ${
                        editing.active
                            ? "border-accent-700"
                            : "border-transparent"
                    }`}
                    disabled={!editing.active}
                    value={editing.active ? editing.name : user.name || ""}
                />
                <input
                    type="text"
                    name="bio"
                    onChange={onChange}
                    className={`bg-transparent focus:outline-none w-min text-center border-b ${
                        editing.active
                            ? "border-accent-700"
                            : "border-transparent"
                    }`}
                    disabled={!editing.active}
                    value={editing.active ? editing.bio : user.bio}
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
                            onClick={toggleEdit}
                        />
                        <BiUndo
                            className="w-6 h-6 absolute top-8 right-0 opacity-0 cursor-pointer group-hover:opacity-100"
                            onClick={toggleEdit}
                        />
                    </>
                ) : (
                    <AiOutlineEdit
                        className="w-6 h-6 absolute top-0 right-0 opacity-0 cursor-pointer group-hover:opacity-100"
                        onClick={toggleEdit}
                    />
                )}
            </form>
        </>
    )
}

export default EditableInfo
