"use client"
import { WatchAnime } from "@/utils/getWatchAnime"
import { useState } from "react"

const Synopsis = ({ synopsis }: { synopsis: WatchAnime["synopsis"] }) => {
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        setExpanded(o => !o)
    }

    return (
        <p className="bg-[color:var(--bg-color-3)] text-[color:var(--fg-color)] rounded-2xl p-2">
            {expanded ? synopsis : synopsis ? synopsis.slice(0, 400) : null}
            {expanded ? <br /> : <span className="mr-1">...</span>}
            <button
                onClick={toggle}
                className="decoration-solid no-underline bg-none text-[color:inherit] cursor-pointer hover:text-[color:var(--fg-color-2)]"
            >
                {expanded ? "Show Less" : "Show More"}
            </button>
        </p>
    )
}

export default Synopsis
