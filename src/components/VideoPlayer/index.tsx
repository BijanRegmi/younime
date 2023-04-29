"use client"

import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import useHasWindow from "@/hooks/useHasWindow"
import useShowOnMouseMove from "@/hooks/useShowOnMouseMove"
import Controls from "./Controls"
import { OnProgressProps } from "react-player/base"
import { source } from "@/utils/getSources"

export enum MODES {
    FULLSCREEN = "fullscreen",
    THEATRE = "theatre",
    MINI = "mini",
    NORMAL = "normal",
}

export interface VideoState {
    mode: MODES
    playing: boolean
    muted: boolean
    played: number
    loaded: number
    duration: number
    playbackRate: number
    volume: number
    sources: source[][]
    active_source: number
    active_quality: number
}

const VideoPlayer = ({ sources }: { sources: source[][] }) => {
    const hasWindow = useHasWindow()
    const { show, setShow, cleartimeout, onMouseMove } =
        useShowOnMouseMove<HTMLDivElement>()

    const [state, setState] = useState<VideoState>({
        mode: MODES.NORMAL,
        playing: false,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        volume: 1,
        sources: sources,
        active_source: 0,
        active_quality: sources[0].length - 1,
    })

    useEffect(() => {
        setState(o => ({ ...o, sources }))
    }, [sources])

    const playerRef = useRef<ReactPlayer>(null)

    const onProgress = (val: OnProgressProps) => {
        setState(old => ({ ...old, played: val.played, loaded: val.loaded }))
    }

    const setDuration = (duration: number) => {
        console.info("Video loaded.", { duration })
        setState({ ...state, duration })
    }

    const onMouseLeave = () => {
        if (!state.playing) {
            cleartimeout()
        } else {
            setShow(false)
        }
    }

    return (
        <div
            id="videoContainer"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ cursor: show || !state.playing ? "default" : "none" }}
            className={`relative bg-black self-center justify-self-center w-full max-w-[1200px] aspect-[16/9] videoplayer ${state.mode
                .toString()
                .toLowerCase()}`}
        >
            {hasWindow && (
                <ReactPlayer
                    url={sources[state.active_source][state.active_quality].url}
                    playing={state.playing}
                    loop={false}
                    controls={false}
                    light={false}
                    volume={state.volume}
                    muted={state.muted}
                    playbackRate={state.playbackRate}
                    progressInterval={1000}
                    playsinline={false}
                    pip={true}
                    stopOnUnmount={false}
                    /* Extra */
                    ref={playerRef}
                    width="100%"
                    height="100%"
                    /* Callbacks */
                    onProgress={onProgress}
                    onDuration={setDuration}
                />
            )}

            {(show || !state.playing) && (
                <Controls
                    state={state}
                    setState={setState}
                    playerRef={playerRef}
                />
            )}
        </div>
    )
}

export default VideoPlayer
