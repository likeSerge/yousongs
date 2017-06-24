export const playlist = (state = [], action) => {
    switch (action.type) {
        case 'PLAYLIST/ADD_ITEM':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};