"use client";
import Link from "next/link";
import { useAudioPlayer } from "@/context/audioplayercontext";

const Single = ({ object = {}, objects = [], index = 0 }) => {
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
		<li
			className={`list-group-item ${object?.orderingNumber} bg-dark text-bg-dark`}
		>
			<div className="float-start">
				<button
					className={`btn btn-${
						isCurrentSong && isPlaying ? "danger" : "orange"
					} btn-sm me-1`}
					onClick={
						isCurrentSong && isPlaying ? togglePlayPause : handlePlaySong
					}
				>
					{isCurrentSong && isPlaying ? (
						<i aria-hidden className="fa-solid fa-pause" />
					) : (
						<i aria-hidden className="fa-solid fa-play" />
					)}
				</button>
				<Link
					href={{
						pathname: `/albums/song/${object?._id}/read`,
						query: {},
					}}
				>
					<span className="badge bg-secondary me-1">
						{object?.orderingNumber}
					</span>
					{object?.title}
				</Link>
			</div>
			<div className="float-end">
				<div className="blog-item__panel">
					<span className="badge bg-info me-1">{object.duration}</span>
					<span className="badge bg-secondary me-1">
						Average&nbsp;rating&nbsp;{object.averageRating}
					</span>
				</div>
			</div>
		</li>
	);
};

export default Single;
