"use client";

import { useAudioPlayer } from "@/context/audioplayercontext";

const AlbumPlayButton = ({ object, objects }) => {
	const { playSong, currentSong, isPlaying } = useAudioPlayer();

	const isAlbumPlaying =
		objects.some((song) => song._id === currentSong?._id) && isPlaying;

	const handlePlayAlbum = () => {
		if (objects.length > 0) {
			playSong(objects[0], objects, 0);
		}
	};

	return (
		<button
			className={`btn btn-${
				isAlbumPlaying ? "primary" : "secondary"
			} btn-sm w-100 mb-3`}
			onClick={handlePlayAlbum}
			disabled={objects.length === 0}
		>
			{isAlbumPlaying ? "⏸ Playing" : "▶ Play Album"}
		</button>
	);
};

export default AlbumPlayButton;
