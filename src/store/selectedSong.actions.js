import { playOrPauseVideo } from '../services/yt-player.service';
import { isSelectedSongPlaying } from './selectedSong.reducer';

const toggleplaySongAction = (videoId, playingStatus) => ({
    type: 'SELECTED_SONG/TOGGLE_PLAY',
    payload: {
        id: videoId,
        isPlaying: playingStatus
    }
});

const loadSongAction = (videoId) => ({
    type: 'SELECTED_SONG/LOAD',
    payload: {
        id: videoId,
        isPlaying: false
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
    ytPlayerOnReady$.subscribe((ytPlayerReadyEvent) => {
        ytPlayerReadyEvent.target.playVideo();
        dispatch(loadSongAction(videoId));
    });
    onStateChangeSubscription = ytPlayerStateChange$.subscribe((ytPlayerStateChangeEvent) => {
        const playerState = ytPlayerStateChangeEvent.target.getPlayerState();
        if (playerState === window.YT.PlayerState.PLAYING) {
            dispatch(toggleplaySongAction(videoId, true));
        } else if (isSelectedSongPlaying(getState())) {
            dispatch(toggleplaySongAction(videoId, false));
        }
    });
};