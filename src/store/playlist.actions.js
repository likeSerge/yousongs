import { v4 } from 'node-uuid';
import { initialLoadedPlaylistItemState } from './selectedSong.reducer';
import { getVideoInfo } from '../services/yt-player.service';
import { saveState } from '../services/local-storage.service';

/**
 * Thunk action creator, dispatches add item on YT player ready
 * @param {string} videoId
 * @returns {Function}
 */
export const addPlaylistItem = (videoId) => (dispatch, getState) => {
    const {ytPlayerOnReady$} = getVideoInfo(videoId);
    ytPlayerOnReady$.subscribe((ytPlayerReadyEvent) => {
        const {video_id, title} = ytPlayerReadyEvent.target.getVideoData();
        dispatch({
            type: "PLAYLIST/ADD_ITEM",
            payload: {
                uuid: v4(),
                id: video_id,
                title: title
            }
        });
        // Save state excepts selected song
        saveState({...getState(), selectedSong: initialLoadedPlaylistItemState});
    });
};
