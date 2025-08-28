"use client";

import {
	createContext,
	useContext,
	useReducer,
	useRef,
	useEffect,
} from "react";

const AudioPlayerContext = createContext();

const initialState = {
	currentSong: null,
	isPlaying: false,
	currentTime: 0,
	duration: 0,
	volume: 1,
	playlist: [],
	currentIndex: -1,
};

function audioPlayerReducer(state, action) {
	switch (action.type) {
		case "SET_CURRENT_SONG":
			return {
				...state,
				currentSong: action.payload.song,
				playlist: action.payload.playlist || state.playlist,
				currentIndex:
					action.payload.index !== undefined
						? action.payload.index
						: state.currentIndex,
			};
		case "SET_PLAYING":
			return { ...state, isPlaying: action.payload };
		case "SET_CURRENT_TIME":
			return { ...state, currentTime: action.payload };
		case "SET_DURATION":
			return { ...state, duration: action.payload };
		case "SET_VOLUME":
			return { ...state, volume: action.payload };
		case "NEXT_SONG":
			const nextIndex = state.currentIndex + 1;
			if (nextIndex < state.playlist.length) {
				return {
					...state,
					currentSong: state.playlist[nextIndex],
					currentIndex: nextIndex,
				};
			}
			return state;
		case "PREVIOUS_SONG":
			const prevIndex = state.currentIndex - 1;
			if (prevIndex >= 0) {
				return {
					...state,
					currentSong: state.playlist[prevIndex],
					currentIndex: prevIndex,
				};
			}
			return state;
		default:
			return state;
	}
}

export function AudioPlayerProvider({ children }) {
	const [state, dispatch] = useReducer(audioPlayerReducer, initialState);
	const audioRef = useRef(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = state.volume;
		}
	}, [state.volume]);

	const playSong = (song, playlist = [], index = -1) => {
		dispatch({
			type: "SET_CURRENT_SONG",
			payload: { song, playlist, index },
		});
		dispatch({ type: "SET_PLAYING", payload: true });
	};

	const closePlayer = () => {
		dispatch({ type: "SET_PLAYING", payload: false });
	};

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (state.isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			dispatch({ type: "SET_PLAYING", payload: !state.isPlaying });
		}
	};

	const nextSong = () => {
		dispatch({ type: "NEXT_SONG" });
	};

	const previousSong = () => {
		dispatch({ type: "PREVIOUS_SONG" });
	};

	const setVolume = (volume) => {
		dispatch({ type: "SET_VOLUME", payload: volume });
	};

	const value = {
		...state,
		audioRef,
		playSong,
		closePlayer,
		togglePlayPause,
		nextSong,
		previousSong,
		setVolume,
		dispatch,
	};

	return (
		<AudioPlayerContext.Provider value={value}>
			{children}
		</AudioPlayerContext.Provider>
	);
}

export function useAudioPlayer() {
	const context = useContext(AudioPlayerContext);
	if (!context) {
		throw new Error(
			"useAudioPlayer must be used within an AudioPlayerProvider"
		);
	}
	return context;
}
