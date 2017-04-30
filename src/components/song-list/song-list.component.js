import React, { Component } from 'react';
import logo from './images/logo.svg';
import './song-list.css';

export class SongList extends Component {
    render() {
        return (
            <div className="song-list">
                <img src={logo} alt="LOGOGO"/>
                SWIFTYY
            </div>
        );
    }
}

export default SongList;
