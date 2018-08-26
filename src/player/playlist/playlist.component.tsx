import * as React from 'react';
import { observer } from 'mobx-react';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore } from '../types';
import './playlist.scss';

@observer
export class Playlist extends React.Component {
  private playlistStore: IPlaylistStore;
  private playerStore: IPlayerStore;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerStore = tempDependencyManager.getPlayerStore();
  }

  render() {
    return (
      <div className="playlist">
        {
          [...this.playlistStore.playlist.values()].map(track => (
            <div
              key={track.id}
              className="playlist__item"
            >
              <button onClick={() => { this.playTrack(track.id); }}>
                PLAY
              </button>
              <button onClick={() => { this.playerStore.pause(track.id); }}>
                PAUSE
              </button>
              <span>
                {track.name}
              </span>
              <button onClick={() => { this.playlistStore.removeTrack(track.id); }}>
                REMOVE
              </button>
            </div>
          ))
        }
      </div>
    );
  }

  private playTrack(id: string): void {
    this.playerStore.play(id);
  }
}
