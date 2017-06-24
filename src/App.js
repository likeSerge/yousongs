import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { playlist } from './store/playlist.reducer';
import { selectedSong } from './store/selectedSong.reducer';

import { EditablePlaylist } from './components/editable-playlist/editable-playlist.component';
import { loadState } from './services/local-storage.service';

const savedPlaylistState = loadState(); // Load initial state from local storage

const store = createStore(
    combineReducers({
        playlist,
        selectedSong
    }),
    savedPlaylistState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

const App = () => (
    <Provider store={store}>
        <EditablePlaylist/>
    </Provider>
);

export default App;
