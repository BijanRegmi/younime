"use client"

import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import useHasWindow from "@/lib/hooks/useHasWindow"
import useShowOnMouseMove from "@/lib/hooks/useShowOnMouseMove"
import Controls from "./Controls"
import layout from "@/styles/index.module.css"
import { OnProgressProps } from "react-player/base"

export enum MODES {
	FULLSCREEN,
	THEATRE,
	MINI,
	NORMAL,
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
}

const VideoPlayer = ({ url }: { url: string }) => {
	const hasWindow = useHasWindow()
	const { show, setShow, cleartimeout, onMouseMove } = useShowOnMouseMove<HTMLDivElement>()

	const [state, setState] = useState<VideoState>({
		mode: MODES.NORMAL,
		playing: false,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		volume: 1,
	})

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
			className={`${layout.videoplayer} ${layout[state.mode]}`}
		>
			{hasWindow && (
				<ReactPlayer
					url={url}
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

			{show && (
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
