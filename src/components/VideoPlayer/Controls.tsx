"use client"
import TheaterTall from "@/assets/videoplayer/theater-tall.svg"
import TheaterWide from "@/assets/videoplayer/theater-wide.svg"

import {
    BsFillPlayFill as Play,
    BsPause as Pause,
    BsPip as MiniPlayer,
    BsFullscreen as FullScreenOpen,
    BsFullscreenExit as FullScreenClose,
    BsSliders2 as Quality,
    BsSpeedometer2 as PlayBackSpeed,
} from "react-icons/bs"
import { MdOutlineLanguage, MdClosedCaptionOff } from "react-icons/md"
import { AiOutlineVideoCamera, AiOutlinePlayCircle } from "react-icons/ai"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"

import { durationFormatter } from "@/lib/helpers"
import { MODES, VideoState } from "./"
import {
    CSSProperties,
    Dispatch,
    MouseEvent,
    RefObject,
    SetStateAction,
    useState,
} from "react"
import ReactPlayer from "react-player"
import { Settings } from "./Settings"
import VolumeController from "./VolumeController"
import Link from "next/link"

const PLAYBACK_RATES = [
    "0.25",
    "0.5",
    "0.75",
    "Normal",
    "1.25",
    "1.5",
    "1.75",
    "2",
]

const Controls = ({
    hovering,
    state,
    setState,
    playerRef,
}: {
    hovering: boolean
    state: VideoState
    setState: Dispatch<SetStateAction<VideoState>>
    playerRef: RefObject<ReactPlayer>
}) => {
    // TOGGLE PLAY/PAUSE
    const togglePlay = () => {
        setState(old => ({ ...old, playing: !old.playing }))
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
    const [showSettings, setShowSettings] = useState<boolean>(false)
    const closeSettings = () => setShowSettings(false)
    const toggleSettings = () => setShowSettings(o => !o)

    const seek = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        /* @ts-expect-error Types ;-; */
        const rec = e.target.getBoundingClientRect()
        const pos =
            Math.min(Math.max(0, e.clientX - rec.x), rec.width) / rec.width
        playerRef.current?.seekTo(pos)
    }

    const playbackSetter = (idx: number) => {
        setState(old => ({ ...old, playbackRate: (idx + 1) * 0.25 }))
    }

    const languageSetter = (idx: number) => {
        let subdub = Object.keys(state.resources)[idx] as "sub" | "dub"

        let srcIdx = (state.resources[subdub]?.source.length || 0) - 1
        let qualityIdx =
            (state.resources[subdub]?.source[srcIdx]?.qualities.length || 0) - 1

        localStorage.setItem("subdub", subdub)

        setState(o => ({
            ...o,
            subdub,
            srcIdx: Math.min(o.srcIdx, srcIdx),
            qualityIdx: Math.min(o.qualityIdx, qualityIdx),
            trackIdx:
                state.resources[subdub]?.tracks?.findIndex(
                    t => t.default == true
                ) || -1,
        }))
    }

    const sourceSetter = (idx: number) => {
        let srcIdx = Math.min(
            idx,
            state.resources[state.subdub]?.source.length || -1
        )
        let qualityIdx =
            (state.resources[state.subdub]?.source[srcIdx]?.qualities.length ||
                0) - 1

        setState(o => ({
            ...o,
            srcIdx,
            qualityIdx: Math.min(o.qualityIdx, qualityIdx),
        }))
    }

    const qualitySetter = (idx: number) => {
        let qualityIdx = Math.min(
            idx,
            (state.resources[state.subdub]?.source[state.srcIdx]?.qualities
                .length || 0) - 1
        )

        setState(o => ({
            ...o,
            qualityIdx,
        }))
    }

    const trackSetter = (idx: number) => {
        let tracks = playerRef.current?.getInternalPlayer().textTracks

        for (let i = 0; i < tracks?.length; i++) {
            tracks[i].mode = "disabled"
            if (i == idx - 1) {
                localStorage.setItem("track", tracks[i].label.toLowerCase())
                tracks[i].mode = "showing"
            }
        }
        setState(o => ({
            ...o,
            trackIdx: idx,
        }))
    }

    const autoPlaySetter = (idx: number) => {
        localStorage.setItem("autoplay", idx.toString())
        setState(o => ({ ...o, autoPlay: idx }))
    }

    const styles = {
        "--loaded-percent": `${state.loaded * 100}%`,
        "--played-percent": `${state.played * 100}%`,
    }

    if (!hovering && !showSettings && state.playing) return <></>

    return (
        <div
            style={styles as CSSProperties}
            className="absolute bottom-0 left-0 right-0 top-[calc(100%-4rem)] w-full text-accent-900 z-10 transition-all"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                onClick={seek}
                className="w-full h-4 flex items-center cursor-pointer relative"
            >
                <div
                    style={{
                        height: hover ? "20%" : "15%",
                    }}
                    className={
                        "w-full cursor-pointer relative bg-accent-800 bg-opacity-30 mt-auto " +
                        "after:content-[''] after:bg-red-900 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-[calc(100%-var(--played-percent))] " +
                        "before:content-[''] before:bg-accent-300 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-[calc(100%-var(--loaded-percent))]"
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
            <div className="flex gap-2 p-1 flex-row items-center bg-black bg-opacity-50 h-full">
                {state.prev != "" && (
                    <Link href={state.prev}>
                        <BiSkipPrevious className="controlBtn" />
                    </Link>
                )}
                {state.playing ? (
                    <Pause onClick={togglePlay} className="controlBtn" />
                ) : (
                    <Play onClick={togglePlay} className="controlBtn" />
                )}
                {state.next != "" && (
                    <Link href={state.next}>
                        <BiSkipNext className="controlBtn" />
                    </Link>
                )}
                <VolumeController state={state} setState={setState} />

                <div className="flex items-center gap-[0.1rem] flex-grow">
                    <div>
                        {durationFormatter(state.played * state.duration || 0)}
                    </div>
                    /<div>{durationFormatter(state.duration || 0)}</div>
                </div>

                <Settings
                    state={showSettings}
                    toggle={toggleSettings}
                    close={closeSettings}
                    options={[
                        {
                            title: "Playback Speed",
                            Icon: PlayBackSpeed,
                            options: PLAYBACK_RATES,
                            selected: state.playbackRate / 0.25 - 1,
                            setter: playbackSetter,
                        },
                        {
                            title: "Language",
                            Icon: MdOutlineLanguage,
                            options: Object.keys(state.resources),
                            selected: Object.keys(state.resources).indexOf(
                                state.subdub
                            ),
                            setter: languageSetter,
                        },
                        {
                            title: "Source",
                            Icon: AiOutlineVideoCamera,
                            options:
                                state.resources[state.subdub]?.source.map(
                                    (_, idx) => `Source ${idx + 1}`
                                ) || [],
                            selected: state.srcIdx,
                            setter: sourceSetter,
                        },
                        {
                            title: "Quality",
                            Icon: Quality,
                            options:
                                state.resources[state.subdub]?.source[
                                    state.srcIdx
                                ]?.qualities.map(s => s.name) || [],
                            selected: state.qualityIdx,
                            setter: qualitySetter,
                        },
                        {
                            title: "Captions",
                            Icon: MdClosedCaptionOff,
                            options: [
                                "Off",
                                ...(state.resources[state.subdub]?.tracks.map(
                                    t => t.label || "undefined"
                                ) || []),
                            ],
                            selected: state.trackIdx,
                            setter: trackSetter,
                        },
                        {
                            title: "AutoPlay",
                            Icon: AiOutlinePlayCircle,
                            options: ["Off", "On"],
                            selected: state.autoPlay,
                            setter: autoPlaySetter,
                        },
                    ]}
                />

                <MiniPlayer className="controlBtn" onClick={onMiniPlayer} />
                {state.mode == MODES.THEATRE ? (
                    <TheaterWide className="controlBtn" onClick={onTheatre} />
                ) : (
                    <TheaterTall className="controlBtn" onClick={onTheatre} />
                )}
                {state.mode == MODES.FULLSCREEN ? (
                    <FullScreenClose
                        className="controlBtn p-2"
                        onClick={onFullScreen}
                    />
                ) : (
                    <FullScreenOpen
                        className="controlBtn p-2"
                        onClick={onFullScreen}
                    />
                )}
            </div>
        </div>
    )
}

export default Controls
