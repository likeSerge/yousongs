import * as React from 'react';

import './controls.scss';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore } from '../types';

export class Controls extends React.Component {
  private playlistStore: IPlaylistStore;
  private playerStore: IPlayerStore;
  private volumeInput: HTMLInputElement;
  private positionInput: HTMLInputElement;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerStore = tempDependencyManager.getPlayerStore();
    this.onVolumeClick = this.onVolumeClick.bind(this);
    this.onPositionClick = this.onPositionClick.bind(this);
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.playlistStore.toggleShuffle}>
          SHUFFLE
        </button>
        <button onClick={this.playlistStore.getPrev}>
          PREVIOUS
        </button>
        <button onClick={() => { this.playerStore.play(this.playlistStore.selectedTrack); }}>
          PLAY
        </button>
        <button onClick={() => { this.playerStore.pause(this.playlistStore.selectedTrack); }}>
          PAUSE
        </button>
        <button onClick={this.playlistStore.getNext}>
          NEXT
        </button>
        <div className="controls__volume">
          <input type="number" ref={volumeInput => this.volumeInput = volumeInput} />
          <button onClick={this.onVolumeClick}>VOLUME</button>
        </div>
        <div className="controls__volume">
          <input type="number" ref={positionInput => this.positionInput = positionInput} />
          <button onClick={this.onPositionClick}>POSITION</button>
        </div>
      </div>
    );
  }

  private onVolumeClick(e: React.SyntheticEvent<HTMLButtonElement>): void {
    e.preventDefault();
    this.playlistStore.setVolume(Number(this.volumeInput.value));
  }

  private onPositionClick(e: React.SyntheticEvent<HTMLButtonElement>): void {
    e.preventDefault();
    this.playerStore.seekToPosition('todo', Number(this.positionInput.value));
  }
}
