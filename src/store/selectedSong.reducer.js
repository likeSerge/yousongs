export const initialLoadedPlaylistItemState = {
    id: null,
    isPlaying: false
};

export const selectedSong = (state = initialLoadedPlaylistItemState, action) => {
    switch (action.type) {
        case 'SELECTED_SONG/TOGGLE_PLAY':
            return action.payload;
        case 'SELECTED_SONG/LOAD':
            return action.payload;
        default:
            return state;
    }
};

/**
 * Selector isPlaying
 * @param state
 * @return {boolean}
 */
export const isSelectedSongPlaying = (state) => state.selectedSong.isPlaying;
