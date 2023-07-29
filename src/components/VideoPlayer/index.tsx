"use client"

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import useHasWindow from "@/hooks/useHasWindow"
import useShowOnMouseMove from "@/hooks/useShowOnMouseMove"
import Controls from "./Controls"
import { OnProgressProps } from "react-player/base"
import { AnimeResources } from "@/lib/getAnimeResources"
import SkipOverlay from "./SkipOverlay"
import { useRouter } from "next/navigation"

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
    autoPlay: number
    next: string
    prev: string
}

export interface SkipState {
    state: "off" | "Intro" | "Outro"
    end: number
}

const VideoPlayer = ({
    resources,
    next,
    prev,
}: {
    resources: AnimeResources
    next: string
    prev: string
}) => {
    const router = useRouter()
    const hasWindow = useHasWindow()
    const { show, setShow, display, cleartimeout, onMouseMove } =
        useShowOnMouseMove<HTMLDivElement>()

    const [state, setState] = useState<VideoState>({
        mode: MODES.NORMAL,
        playing: true,
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
        trackIdx: 0,
        autoPlay: 1,
        next,
        prev,
    })

    const [skipState, setSkipState] = useState<SkipState>({
        state: "off",
        end: -1,
    })

    useEffect(() => {
        let subdub: "sub" | "dub" =
            (localStorage.getItem("subdub") as "sub" | "dub") || "sub"
        if (subdub == "sub" && !resources["sub"]) subdub = "dub"
        else if (subdub == "dub" && !resources["dub"]) subdub = "sub"

        const autoPlay = localStorage.getItem("autoplay") == "1" ? 1 : 0

        let srcIdx = (resources[subdub]?.source.length || 0) - 1
        let qualityIdx =
            (resources[subdub]?.source[srcIdx]?.qualities.length || 0) - 1

        let trackLabel =
            localStorage.getItem("track")?.toLowerCase() || "INVALID"
        let trackIdx =
            resources[subdub]?.tracks?.findIndex(
                t => t.label?.toLowerCase().includes(trackLabel)
            ) ?? -1
        trackIdx =
            trackIdx == -1
                ? (resources[subdub]?.tracks.findIndex(
                      t => t.default == true
                  ) ?? -1) + 1
                : trackIdx + 1

        setState(o => ({
            ...o,
            subdub,
            srcIdx,
            qualityIdx,
            trackIdx,
            resources,
            autoPlay,
            next,
            prev,
        }))
    }, [resources, next, prev])

    const playerRef = useRef<ReactPlayer>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const onReady = () => {
        let tracks = playerRef.current?.getInternalPlayer().textTracks

        for (let i = 0; i < tracks?.length; i++) {
            tracks[i].mode = "disabled"
            if (i == state.trackIdx - 1) tracks[i].mode = "showing"
        }
    }

    const onProgress = (val: OnProgressProps) => {
        setState(old => ({ ...old, played: val.played, loaded: val.loaded }))

        const activeResource = state.resources[state.subdub]
        if (!activeResource) return

        const t = val.played * state.duration
        if (activeResource.intro.start <= t && t <= activeResource.intro.end) {
            setSkipState({ state: "Intro", end: activeResource.intro.end })
        } else if (
            activeResource.outro.start <= t &&
            t <= activeResource.outro.end
        ) {
            setSkipState({ state: "Outro", end: activeResource.outro.end })
        } else {
            setSkipState({ state: "off", end: -1 })
        }
    }

    const onEnded = () => {
        if (state.autoPlay && next) {
            router.push(next)
        } else {
            setState(o => ({ ...o, playing: false }))
        }
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
        (e: KeyboardEvent<HTMLDivElement>) => {
            console.log("Called key handler")
            const key = e.key
            if (!playerRef.current) return

            display(2000)

            let c = playerRef.current.getCurrentTime()
            let d = playerRef.current.getDuration()

            switch (key) {
                case "k":
                case " ":
                    e.preventDefault()
                    setState(o => ({ ...o, playing: !o.playing }))
                    break
                case "<":
                    e.preventDefault()
                    setState(o => ({
                        ...o,
                        playbackRate: Math.max(0, o.playbackRate - 0.25),
                    }))
                    break
                case ">":
                    e.preventDefault()
                    setState(o => ({
                        ...o,
                        playbackRate: Math.min(2, o.playbackRate + 0.25),
                    }))
                    break
                case "ArrowLeft":
                case "j":
                    e.preventDefault()
                    playerRef.current?.seekTo(Math.max(0, (c - 10) / d))
                    break
                case "ArrowRight":
                case "l":
                    e.preventDefault()
                    playerRef.current?.seekTo(Math.min(1, (c + 10) / d))
                    break
                case "m":
                    e.preventDefault()
                    setState(o => ({ ...o, muted: !o.muted }))
                    break
                case "ArrowDown":
                    e.preventDefault()
                    setState(o => ({
                        ...o,
                        volume: Math.max(0, o.volume - 0.1),
                    }))
                    break
                case "ArrowUp":
                    e.preventDefault()
                    setState(o => ({
                        ...o,
                        volume: Math.min(1, o.volume + 0.1),
                    }))
                    break
                case "f":
                    e.preventDefault()
                    if (document.fullscreenElement == null)
                        document
                            .getElementById("videoContainer")
                            ?.requestFullscreen()
                    else document.exitFullscreen()
                    break
                case "t":
                    e.preventDefault()
                    if (state.mode != MODES.THEATRE)
                        setState(old => ({ ...old, mode: MODES.THEATRE }))
                    else setState(old => ({ ...old, mode: MODES.NORMAL }))
                    break
                case "i":
                    e.preventDefault()
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

    const togglePlay = () => setState(o => ({ ...o, playing: !o.playing }))
    const toggleFullScreen = () => {
        if (document.fullscreenElement == null)
            document.getElementById("videoContainer")?.requestFullscreen()
        else document.exitFullscreen()
    }

    return (
        <div
            ref={containerRef}
            id="videoContainer"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onKeyDown={keyboardShortcutHandlers}
            tabIndex={0}
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
                                    src: t.src,
                                    srcLang: t.srcLang || "undefined",
                                    kind: t.kind,
                                    label: t.label || "undefined",
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
                    onEnded={onEnded}
                    onDuration={setDuration}
                    /* EventHanlder */
                    onClick={togglePlay}
                    onDoubleClick={toggleFullScreen}
                />
            )}

            {skipState.state != "off" && (
                <SkipOverlay
                    state={skipState}
                    seek={playerRef.current?.seekTo}
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
