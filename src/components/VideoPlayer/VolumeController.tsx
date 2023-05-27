import VolumeHigh from "@/assets/videoplayer/volume-high.svg"
import VolumeLow from "@/assets/videoplayer/volume-low.svg"
import VolumeMute from "@/assets/videoplayer/volume-mute.svg"
import { VideoState } from "./"
import { Dispatch, SetStateAction, MouseEvent, useState, useRef } from "react"

const VolumeController = ({
    state,
    setState,
}: {
    state: VideoState
    setState: Dispatch<SetStateAction<VideoState>>
}) => {
    const [dragging, setDragging] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const onDrag = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (!dragging || !ref.current) return

        const rec = ref.current.getBoundingClientRect()
        const pos =
            Math.min(Math.max(0, e.clientX - rec.x), rec.width) / rec.width
        setState(o => ({ ...o, volume: pos }))
    }

    const startDrag = (
        e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
        if (!ref.current) return

        setDragging(true)
        const rec = ref.current.getBoundingClientRect()
        const pos =
            Math.min(Math.max(0, e.clientX - rec.x), rec.width) / rec.width
        setState(o => ({ ...o, volume: pos }))
    }

    const stopDrag = () => setDragging(false)
    const toggleVolume = () => setState(old => ({ ...old, muted: !old.muted }))

    return (
        <div className="flex items-center volume h-full volume">
            {state.muted ? (
                <VolumeMute onClick={toggleVolume} className="controlBtn" />
            ) : state.volume < 0.5 ? (
                <VolumeLow onClick={toggleVolume} className="controlBtn" />
            ) : (
                <VolumeHigh onClick={toggleVolume} className="controlBtn" />
            )}
            <div
                onMouseDown={startDrag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onMouseMove={onDrag}
                className="w-0 h-full cursor-pointer relative overflow-hidden volume-slider hover:w-14"
                ref={ref}
            >
                <div
                    className={
                        "absolute top-1/2 w-3 h-3 rounded-full bg-accent-900 -translate-y-1/2 " +
                        "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-16 before:h-[2px] before:bg-accent-900 before:-left-16 " +
                        "after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:w-16 after:h-[2px] after:bg-accent-600 after:left-3"
                    }
                    style={{
                        // w-14(56px) - w-3(12px) = 44px
                        left: `${state.volume * 44}px`,
                    }}
                />
            </div>
        </div>
    )
}
export default VolumeController
