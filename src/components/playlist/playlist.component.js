import React from 'react';
import { PlaylistItem } from '../playlist-item/playlist-item.component';
import './playlist.css';

export const Playlist = ({playlist, selectedSong, togglePlaySong}) => (
    <div className="playlist">
        playlist
        {playlist.map((video) =>
            <PlaylistItem
                key={video.uuid}
                title={video.title}
                isLoaded={selectedSong.id === video.id}
                isPlaying={
                    selectedSong.id === video.id && selectedSong.isPlaying
                }
                onClickPlay={() => togglePlaySong(video.id)}
            />
        )}
    </div>
);
