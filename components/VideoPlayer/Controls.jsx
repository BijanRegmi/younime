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

import styles from "@/styles/videoplayer.module.css"
import { durationFormatter } from "@/lib/helpers"
import { MODES } from "./"

const Controls = ({ state, setState, playerRef }) => {
	// TOGGLE PLAY/PAUSE
	const togglePlay = () => {
		setState(old => ({ ...old, playing: !old.playing }))
	}

	// TOGGLE VOLUME
	const toggleVolume = () => {
		setState(old => ({ ...old, muted: !old.muted }))
	}

	// CHANGE VOLUME
	const slideVolume = e => {
		setState(old => ({
			...old,
			volume: e.target.value,
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
			document.getElementById("videoContainer").requestFullscreen()
		} else {
			document.exitFullscreen()
		}
	}

	const seek = e => {
		const rec = e.target.getBoundingClientRect()
		const pos =
			Math.min(Math.max(0, e.clientX - rec.x), rec.width) / rec.width
		playerRef.current?.seekTo(pos)
	}

	const style = {
		"--played-percent": `${state.played * 100}%`,
		"--loaded-percent": `${state.loaded * 100}%`,
	}

	return (
		<div className={styles.controlsContainer}>
			<div
				onClick={seek}
				style={style}
				className={styles.timelineContainer}
			>
				<div className={styles.timeline}>
					<div className={styles.indicator}></div>
				</div>
			</div>
			<div className={styles.controls}>
				{state.playing ? (
					<Pause onClick={togglePlay} className={styles.controlBtn} />
				) : (
					<Play onClick={togglePlay} className={styles.controlBtn} />
				)}
				<div className={styles.volume}>
					{state.muted ? (
						<VolumeMute
							onClick={toggleVolume}
							className={`${styles.controlBtn} ${styles.volumeBtn}`}
						/>
					) : state.volume < 0.5 ? (
						<VolumeLow
							onClick={toggleVolume}
							className={`${styles.controlBtn} ${styles.volumeBtn}`}
						/>
					) : (
						<VolumeHigh
							onClick={toggleVolume}
							className={`${styles.controlBtn} ${styles.volumeBtn}`}
						/>
					)}
					<input
						className={styles.volumeSlider}
						type="range"
						min="0"
						max="1"
						step="any"
						value={state.volume}
						onInput={slideVolume}
					/>
				</div>
				<div className={styles.durationContainer}>
					<div className={styles.currentTime}>
						{durationFormatter(state.played * state.duration || 0)}
					</div>
					/
					<div className={styles.totalTime}>
						{durationFormatter(state.duration || 0)}
					</div>
				</div>
				<span
					className={`${styles.controlBtn} ${styles.playback}`}
					onClick={onRateChange}
				>
					{state.playbackRate}x
				</span>
				<MiniPlayer
					className={styles.controlBtn}
					onClick={onMiniPlayer}
				/>
				{state.mode == MODES.THEATRE ? (
					<TheaterWide
						onClick={onTheatre}
						className={styles.controlBtn}
					/>
				) : (
					<TheaterTall
						onClick={onTheatre}
						className={styles.controlBtn}
					/>
				)}
				{state.mode == MODES.FULLSCREEN ? (
					<FullScreenClose
						onClick={onFullScreen}
						className={styles.controlBtn}
					/>
				) : (
					<FullScreenOpen
						onClick={onFullScreen}
						className={styles.controlBtn}
					/>
				)}
			</div>
		</div>
	)
}

export default Controls
