import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import useOnClickOutside from "../customHooks/useOnClickOutside"

import fuzzysort from "fuzzysort"

import SearchBtn from "../assets/search.svg"
import Cross from "../assets/cross.svg"
import styles from "../styles/searchbar.module.css"

const fetchAnimeList = async () => {
	return fetch("/api/allAnime").then(res => res.json())
}

const SearchBar = () => {
	const [showSuggestion, setShowSuggestion] = useState(false)
	const [filteredList, setFilteredList] = useState([])
	const inputRef = useRef()
	const formRef = useOnClickOutside(() => setShowSuggestion(false))
	const router = useRouter()

	const { data: animeList } = useQuery("getAnimeList", fetchAnimeList)

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

	return (
		<div ref={formRef} className={styles.searchContainer}>
			<form className={styles.inputRow}>
				<SearchBtn
					style={{
						opacity: showSuggestion ? 1 : 0,
						borderBottomLeftRadius: filteredList.length
							? "0rem"
							: "1rem",
					}}
					className={styles.textSearchBtn}
				/>
				<input
					ref={inputRef}
					type="text"
					id="search"
					name="Search"
					placeholder="Search"
					style={{
						borderLeft: showSuggestion ? "none" : "",
						borderRadius: showSuggestion ? "0rem" : "",
					}}
					onChange={filterList}
					onFocus={() => setShowSuggestion(true)}
				/>
				{inputRef.current?.value.length != 0 && (
					<Cross
						onClick={clearFilter}
						className={styles.textCrossBtn}
					/>
				)}
				<SearchBtn
					className={styles.searchBtn}
					style={{
						borderBottomRightRadius: filteredList.length
							? "0rem"
							: "1rem",
					}}
				/>
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
