import { playOrPauseVideo, seekVideoToSeconds, getPrev, getNext } from '../services/yt-player.service';
import { isSelectedSongPlaying, selectedSongData } from './selectedSong.reducer';

const togglePlaySongAction = (videoId, playingStatus, lastActionPlayTime) => ({
    type: 'SELECTED_SONG/TOGGLE_PLAY',
    payload: {
        id: videoId,
        isPlaying: playingStatus,
        lastActionPlayTime: lastActionPlayTime
    }
});

const loadSongAction = (videoId, nextVideoId, prevVideoId) => ({
    type: 'SELECTED_SONG/LOAD',
    payload: {
        id: videoId,
        nextId: nextVideoId,
        prevId: prevVideoId,
        isPlaying: false,
        lastActionPlayTime: 0
    }
});

const seekToAction = (videoId, secondsToSeek) => ({
    type: 'SELECTED_SONG/SEEK',
    payload: {
        id: videoId,
        isPlaying: false, // Even if seek during playing, play event will be emitted by player
        lastActionPlayTime: secondsToSeek
    }
});

/**
 * Keep subscriptions for ytPlayer observables in closure for unsubscribing
 * No need to unsubscribe from ytPlayerOnReady$, because it take(1)
 */
let onStateChangeSubscription = {};

/**
 * @public
 * Thunked action creator on play/pause button click action
 * Loads video if needed and toggles play state
 * @param videoId
 */
export const togglePlaySong = (videoId) => (dispatch, getState) => {
    // Unsubscribe if prev subscriptions set
    onStateChangeSubscription.unsubscribe && onStateChangeSubscription.unsubscribe();

    const {ytPlayerOnReady$, ytPlayerStateChange$} = playOrPauseVideo(videoId);
    ytPlayerOnReady$.subscribe(
        (ytPlayerReadyEvent) => {
            const playlistKeys = Object.keys(getState().playlist);
            ytPlayerReadyEvent.target.playVideo();
            dispatch(loadSongAction(
                videoId,
                getNext(videoId, playlistKeys),
                getPrev(videoId, playlistKeys)
            ));
        }
    );
    onStateChangeSubscription = ytPlayerStateChange$.subscribe((ytPlayerStateChangeEvent) => {
        const lastActionPlayTime = ytPlayerStateChangeEvent.target.getCurrentTime();
        const playerState = ytPlayerStateChangeEvent.target.getPlayerState();
        if (playerState === window.YT.PlayerState.PLAYING) {
            dispatch(togglePlaySongAction(videoId, true, lastActionPlayTime));
        } else if (isSelectedSongPlaying(getState())) {
            dispatch(togglePlaySongAction(videoId, false, lastActionPlayTime));
            // Play next song if current finished
            const songData = selectedSongData(getState());
            if (Math.round(songData.duration) === Math.round(lastActionPlayTime)) {
                // TODO: is recursion good here?
                dispatch(togglePlaySong(songData.nextId));
            }
        }
    });
};

/**
 * Seek video to deseconds
 * @param {string} videoId
 * @param {number} seconds
 */
export const seekToSeconds = (videoId, seconds) => (dispatch, getState) => {
    dispatch(seekToAction(videoId, seconds));
    // Also action togglePlaySongAction will be dispatched inside 'onStateChangeSubscription'
    // in 'togglePlaySong' thunk action creator, after seekVideoToSeconds call
    seekVideoToSeconds(videoId, seconds);
};