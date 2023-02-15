"use client"
import { WatchAnime } from "@/utils/getWatchAnime"
import { useState } from "react"

const Synopsis = ({ synopsis }: { synopsis: WatchAnime["synopsis"] }) => {
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        setExpanded(o => !o)
    }

    return (
        <p className="bg-accent-150 text-accent-800 rounded-2xl p-2">
            {expanded ? synopsis : synopsis ? synopsis.slice(0, 400) : null}
            {expanded ? <br /> : <span className="mr-1">...</span>}
            <button
                onClick={toggle}
                className="cursor-pointer hover:text-accent-900"
            >
                {expanded ? "Show Less" : "Show More"}
            </button>
        </p>
    )
}

export default Synopsis
