"use client";

import { useState, useRef, useEffect } from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";
import { useAudioPlayer } from "@/context/audioplayercontext";

const LocalSongPlayer = ({ object }) => {
	const {
		currentSong,
		isPlaying,
		currentTime,
		duration,
		volume,
		audioRef: globalAudioRef,
		playSong,
		togglePlayPause,
		setVolume,
		dispatch,
	} = useAudioPlayer();

	const localAudioRef = useRef(null);
	const [localIsPlaying, setLocalIsPlaying] = useState(false);
	const [localCurrentTime, setLocalCurrentTime] = useState(0);
	const [localDuration, setLocalDuration] = useState(0);
	const [localVolume, setLocalVolume] = useState(1);
	const [originalGlobalVolume, setOriginalGlobalVolume] = useState(null);

	// Check if this is the same song as the global player
	const isSameSong = currentSong?._id === object?._id;

	useEffect(() => {
		if (isSameSong && globalAudioRef.current) {
			// Store original volume if not already stored
			if (originalGlobalVolume === null) {
				setOriginalGlobalVolume(volume);
			}
			// Mute global player when local player is active
			globalAudioRef.current.volume = 0;
		} else if (
			!isSameSong &&
			originalGlobalVolume !== null &&
			globalAudioRef.current
		) {
			// Restore original volume when switching to different song
			globalAudioRef.current.volume = originalGlobalVolume;
			setOriginalGlobalVolume(null);
		}

		// Cleanup: restore volume when component unmounts
		return () => {
			if (originalGlobalVolume !== null && globalAudioRef.current) {
				globalAudioRef.current.volume = originalGlobalVolume;
			}
		};
	}, [isSameSong, volume, originalGlobalVolume, globalAudioRef]);

	useEffect(() => {
		if (localAudioRef.current) {
			const audio = localAudioRef.current;

			const handleTimeUpdate = () => {
				const time = audio.currentTime;
				setLocalCurrentTime(time);

				if (isSameSong) {
					dispatch({ type: "SET_CURRENT_TIME", payload: time });
				}
			};

			const handleLoadedMetadata = () => {
				setLocalDuration(audio.duration);
				if (isSameSong) {
					dispatch({ type: "SET_DURATION", payload: audio.duration });
				}
			};

			const handlePlay = () => {
				setLocalIsPlaying(true);
				if (!isSameSong && globalAudioRef.current) {
					globalAudioRef.current.pause();
				}
			};

			const handlePause = () => {
				setLocalIsPlaying(false);
			};

			audio.addEventListener("timeupdate", handleTimeUpdate);
			audio.addEventListener("loadedmetadata", handleLoadedMetadata);
			audio.addEventListener("play", handlePlay);
			audio.addEventListener("pause", handlePause);

			return () => {
				audio.removeEventListener("timeupdate", handleTimeUpdate);
				audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
				audio.removeEventListener("play", handlePlay);
				audio.removeEventListener("pause", handlePause);
			};
		}
	}, [isSameSong, dispatch, globalAudioRef]);

	useEffect(() => {
		if (isSameSong && localAudioRef.current && globalAudioRef.current) {
			const globalAudio = globalAudioRef.current;
			const localAudio = localAudioRef.current;

			// Sync time
			if (Math.abs(localAudio.currentTime - currentTime) > 1) {
				localAudio.currentTime = currentTime;
			}

			// Sync play/pause state
			if (isPlaying && localAudio.paused) {
				localAudio.play();
			} else if (!isPlaying && !localAudio.paused) {
				localAudio.pause();
			}

			setLocalIsPlaying(isPlaying);
			setLocalCurrentTime(currentTime);
			setLocalDuration(duration);
		}
	}, [isSameSong, isPlaying, currentTime, duration, globalAudioRef]);

	const handlePlayPause = () => {
		if (localAudioRef.current) {
			if (isSameSong) {
				togglePlayPause();
			} else {
				if (localIsPlaying) {
					localAudioRef.current.pause();
				} else {
					// Pause global player first
					if (globalAudioRef.current) {
						globalAudioRef.current.pause();
					}
					playSong(song, [song], 0);
					localAudioRef.current.play();
				}
			}
		}
	};

	const handleSeek = (e) => {
		const audio = isSameSong ? globalAudioRef.current : localAudioRef.current;
		if (audio) {
			const rect = e.currentTarget.getBoundingClientRect();
			const percent = (e.clientX - rect.left) / rect.width;
			const newTime = percent * (isSameSong ? duration : localDuration);
			audio.currentTime = newTime;
		}
	};

	const handleVolumeChange = (e) => {
		const newVolume = Number.parseFloat(e.target.value);
		setLocalVolume(newVolume);

		if (isSameSong) {
			setVolume(newVolume);
			if (localAudioRef.current) {
				localAudioRef.current.volume = newVolume;
			}
		} else if (localAudioRef.current) {
			localAudioRef.current.volume = newVolume;
		}
	};

	const formatTime = (time) => {
		if (!time) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const currentDisplayTime = isSameSong ? currentTime : localCurrentTime;
	const currentDisplayDuration = isSameSong ? duration : localDuration;
	const currentDisplayPlaying = isSameSong ? isPlaying : localIsPlaying;
	const currentDisplayVolume = isSameSong ? volume : localVolume;

	return (
		<div className="card bg-orange text-bg-dark my-3">
			<div className="card-body">
				<h5 className="text-light mb-3">Song Player</h5>
				<audio
					ref={localAudioRef}
					src={object?.files?.audio_url?.location?.secure_location}
					preload="metadata"
				/>
				<div className="d-flex align-items-center gap-3 mb-3">
					<Button
						variant={currentDisplayPlaying ? "danger" : "orange"}
						onClick={handlePlayPause}
						size="lg"
					>
						{currentDisplayPlaying ? (
							<i className="fa-solid fa-pause" aria-hidden />
						) : (
							<i className="fa-solid fa-play" aria-hidden />
						)}
					</Button>
					<div className="flex-grow-1">
						<div className="d-flex justify-content-between text-light small mb-1">
							<span>{formatTime(currentDisplayTime)}</span>
							<span>{formatTime(currentDisplayDuration)}</span>
						</div>
						<ProgressBar
							now={(currentDisplayTime / currentDisplayDuration) * 100}
							style={{ height: "8px", cursor: "pointer" }}
							onClick={handleSeek}
							className="bg-secondary"
							variant="danger"
						/>
					</div>
				</div>
				<div className="d-flex align-items-center gap-2">
					<span className="small">
						<i className="fa-solid fa-volume-high" aria-hidden />
					</span>
					<input
						type="range"
						min="0"
						max="1"
						step="0.1"
						value={currentDisplayVolume}
						onChange={handleVolumeChange}
						className="form-range flex-grow-1"
						style={{ maxWidth: "150px" }}
					/>
				</div>

				{isSameSong && (
					<div className="mt-2">
						<small>
							🎵 Synced with global player (audio from local player)
						</small>
					</div>
				)}
			</div>
		</div>
	);
};

export default LocalSongPlayer;
