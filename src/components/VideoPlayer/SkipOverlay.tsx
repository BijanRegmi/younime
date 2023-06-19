import { SkipState } from "."

const SkipOverlay = (props: {
    state: SkipState
    seek: ((sec: number) => void) | undefined
}) => {
    const onClick = () => {
        if (props.seek) props.seek(props.state.end)
    }

    return (
        <div
            className="absolute right-0 bottom-16 px-4 py-2 cursor-pointer bg-black bg-opacity-50 border-white border"
            onClick={onClick}
        >
            Skip {props.state.state}
        </div>
    )
}

export default SkipOverlay
