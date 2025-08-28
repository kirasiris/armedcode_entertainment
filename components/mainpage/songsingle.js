"use client";
import { Suspense } from "react";
import Link from "next/link";
import Loading from "@/app/shows/loading";
import { useAudioPlayer } from "@/context/audioplayercontext";

const SongSingle = ({ object = {}, objects = [], index = 0 }) => {
	const { playSong, togglePlayPause, currentSong, isPlaying } =
		useAudioPlayer();

	const isCurrentSong = currentSong?._id === object?._id;

	const handlePlaySong = () => {
		playSong(object, objects, index);
	};

	const formatDuration = (duration) => {
		if (!duration || duration === "0:0") return "Unknown";
		return duration;
	};

	return (
		<Suspense fallback={<Loading />}>
			<article
				className={`song-item ${isCurrentSong && isPlaying ? "playing" : ""}`}
			>
				<li className="list-group-item bg-dark text-bg-dark">
					<div className="d-flex align-items-center">
						<div className="me-3">
							<button
								className={`btn btn-${
									isCurrentSong && isPlaying ? "danger" : "orange"
								} btn-sm`}
								onClick={
									isCurrentSong && isPlaying ? togglePlayPause : handlePlaySong
								}
							>
								{isCurrentSong && isPlaying ? (
									<i className="fa-solid fa-pause" aria-hidden />
								) : (
									<i className="fa-solid fa-play" aria-hidden />
								)}
							</button>
						</div>

						<div className="flex-grow-1">
							<div className="text-light">
								<Link
									href={{
										pathname: `/songs/${object._id}/read`,
										query: {},
									}}
								>
									{object.title}
								</Link>
							</div>
						</div>

						<div className="text-light small">
							{formatDuration(object.duration)}
						</div>
					</div>
				</li>
			</article>
		</Suspense>
	);
};

export default SongSingle;
