"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import useHasWindow from "@/hooks/useHasWindow"
import useShowOnMouseMove from "@/hooks/useShowOnMouseMove"
import Controls from "./Controls"
import { OnProgressProps } from "react-player/base"
import { AnimeResources } from "@/lib/getAnimeResources"

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
    resources: AnimeResources
    subdub: "sub" | "dub"
    srcIdx: number
    qualityIdx: number
    trackIdx: number
}

const VideoPlayer = ({ resources }: { resources: AnimeResources }) => {
    const hasWindow = useHasWindow()
    const { show, setShow, display, cleartimeout, onMouseMove } =
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
        resources,
        subdub: "sub",
        srcIdx: -1,
        qualityIdx: -1,
        trackIdx: -1,
    })

    useEffect(() => {
        let subdub: "sub" | "dub" = "sub"

        if (resources["sub"]) subdub = "sub"
        else if (resources["dub"]) subdub = "dub"

        let srcIdx = (resources[subdub]?.source.length || 0) - 1
        let qualityIdx =
            (resources[subdub]?.source[srcIdx]?.qualities.length || 0) - 1

        let trackIdx =
            resources[subdub]?.tracks?.findIndex(t => t.default == true) || -1

        setState(o => ({
            ...o,
            subdub,
            srcIdx,
            qualityIdx,
            trackIdx,
            resources,
        }))
    }, [resources])

    const playerRef = useRef<ReactPlayer>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const onReady = () => {
        let tracks = playerRef.current?.getInternalPlayer().textTracks

        for (let i = 0; i < tracks?.length; i++) {
            tracks[i].mode = "disabled"
            if (i == state.trackIdx) tracks[i].mode = "showing"
        }
    }

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

    const keyboardShortcutHandlers = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key
            if (!playerRef.current) return

            display(2000)

            let c = playerRef.current.getCurrentTime()
            let d = playerRef.current.getDuration()

            switch (key) {
                case "k":
                case " ":
                    setState(o => ({ ...o, playing: !o.playing }))
                    break
                case "<":
                    setState(o => ({
                        ...o,
                        playbackRate: Math.max(0, o.playbackRate - 0.25),
                    }))
                    break
                case ">":
                    setState(o => ({
                        ...o,
                        playbackRate: Math.min(2, o.playbackRate + 0.25),
                    }))
                    break
                case "ArrowLeft":
                case "j":
                    playerRef.current?.seekTo(Math.max(0, (c - 10) / d))
                    break
                case "ArrowRight":
                case "l":
                    playerRef.current?.seekTo(Math.min(1, (c + 10) / d))
                    break
                case "m":
                    setState(o => ({ ...o, muted: !o.muted }))
                    break
                case "ArrowDown":
                    setState(o => ({
                        ...o,
                        volume: Math.max(0, o.volume - 0.1),
                    }))
                    break
                case "ArrowUp":
                    setState(o => ({
                        ...o,
                        volume: Math.min(1, o.volume + 0.1),
                    }))
                    break
                case "f":
                    if (document.fullscreenElement == null)
                        document
                            .getElementById("videoContainer")
                            ?.requestFullscreen()
                    else document.exitFullscreen()
                    break
                case "t":
                    if (state.mode != MODES.THEATRE)
                        setState(old => ({ ...old, mode: MODES.THEATRE }))
                    else setState(old => ({ ...old, mode: MODES.NORMAL }))
                    break
                case "i":
                    if (state.mode == MODES.MINI)
                        try {
                            setState(old => ({ ...old, mode: MODES.NORMAL }))
                            document.exitPictureInPicture()
                        } catch (err) {
                            console.error(err)
                        }
                    else
                        try {
                            playerRef.current
                                ?.getInternalPlayer()
                                ?.requestPictureInPicture()
                            setState(old => ({ ...old, mode: MODES.MINI }))
                        } catch (err) {
                            console.error(err)
                        }
            }
        },
        [state.mode, display]
    )

    useEffect(() => {
        if (!containerRef.current) return

        let elem = containerRef.current

        elem.addEventListener("keydown", keyboardShortcutHandlers)

        return () =>
            elem.removeEventListener("keydown", keyboardShortcutHandlers)
    }, [containerRef, keyboardShortcutHandlers])

    return (
        <div
            ref={containerRef}
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
                    url={
                        state.resources[state.subdub]?.source[state.srcIdx]
                            ?.qualities[state.qualityIdx]?.url
                    }
                    config={{
                        file: {
                            attributes: {
                                crossOrigin: "anonymous",
                            },
                            tracks: state.resources[state.subdub]?.tracks.map(
                                t => ({
                                    ...t,
                                    default: false,
                                })
                            ),
                        },
                    }}
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
                    onReady={onReady}
                    onProgress={onProgress}
                    onDuration={setDuration}
                />
            )}

            <Controls
                hovering={show}
                state={state}
                setState={setState}
                playerRef={playerRef}
            />
        </div>
    )
}

export default VideoPlayer
