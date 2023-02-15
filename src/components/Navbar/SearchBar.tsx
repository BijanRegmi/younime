"use client"

import { ChangeEvent, useRef, useState } from "react"
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

    return (
        <div
            ref={formRef}
            className="h-5/6 w-full flex-grow flex justify-center"
        >
            <form className="relative w-1/2 h-full flex flex-row justify-center items-center">
                <SearchBtn
                    className={
                        "h-full w-10 p-2 flex-shrink-0 border border-solid border-accent-300 border-r-0 rounded-tl-2xl fill-accent-650 bg-accent-100 " +
                        (showSuggestion ? "opacity-100 " : "opacity-0 ") +
                        (showSuggestion && filteredList.length
                            ? "rounded-bl-none"
                            : "rounded-bl-2xl")
                    }
                />
                <input
                    ref={inputRef}
                    type="text"
                    id="search"
                    name="Search"
                    placeholder="Search"
                    onChange={filterList}
                    onFocus={() => setShowSuggestion(true)}
                    className={
                        "outline-none bg-accent-100 text-accent-800 h-full p-2 flex-grow border border-solid border-accent-300 border-r-0 " +
                        (showSuggestion
                            ? "border-l-0 rounded-tl-none rounded-bl-none"
                            : "rounded-tl-2xl rounded-bl-2xl")
                    }
                />
                {inputRef.current?.value.length ? (
                    <Cross
                        onClick={clearFilter}
                        className="h-full w-[30px] flex-shrink-0 cursor-pointer fill-accent-650 bg-accent-100 border-y border-solid border-y-accent-300 hover:bg-accent-150"
                    />
                ) : (
                    ""
                )}
                <SearchBtn
                    className={
                        "w-[55px] h-full p-2 flex-shrink-0 border border-solid border-accent-300 rounded-tr-2xl cursor-pointer fill-accent-650 bg-accent-100 hover:bg-accent-150 " +
                        (showSuggestion && filteredList.length
                            ? "rounded-br-none"
                            : "rounded-br-2xl")
                    }
                />

                {showSuggestion && filteredList.length > 0 && (
                    <div className="absolute z-10 bg-accent-100 top-full w-full max-h-[70vh] overflow-y-scroll overflow-x-hidden border border-solid border-accent-300 flex-shrink-0 rounded-bl-2xl rounded-br-2xl">
                        {filteredList.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-start items-center cursor-pointer w-full h-full flex-grow py-[3px] hover:bg-accent-200"
                            >
                                <SearchBtn className="border-none h-full w-10 fill-accent-650 p-2" />
                                <span
                                    className="text-accent-750 w-4/5 whitespace-nowrap flex-grow hover:text-accent-850"
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
