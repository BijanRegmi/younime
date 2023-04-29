const GenreList = () => {
    const genres = ["A", "B", "C", "D", "E", "F", "G", "H"]

    return (
        <div className="flex justify-end gap-4">
            {genres.map((genre, idx) => (
                <div key={idx}>{genre}</div>
            ))}
        </div>
    )
}

export default GenreList
