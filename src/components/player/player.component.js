import React from 'react';
import { DurationInfo } from './duration-info/duration-info.component'
import { NavigationBar } from './navigation-bar/navigation-bar.component'
import './player.css';

export const Player = (props) => {
    const {id, isPlaying, duration, currentPlayTime} = props.selectedSongData;
    const {togglePlaySong, seekToSeconds} = props;
    return (
        <div className="player">
            <div className="player__main-controls">
                <button disabled={!id}>Prev</button>
                <button
                    onClick={() => togglePlaySong(id)}
                    disabled={!id}
                >
                    {isPlaying && 'Pause'}
                    {!isPlaying && 'Play'}
                </button>
                <button disabled={!id}>Next</button>
                <div className="player__duration">
                    <DurationInfo
                        currentPlayTime={currentPlayTime}
                        duration={duration}
                        isPlaying={isPlaying}
                    />
                </div>
            </div>
            <div className="player__navigation">
                <NavigationBar
                    id={id}
                    duration={duration}
                    currentPlayTime={currentPlayTime}
                    isPlaying={isPlaying}
                    seekToSeconds={seekToSeconds}
                />
            </div>
        </div>
    );
};
