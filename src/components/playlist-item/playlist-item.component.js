import React, { Component } from 'react';
import './playlist-item.css';

export class PlaylistItem extends Component {
    render() {
        const {title, onClickPlay, isLoaded, isPlaying} = this.props;
        const containerClassNames = `playlist-item 
            ${isLoaded ? 'playlist-item--loaded' : ''}`;
        return (
            <div className={containerClassNames}>
                <button onClick={onClickPlay}>
                    {isPlaying && 'Pause'}
                    {!isPlaying && 'Play'}
                </button>
                - {title}
            </div>
        );
    }
}
