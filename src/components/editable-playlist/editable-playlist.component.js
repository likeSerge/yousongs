import React, { Component } from 'react';
import { AddTrackFormContainer } from './../../containers/add-track-form.container';
import { PlayerContainer } from './../../containers/player.container';
import { PlaylistContainer } from './../../containers/playlist.container';
import './editable-playlist.css';

export class EditablePlaylist extends Component {
    render() {
        return (
            <div className="editable-playlist">
                editable-playlist
                <PlayerContainer/>
                <AddTrackFormContainer/>
                <PlaylistContainer/>
            </div>
        );
    }
}

