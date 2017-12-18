import { playOrPauseVideo, seekVideoToSeconds } from '../services/yt-player.service';
import { isSelectedSongPlaying } from './selectedSong.reducer';

const togglePlaySongAction = (videoId, playingStatus, lastActionPlayTime) => ({
    type: 'SELECTED_SONG/TOGGLE_PLAY',
    payload: {
        id: videoId,
        isPlaying: playingStatus,
        lastActionPlayTime: lastActionPlayTime
    }
});

const loadSongAction = (videoId) => ({
    type: 'SELECTED_SONG/LOAD',
    payload: {
        id: videoId,
        isPlaying: false,
        lastActionPlayTime: 0
    }
});

const seekToAction = (videoId, secondsToSeek) => ({
    type: 'SELECTED_SONG/SEEK',
    payload: {
        id: videoId,
        lastActionPlayTime: secondsToSeek
    }
});

/**
 * Keep subscriptions for ytPlayer observables in closure for unsubscribing
 * No need to unsubscribe from ytPlayerOnReady$ because it take(1)
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
            ytPlayerReadyEvent.target.playVideo();
            dispatch(loadSongAction(videoId));
        }
    );
    onStateChangeSubscription = ytPlayerStateChange$.subscribe((ytPlayerStateChangeEvent) => {
        const lastActionPlayTime = ytPlayerStateChangeEvent.target.getCurrentTime();
        const playerState = ytPlayerStateChangeEvent.target.getPlayerState();
        if (playerState === window.YT.PlayerState.PLAYING) {
            dispatch(togglePlaySongAction(videoId, true, lastActionPlayTime));
        } else if (isSelectedSongPlaying(getState())) {
            dispatch(togglePlaySongAction(videoId, false, lastActionPlayTime));
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