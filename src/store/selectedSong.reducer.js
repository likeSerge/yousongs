export const initialLoadedPlaylistItemState = {
    id: false,
    nextId: false,
    prevId: false,
    isPlaying: false,
    lastActionPlayTime: 0
};

export const selectedSong = (state = initialLoadedPlaylistItemState, action) => {
    switch (action.type) {
        case 'SELECTED_SONG/TOGGLE_PLAY':
            return {...state, ...action.payload};
        case 'SELECTED_SONG/LOAD':
            return {...state, ...action.payload};
        case 'SELECTED_SONG/SEEK':
            return {...state, ...action.payload};
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

/**
 * Selector selectedSongData
 * @param state
 * @return null | {id, isPlaying, title, duration}
 */
export const selectedSongData = (state) => {
    const {id, nextId, prevId, isPlaying, lastActionPlayTime} = state.selectedSong;
    if (!id) {
        return {
            id: false,
            nextId: false,
            prevId: false,
            isPlaying: false,
            title: false,
            duration: NaN,
            currentPlayTime: 0
        };
    } else {
        return {
            id,
            nextId,
            prevId,
            isPlaying,
            title: state.playlist[id].title,
            duration: state.playlist[id].duration,
            currentPlayTime: lastActionPlayTime
        };
    }
};
