"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import useOnClickOutside from "@/hooks/useOnClickOutside"

import fuzzysort from "fuzzysort"

import SearchBtn from "@/assets/search.svg"
import Cross from "@/assets/cross.svg"
import styles from "@/styles/searchbar.module.css"

const SearchBar = ({ animeList }) => {
	const [showSuggestion, setShowSuggestion] = useState(false)
	const [filteredList, setFilteredList] = useState([])
	const inputRef = useRef()
	const formRef = useOnClickOutside(() => setShowSuggestion(false))
	const router = useRouter()

	const filterList = e => {
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
		inputRef.current.value = ""
		inputRef.current.focus()
	}

	const style = {
		"--bottom-radius":
			showSuggestion && filteredList.length ? "0rem" : "1rem",
		"--input-border-left": showSuggestion
			? "none"
			: "1px solid var(--border-color)",
		"--input-border-radius": showSuggestion ? "0rem" : "1rem",
	}

	return (
		<div ref={formRef} className={styles.searchContainer} style={style}>
			<form className={styles.inputRow}>
				<SearchBtn
					style={{
						opacity: showSuggestion ? 1 : 0,
					}}
					className={styles.textSearchBtn}
				/>
				<input
					ref={inputRef}
					type="text"
					id="search"
					name="Search"
					placeholder="Search"
					onChange={filterList}
					onFocus={() => setShowSuggestion(true)}
				/>
				{inputRef.current?.value.length != 0 && (
					<Cross
						onClick={clearFilter}
						className={styles.textCrossBtn}
					/>
				)}
				<SearchBtn className={styles.searchBtn} />
			</form>

			{showSuggestion && filteredList.length > 0 && (
				<div className={styles.suggestionBox}>
					{filteredList.map(item => (
						<div key={item.id} className={styles.animeBox}>
							<SearchBtn className={styles.textSearchBtn} />
							<span
								className={styles.animeTitle}
								onClick={() => {
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
		</div>
	)
}

export default SearchBar
