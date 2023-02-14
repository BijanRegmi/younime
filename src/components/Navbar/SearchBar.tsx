"use client"

import { ChangeEvent, CSSProperties, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import useOnClickOutside from "@/hooks/useOnClickOutside"

import fuzzysort from "fuzzysort"

import SearchBtn from "@/assets/misc/search.svg"
import Cross from "@/assets/misc/cross.svg"
import { SearchableAnime } from "@/utils/getSearchList"

const SearchBar = ({ animeList }: { animeList: SearchableAnime[] }) => {
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [filteredList, setFilteredList] = useState<SearchableAnime[]>([])

    const inputRef = useRef<HTMLInputElement>(null)
    const formRef = useOnClickOutside<HTMLDivElement>({
        handler: () => setShowSuggestion(false),
    })

    const router = useRouter()

    const filterList = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value.length > 0) {
            const results = fuzzysort.go(value, animeList, {
                keys: ["title", "alttitle"],
                scoreFn: a =>
                    Math.max(
                        a[0] ? a[0].score : -1000,
                        a[1] ? a[1].score - 100 : -1000
                    ),
            })
            setFilteredList(results.slice(0, 8).map(result => result.obj))
        } else {
            setFilteredList([])
        }
    }

    const clearFilter = () => {
        setFilteredList([])
        if (!inputRef.current) return
        inputRef.current.value = ""
        inputRef.current.focus()
    }

    const style = {
        "--bottom-radius":
            showSuggestion && filteredList.length ? "0rem" : "1rem",
    }

    return (
        <div
            ref={formRef}
            className="h-full flex-grow flex justify-center"
            style={style as CSSProperties}
        >
            <form className="relative min-w-3/4 h-full flex flex-row justify-center items-center">
                <SearchBtn
                    style={{
                        opacity: showSuggestion ? 1 : 0,
                    }}
                    className="h-full w-10 p-2 flex-shrink-0 border border-solid border-[color:var(--border-color)] border-r-0 rounded-tl-2xl rounded-bl-[length:var(--bottom-radius)] fill-[color:var(--fg-color-2)] bg-[color:var(--bg-color-2)]"
                />
                <input
                    ref={inputRef}
                    type="text"
                    id="search"
                    name="Search"
                    placeholder="Search"
                    onChange={filterList}
                    onFocus={() => setShowSuggestion(true)}
                    className={`outline-none bg-[color:var(--bg-color-2)] text-[color:var(--fg-color)] h-full p-2 flex-grow border border-solid border-[color:var(--border-color)] border-r-0 ${showSuggestion
                            ? "border-l-0 rounded-tl-none rounded-bl-none"
                            : "rounded-tl-2xl rounded-bl-2xl"
                        }`}
                />
                {inputRef.current?.value.length != 0 && (
                    <Cross
                        onClick={clearFilter}
                        className="h-full w-[30px] flex-shrink-0 cursor-pointer fill-[color:var(--fg-color-2)] bg-[color:var(--bg-color-2)] border-y border-solid border-y-[color:var(--border-color)]"
                    />
                )}
                <SearchBtn className="w-[55px] h-full p-2 pl-4 flex-shrink-0 border border-solid border-[color:var(--border-color)] rounded-tr-2xl rounded-br-[length:var(--bottom-radius)] cursor-pointer fill-[color:var(--fg-color-2)] bg-[color:var(--bg-color-2)]" />

                {showSuggestion && filteredList.length > 0 && (
                    <div className="absolute z-10 bg-[color:var(--bg-color)] top-full w-full max-h-[70vh] overflow-y-scroll overflow-x-hidden border border-solid border-[color:var(--border-color)] flex-shrink-0 rounded-l-2xl rounded-r-2xl">
                        {filteredList.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-start items-center cursor-pointer w-full h-full flex-grow py-[3px]"
                            >
                                <SearchBtn className="border-none bg-transparent focus:hover:bg-[color:var(--bg-color-3)]" />
                                <span
                                    className="text-[color:var(--fg-color-2)] w-4/5 whitespace-nowrap flex-grow"
                                    onClick={() => {
                                        if (!inputRef.current) return
                                        inputRef.current.value = item.title
                                        setShowSuggestion(false)
                                        router.push(`/${item.id}`)
                                    }}
                                >
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    )
}

export default SearchBar
