"use client";
import { useAudioPlayer } from "@/context/audioplayercontext";
import Link from "next/link";

const Single = ({ object = {}, objects = [], index = 0 }) => {
	const { playSong, currentSong, isPlaying } = useAudioPlayer();

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
						isCurrentSong && isPlaying ? "primary" : "outline-light"
					} btn-sm me-1`}
					onClick={handlePlaySong}
				>
					{isCurrentSong && isPlaying ? "⏸" : "▶"}
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
