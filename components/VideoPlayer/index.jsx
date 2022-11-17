"use client"

import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import useHasWindow from "@/hooks/useHasWindow"
import useShowOnMouseMove from "@/hooks/useShowOnMouseMove"
import Controls from "./Controls"
import styles from "@/styles/videoplayer.module.css"

export const MODES = {
	FULLSCREEN: "fullscreen",
	THEATRE: "theatre",
	MINI: "mini",
	NORMAL: "",
}

const VideoPlayer = ({ url }) => {
	const hasWindow = useHasWindow()
	const { show, setShow, cleartimeout, onMouseMove } = useShowOnMouseMove()

	const [state, setState] = useState({
		mode: MODES.NORMAL,
		playing: false,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		volume: 1,
	})

	const playerRef = useRef(null)

	const onProgress = val => {
		setState(old => ({ ...old, played: val.played, loaded: val.loaded }))
	}

	const setDuration = duration => {
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
			className={`${styles.videoplayer} ${styles[state.mode]}`}
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
