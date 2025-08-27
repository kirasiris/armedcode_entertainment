"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ProgressBar } from "react-bootstrap";
import { useAudioPlayer } from "@/context/audioplayercontext";
import Image from "next/image";

const GlobalAudioPlayer = () => {
	const {
		currentSong,
		isPlaying,
		currentTime,
		duration,
		volume,
		audioRef,
		togglePlayPause,
		nextSong,
		previousSong,
		setVolume,
		dispatch,
	} = useAudioPlayer();

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => {
			dispatch({ type: "SET_CURRENT_TIME", payload: audio.currentTime });
		};

		const handleLoadedMetadata = () => {
			dispatch({ type: "SET_DURATION", payload: audio.duration });
		};

		const handleEnded = () => {
			dispatch({ type: "SET_PLAYING", payload: false });
			nextSong();
		};

		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [audioRef, dispatch, nextSong]);

	useEffect(() => {
		if (currentSong && audioRef.current) {
			audioRef.current.src =
				currentSong?.files?.audio_url?.location?.secure_location;
			if (isPlaying) {
				audioRef.current.play();
			}
		}
	}, [currentSong, audioRef]);

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [isPlaying, audioRef]);

	const formatTime = (time) => {
		if (isNaN(time)) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const handleSeek = (e) => {
		const progressBar = e.currentTarget;
		const clickX = e.nativeEvent.offsetX;
		const width = progressBar.offsetWidth;
		const newTime = (clickX / width) * duration;

		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
			dispatch({ type: "SET_CURRENT_TIME", payload: newTime });
		}
	};

	if (!currentSong) return null;

	return (
		<div
			className="global-player"
			style={{
				position: "fixed",
				bottom: "0px",
				width: "100%",
				backgroundColor: "#fff",
				borderTop: "1px solid red",
				padding: "20px",
			}}
		>
			<audio ref={audioRef} />
			<div className="container-fluid">
				<div className="row align-items-center">
					<div className="col-md-3">
						<div className="d-flex align-items-center">
							<Image
								src={
									currentSong.files?.avatar?.location?.secure_location ||
									"/placeholder.svg?height=50&width=50&query=music"
								}
								alt={currentSong.title}
								className="me-3"
								width={50}
								height={50}
								style={{
									objectFit: "cover",
									borderRadius: "4px",
								}}
							/>
							<div>
								<div
									className="text-light-custom fw-bold"
									style={{ fontSize: "0.9rem" }}
								>
									<Link
										href={{
											pathname: `/songs/${currentSong?._id}/${currentSong?.slug}`,
											query: {},
										}}
									>
										{currentSong.title}
									</Link>
								</div>
								<div className="text-muted" style={{ fontSize: "0.8rem" }}>
									{currentSong.user?.name}
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="text-center">
							<div className="mb-2">
								<button
									className="btn btn-outline-light btn-sm me-2"
									onClick={previousSong}
								>
									⏮
								</button>
								<button
									className="btn btn-light btn-sm me-2"
									onClick={togglePlayPause}
								>
									{isPlaying ? "⏸" : "▶"}
								</button>
								<button
									className="btn btn-outline-light btn-sm"
									onClick={nextSong}
								>
									⏭
								</button>
							</div>

							<div className="d-flex align-items-center">
								<span
									className="text-muted me-2"
									style={{ fontSize: "0.8rem" }}
								>
									{formatTime(currentTime)}
								</span>
								<div
									className="flex-grow-1 bg-secondary"
									style={{
										height: "8px",
										borderRadius: "0.375rem",
										cursor: "pointer",
									}}
									onClick={handleSeek}
								>
									<ProgressBar
										now={(currentTime / duration) * 100}
										style={{
											height: "8px",
											cursor: "pointer",
											width: `${
												duration ? (currentTime / duration) * 100 : 0
											}%`,
											borderRadius: "0.375rem",
										}}
										className="bg-primary"
									/>
								</div>
								<span
									className="text-muted ms-2"
									style={{ fontSize: "0.8rem" }}
								>
									{formatTime(duration)}
								</span>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="d-flex align-items-center justify-content-end">
							<span className="text-muted me-2" style={{ fontSize: "0.8rem" }}>
								🔊
							</span>
							<input
								type="range"
								min="0"
								max="1"
								step="0.1"
								value={volume}
								onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
								className="form-range"
								style={{ width: "100px" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GlobalAudioPlayer;
