import { initialLoadedPlaylistItemState } from './selectedSong.reducer';
import { togglePlaySong } from './selectedSong.actions';
import { getVideoInfoPlayerStream } from '../services/yt-player.service';
import { saveState } from '../services/local-storage.service';

/**
 * @private action creator, used by addPlaylistItem thunk
 * @param {string} id
 * @param {string} title
 * @param {string} duration
 */
const addPlaylistItemAction = (id, title, duration) => (
    {
        type: 'PLAYLIST/ADD_ITEM',
        payload: {id, title, duration}
    }
);

/**
 * @param {string} videoId
 */
export const removePlaylistItem = (videoId) => (
    {
        type: 'PLAYLIST/REMOVE_ITEM',
        payload: {
            id: videoId
        }
    }
);

/**
 * Thunk action creator, dispatches add item on YT player ready
 * @param {string} videoId
 * @returns {Function}
 */
export const addPlaylistItem = (videoId) => (dispatch, getState) => {
    const {ytPlayerOnReady$} = getVideoInfoPlayerStream(videoId);
    ytPlayerOnReady$.subscribe((ytPlayerReadyEvent) => {
        // If videoId already exists in playlist, dont add it again but play
        if (!!getState().playlist[videoId]) {
            dispatch(togglePlaySong(videoId));
        } else {
            const {video_id, title} = ytPlayerReadyEvent.target.getVideoData();
            const duration = ytPlayerReadyEvent.target.getDuration();
            dispatch(addPlaylistItemAction(video_id, title, duration));
            // Save state, excepts selected song
            saveState({...getState(), selectedSong: initialLoadedPlaylistItemState});
        }
    });
};
