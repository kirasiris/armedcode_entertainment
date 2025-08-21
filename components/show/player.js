"use client";

import { useState, useEffect } from "react";

const Player = ({ object = {} }) => {
	const players = {
		native: object?.data?.players?.native,
		mega: object?.data?.players?.mega,
		streamwish: object?.data?.players?.streamwish,
		yourupload: object?.data?.players?.yourupload,
		okru: object?.data?.players?.okru,
		maru: object?.data?.players?.maru,
		netu: object?.data?.players?.netu,
		stape: object?.data?.players?.stape,
	};

	const buttons = [
		{ id: "native", label: "Native", className: "btn-secondary" },
		{ id: "mega", label: "Mega", className: "btn-danger" },
		{ id: "streamwish", label: "Streamwish", className: "btn-primary" },
		{ id: "yourupload", label: "YourUpload", className: "btn-success" },
		{ id: "okru", label: "Okru", className: "btn-orange" },
		{ id: "maru", label: "Maru", className: "btn-purple" },
		{ id: "netu", label: "Netu", className: "btn-pink" },
		{ id: "stape", label: "Stape", className: "btn-light-purple" },
	];

	// Utility to check if a player URL is valid
	const isValidPlayer = (url) => {
		return url && url.trim() !== "" && url.trim() !== "#";
	};

	const [playerActive, setPlayerActive] = useState(null);

	useEffect(() => {
		// Prefer Native if valid, otherwise pick first available
		const preferred = isValidPlayer(players.native)
			? "native"
			: Object.keys(players).find((key) => isValidPlayer(players[key]));
		setPlayerActive(preferred || null);
	}, [object]);

	return (
		<div className="border-0 rounded-0 p-0 mb-3">
			<div className="container">
				<a href="#!" className="btn btn-light btn-sm me-1">
					Players
				</a>
				<div className="btn-group my-3">
					{buttons
						.filter((btn) => isValidPlayer(players[btn.id]))
						.map((btn) => (
							<button
								key={btn.id}
								onClick={() => setPlayerActive(btn.id)}
								className={`btn ${btn.className} btn-sm ${
									playerActive === btn.id ? "active" : ""
								}`}
							>
								{btn.label}
							</button>
						))}
				</div>
				<div className="ratio ratio-16x9">
					{playerActive && isValidPlayer(players[playerActive]) ? (
						playerActive === "native" ? (
							<video
								key={playerActive}
								src={players[playerActive]}
								controls
								className="w-100 h-100"
							>
								Your browser does not support the video tag.
							</video>
						) : (
							<iframe
								key={playerActive}
								src={players[playerActive]}
								title={object?.data?.title}
								allowFullScreen
							/>
						)
					) : (
						<p className="text-center">No players available</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Player;
