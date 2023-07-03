"use client"
import useRequireAuth from "@/hooks/useRequireAuth"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FormEvent, useState } from "react"
import { trpc } from "../Context/TrpcContext"

const CommentInput = () => {
    const [content, setContent] = useState("")
    const episodeId = Number(usePathname()?.split("/")[2])

    const utils = trpc.useContext()
    const { mutate } = trpc.comment.add.useMutation({
        onSuccess: () => {
            utils.comment.get.invalidate()
            setContent("")
        },
    })

    const onsubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content.length == 0) return
        mutate({ episodeId, spoiler: false, content })
    }

    const { ref, session } = useRequireAuth<HTMLDivElement>()

    return (
        <div className="flex flex-row gap-5 p-1 mt-4" ref={ref}>
            <div className="w-12 h-12 relative">
                <Image
                    src={
                        session.data?.user?.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    fill={true}
                    alt={session.data?.user?.name as string}
                    style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        aspectRatio: "1 / 1",
                    }}
                />
            </div>
            <form
                onSubmit={onsubmit}
                className="text-accent-900 grow flex flex-col gap-1"
            >
                <input
                    type="text"
                    onChange={e => setContent(e.target.value)}
                    value={content}
                    className="outline-none bg-transparent border-b-2 border-solid border-accent-900"
                    placeholder="Add a comment..."
                    required={true}
                />
                <div
                    className={`${
                        content.length ? "flex" : "hidden"
                    } flex-row-reverse gap-4 p-4`}
                >
                    <button
                        type="submit"
                        disabled={content.length == 0 ? true : false}
                        className="disabled:cursor-default bg-transparent text-accent-900 cursor-pointer"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setContent("")}
                        className="disabled:cursor-default bg-transparent text-accent-900 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <div className="w-[5%] opacity-0" />
        </div>
    )
}
export default CommentInput
