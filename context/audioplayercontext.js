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
	isShuffled: false,
	isRepeating: false,
	originalPlaylist: [], // Store original order for shuffle toggle
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
		case "CLOSE_PLAYER":
			return {
				...initialState,
				volume: state.volume, // Keep volume setting
			};
		case "TOGGLE_SHUFFLE":
			if (
				!state.playlist ||
				!Array.isArray(state.playlist) ||
				state.playlist.length === 0
			) {
				return state; // Don't shuffle if no valid playlist
			}
			if (!action.payload) {
				// Turn off shuffle - restore original order
				return {
					...state,
					isShuffled: false,
					playlist:
						state.originalPlaylist && Array.isArray(state.originalPlaylist)
							? state.originalPlaylist
							: state.playlist,
					currentIndex:
						state.originalPlaylist && Array.isArray(state.originalPlaylist)
							? state.originalPlaylist.findIndex(
									(song) => song._id === state.currentSong?._id
							  )
							: state.currentIndex,
				};
			} else {
				// Turn on shuffle - randomize playlist
				const shuffled = [...state.playlist].sort(() => Math.random() - 0.5);
				return {
					...state,
					isShuffled: true,
					originalPlaylist: state.playlist,
					playlist: shuffled,
					currentIndex: shuffled.findIndex(
						(song) => song._id === state.currentSong?._id
					),
				};
			}
		case "TOGGLE_REPEAT":
			return { ...state, isRepeating: action.payload };
		case "NEXT_SONG":
			const nextIndex = state.currentIndex + 1;
			if (nextIndex < state.playlist.length) {
				return {
					...state,
					currentSong: state.playlist[nextIndex],
					currentIndex: nextIndex,
					isPlaying: true, // Auto-play the next song when moving to it
				};
			} else if (state.isRepeating && state.playlist.length > 0) {
				return {
					...state,
					currentSong: state.playlist[0],
					currentIndex: 0,
					isPlaying: true, // Auto-play when repeating playlist
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
			} else if (state.isRepeating && state.playlist.length > 0) {
				const lastIndex = state.playlist.length - 1;
				return {
					...state,
					currentSong: state.playlist[lastIndex],
					currentIndex: lastIndex,
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

	const closePlayer = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
		dispatch({ type: "CLOSE_PLAYER" });
	};

	const toggleShuffle = () => {
		const newShuffleState = !state.isShuffled;
		dispatch({ type: "TOGGLE_SHUFFLE", payload: newShuffleState });
	};

	const toggleRepeat = () => {
		const newRepeatState = !state.isRepeating;
		dispatch({ type: "TOGGLE_REPEAT", payload: newRepeatState });
	};

	const value = {
		...state,
		audioRef,
		playSong,
		togglePlayPause,
		nextSong,
		previousSong,
		setVolume,
		closePlayer,
		toggleShuffle,
		toggleRepeat,
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
