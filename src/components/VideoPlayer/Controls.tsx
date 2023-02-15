"use client"
// SVGs
import Play from "@/assets/videoplayer/play.svg"
import Pause from "@/assets/videoplayer/pause.svg"
import VolumeHigh from "@/assets/videoplayer/volume-high.svg"
import VolumeLow from "@/assets/videoplayer/volume-low.svg"
import VolumeMute from "@/assets/videoplayer/volume-mute.svg"
import MiniPlayer from "@/assets/videoplayer/miniPlayer.svg"
import TheaterTall from "@/assets/videoplayer/theater-tall.svg"
import TheaterWide from "@/assets/videoplayer/theater-wide.svg"
import FullScreenOpen from "@/assets/videoplayer/fullscreen-open.svg"
import FullScreenClose from "@/assets/videoplayer/fullscreen-close.svg"

import { durationFormatter } from "@/utils/helpers"
import { MODES, VideoState } from "./"
import {
    CSSProperties,
    Dispatch,
    FormEvent,
    MouseEvent,
    RefObject,
    SetStateAction,
    useState,
} from "react"
import ReactPlayer from "react-player"

const Controls = ({
    state,
    setState,
    playerRef,
}: {
    state: VideoState
    setState: Dispatch<SetStateAction<VideoState>>
    playerRef: RefObject<ReactPlayer>
}) => {
    // TOGGLE PLAY/PAUSE
    const togglePlay = () => {
        setState(old => ({ ...old, playing: !old.playing }))
    }

    // TOGGLE VOLUME
    const toggleVolume = () => {
        setState(old => ({ ...old, muted: !old.muted }))
    }

    // CHANGE VOLUME
    const slideVolume = (e: FormEvent<HTMLInputElement>) => {
        setState(old => ({
            ...old,
            /* @ts-expect-error Types ;-; */
            volume: e.target.value,
            /* @ts-expect-error Types ;-; */
            muted: e.target.value == 0,
        }))
    }

    // CHANGE RATE
    const onRateChange = () => {
        let newRate = state.playbackRate + 0.25
        if (newRate > 2) newRate = 0.25
        setState(old => ({ ...old, playbackRate: newRate }))
    }

    // MINI PLAYER
    const onMiniPlayer = () => {
        if (state.mode == MODES.MINI) {
            try {
                setState(old => ({ ...old, mode: MODES.NORMAL }))
                document.exitPictureInPicture()
            } catch (err) {
                console.error(err)
            }
        } else
            try {
                playerRef.current
                    ?.getInternalPlayer()
                    ?.requestPictureInPicture()
                setState(old => ({ ...old, mode: MODES.MINI }))
            } catch (err) {
                console.error(err)
            }
    }

    // THEATRE
    const onTheatre = () => {
        if (state.mode != MODES.THEATRE)
            setState(old => ({ ...old, mode: MODES.THEATRE }))
        else setState(old => ({ ...old, mode: MODES.NORMAL }))
    }

    // FULLSCREEN
    const onFullScreen = () => {
        if (document.fullscreenElement == null) {
            document.getElementById("videoContainer")?.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    const [hover, setHover] = useState<boolean>(false)

    const seek = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        /* @ts-expect-error Types ;-; */
        const rec = e.target.getBoundingClientRect()
        const pos =
            Math.min(Math.max(0, e.clientX - rec.x), rec.width) / rec.width
        playerRef.current?.seekTo(pos)
    }

    const styles = {
        "--loaded-percent": `${state.loaded * 100}%`,
        "--played-percent": `${state.played * 100}%`,
    }

    return (
        <div
            style={styles as CSSProperties}
            className="absolute bottom-0 left-0 right-0 w-full text-accent-900 z-10 transition-all bg-black bg-opacity-5"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                onClick={seek}
                className="w-full h-4 flex items-center cursor-pointer relative"
            >
                <div
                    className={
                        "w-full h-[15%] cursor-pointer relative bg-accent-50 bg-opacity-30 " +
                        (hover ? "h-[20%] " : " ") +
                        "after:content-[''] after:bg-red-900 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-[calc(100%-var(--played-percent))] " +
                        "before:content-[''] before:bg-accent-700 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-[calc(100%-var(--loaded-percent))]"
                    }
                >
                    <div
                        style={{
                            left: `${state.played * 100}%`,
                            display: hover ? "block" : "none",
                        }}
                        className="absolute h-[400%] aspect-square rounded-full bg-red-900 -translate-y-1/2 -translate-x-1/2"
                    />
                </div>
            </div>
            <div className="flex gap-2 p-1 flex-row items-center">
                {state.playing ? (
                    <Pause onClick={togglePlay} className="controlBtn" />
                ) : (
                    <Play onClick={togglePlay} className="controlBtn" />
                )}
                <div className="flex items-center">
                    {state.muted ? (
                        <VolumeMute
                            onClick={toggleVolume}
                            className="controlBtn"
                        />
                    ) : state.volume < 0.5 ? (
                        <VolumeLow
                            onClick={toggleVolume}
                            className="controlBtn"
                        />
                    ) : (
                        <VolumeHigh
                            onClick={toggleVolume}
                            className="controlBtn"
                        />
                    )}
                    <input
                        className="ml-2 w-0 scale-0 transition-all focus-within:w-2/5 focus-within:scale-100"
                        type="range"
                        min="0"
                        max="1"
                        step="any"
                        value={state.volume}
                        onInput={slideVolume}
                    />
                </div>
                <div className="flex items-center gap-[0.1rem] flex-grow">
                    <div>
                        {durationFormatter(state.played * state.duration || 0)}
                    </div>
                    /<div>{durationFormatter(state.duration || 0)}</div>
                </div>
                <span className="controlBtn" onClick={onRateChange}>
                    {state.playbackRate}x
                </span>
                <MiniPlayer className="controlBtn" onClick={onMiniPlayer} />
                {state.mode == MODES.THEATRE ? (
                    <TheaterWide className="controlBtn" onClick={onTheatre} />
                ) : (
                    <TheaterTall className="controlBtn" onClick={onTheatre} />
                )}
                {state.mode == MODES.FULLSCREEN ? (
                    <FullScreenClose
                        className="controlBtn"
                        onClick={onFullScreen}
                    />
                ) : (
                    <FullScreenOpen
                        className="controlBtn"
                        onClick={onFullScreen}
                    />
                )}
            </div>
        </div>
    )
}

export default Controls
