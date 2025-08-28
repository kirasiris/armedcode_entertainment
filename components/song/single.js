"use client";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/shows/loading";
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
		<Suspense fallback={<Loading />}>
			<article
				key={object._id}
				className={`col-xl-3 col-lg-4 col-md-6 col-12 mb-3 ${object._id}`}
			>
				<div className="card bg-orange text-bg-dark">
					<div>
						<span
							className="badge position-absolute text-bg-light text-capitalize"
							style={{
								top: "5px",
								left: "5px",
							}}
						>
							{object.onairtype}
						</span>
						<span
							className="badge position-absolute text-bg-light text-capitalize"
							style={{
								top: "5px",
								right: "5px",
							}}
						>
							{object.onairstatus}
						</span>
						<Image
							src={object.files?.avatar.location.secure_location}
							className="card-img-top"
							alt="..."
							width={356}
							height={192}
							style={{
								objectFit: "cover",
							}}
						/>
					</div>
					<div className="card-body">
						<Link
							href={{
								pathname: `/songs/${object?._id}/read`,
								query: {},
							}}
						>
							<h5>{object.title}</h5>
						</Link>
						<p className="card-text">{object?.sub_title}</p>
					</div>
					<div className="card-footer">
						<button
							className={`btn btn-${
								isCurrentSong && isPlaying ? "danger" : "orange"
							} btn-sm w-100`}
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
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
