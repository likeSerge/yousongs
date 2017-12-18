export const playlist = (state = {}, action) => {
    switch (action.type) {
        case 'PLAYLIST/REMOVE_ITEM':
            if (!state[action.payload.id]) {
                console.info(`Remove video fails, no id#
                    ${action.payload.id} in playlist`);
                return state;
            }
            const nextState = {...state};
            delete nextState[action.payload.id];
            return nextState;
        case 'PLAYLIST/ADD_ITEM':
            const {id, title, duration} = action.payload;
            return {
                ...state,
                [id]: {title, duration}
            };
        default:
            return state;
    }
};