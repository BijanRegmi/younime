const Loading = () => {
    return (
        <div className="w-full grid gap-y-2 gap-x-4 h-full watchpage">
            <div
                id="videoContainer"
                className="bg-accent-200 self-center justify-self-center w-full max-w-[1200px] aspect-[16/9] videoplayer border border-accent-400 rounded animate-pulse"
            />
            <div className="w-full eplist border border-accent-400 border-solid rounded-lg bg-accent-200 animate-pulse" />
            <div className="animedesc w-full animedesc h-full bg-accent-200" />
        </div>
    )
}

export default Loading
