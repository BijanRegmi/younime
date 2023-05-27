import SettingIcon from "@/assets/videoplayer/settings.svg"
import useOnClickOutside from "@/hooks/useOnClickOutside"
import "@/styles/globals.css"
import { useState } from "react"
import { IconType } from "react-icons"
import { AiOutlineRight, AiOutlineLeft, AiOutlineCheck } from "react-icons/ai"

interface option {
    title: string
    options: string[]
    selected: number
    Icon?: IconType
    setter: (idx: number) => void
}

export const Settings = ({
    options,
    toggle,
    close,
    state,
}: {
    options: option[]
    toggle: () => void
    close: () => void
    state: boolean
}) => {
    const [selected, Select] = useState(-1)

    const ref = useOnClickOutside<HTMLDivElement>({ handler: close })

    return (
        <div className="relative h-8 w-8" ref={ref}>
            <SettingIcon className="controlBtn" onClick={toggle} />
            {state && (
                <div className="absolute bottom-[110%] right-0 w-max rounded-md bg-accent-150/75 border border-solid border-accent-250 text-sm px-4">
                    {selected == -1 ? (
                        options.map((o, idx) => {
                            if (o.options.length < 1) return <></>
                            return (
                                <div
                                    key={idx}
                                    className="flex w-full my-2 p-2 gap-4 cursor-pointer hover:bg-accent-200/75 items-center"
                                    onClick={() => {
                                        if (o.options.length > 1) Select(idx)
                                    }}
                                >
                                    {o.Icon && (
                                        <o.Icon className="text-accent-900 w-5 h-5 fill-white" />
                                    )}
                                    <div className="flex-grow">{o.title}</div>
                                    <div>
                                        <span className="inline-block">
                                            {o.options[o.selected]}
                                        </span>
                                        {o.options.length > 1 && (
                                            <AiOutlineRight className="inline-block align-middle" />
                                        )}
                                    </div>
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
                                    <AiOutlineLeft />
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
                                            <AiOutlineCheck />
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
