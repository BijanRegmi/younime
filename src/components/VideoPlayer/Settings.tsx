"use client"
import SettingIcon from "@/assets/videoplayer/settings.svg"
import "@/styles/globals.css"
import { useState } from "react"

interface option {
    title: string
    options: string[]
    selected: number
    setter: (idx: number) => void
}

export const Settings = ({ options }: { options: option[] }) => {
    const [selected, Select] = useState(-1)
    const [open, setOpen] = useState(false)

    return (
        <div className="relative h-8 w-8">
            <SettingIcon
                className="controlBtn"
                onClick={() => {
                    setOpen(o => !o)
                }}
            />
            {open && (
                <div className="absolute bottom-[110%] right-0 w-max rounded-md bg-accent-150/75 border border-solid border-accent-250">
                    {selected == -1 ? (
                        options.map((o, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="flex w-full my-2 p-2 gap-8 cursor-pointer hover:bg-accent-200/75"
                                    onClick={() => {
                                        Select(idx)
                                    }}
                                >
                                    <div className="flex-grow">{o.title}</div>
                                    <div>{o.options[o.selected]}</div>
                                </div>
                            )
                        })
                    ) : (
                        <div>
                            <div className="border-b border-accent-750 border-solid p-2 flex gap-4">
                                <button
                                    className="font-bold"
                                    onClick={() => {
                                        Select(-1)
                                    }}
                                >
                                    {"＜"}
                                </button>
                                {options[selected].title}
                            </div>
                            {options[selected].options.map((o, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="flex w-full mb-1 gap-4 p-2 hover:bg-accent-200/75 cursor-pointer rounded-md"
                                        onClick={() => {
                                            options[selected].setter(idx)
                                            Select(-1)
                                        }}
                                    >
                                        <span
                                            className={
                                                options[selected].selected ==
                                                idx
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }
                                        >
                                            ✔
                                        </span>
                                        <div className="text-center">{o}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
