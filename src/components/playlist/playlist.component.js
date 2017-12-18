import React from 'react';
import { PlaylistItem } from './playlist-item/playlist-item.component';
import './playlist.css';

export const Playlist = ({playlist, selectedSong, togglePlaySong, removePlaylistItem}) => (
    <div className="playlist">
        playlist
        {Object.keys(playlist).map((videoId) =>
            <PlaylistItem
                key={videoId}
                title={playlist[videoId].title}
                isLoaded={selectedSong.id === videoId}
                isPlaying={
                    selectedSong.id === videoId && selectedSong.isPlaying
                }
                onClickPlay={() => togglePlaySong(videoId)}
                onClickRemove={() => removePlaylistItem(videoId)}
            />
        )}
    </div>
);
