"use client";

import { useAudioPlayer } from "@/context/audioplayercontext";
import { toast } from "react-toastify";

const AlbumPlayButton = ({ objects }) => {
	const { playSong, currentSong, isPlaying } = useAudioPlayer();

	const isAlbumPlaying =
		objects?.some((song) => song._id === currentSong?._id) && isPlaying;

	const handlePlayAlbum = () => {
		if (objects?.length === 0 || objects === undefined) {
			toast.error("Not possible to play album", "bottom");
		}
		if (objects?.length > 0) playSong(objects[0], objects, 0);
	};

	return (
		<button
			className={`btn btn-${
				isAlbumPlaying ? "danger" : "orange"
			} btn-sm w-100 mb-3`}
			onClick={handlePlayAlbum}
			disabled={objects?.length === 0}
		>
			{isAlbumPlaying ? "Playing" : "Play"}
		</button>
	);
};

export default AlbumPlayButton;
