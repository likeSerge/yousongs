import { observer } from 'mobx-react';
import * as React from 'react';

import { throttle } from '../../utils';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore } from '../types';
import './controls.scss';

@observer
export class Controls extends React.Component {
  private readonly playlistStore: IPlaylistStore;
  private readonly playerStore: IPlayerStore;
  private readonly throttledSetVolume: (volume: number) => void;
  private readonly throttledSeekToPosition: (positionSeconds: number) => void;
  private volumeInput: HTMLInputElement | null;
  private positionInput: HTMLInputElement | null;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerStore = tempDependencyManager.getPlayerStore();
    this.throttledSetVolume = throttle(
      this.playerStore.setVolume,
      200,
      { leading: true },
    );
    this.throttledSeekToPosition = throttle(
      this.playerStore.seekToPosition,
      150,
      { leading: true },
    );
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.playlistStore.toggleShuffle}>
          SHUFFLE
        </button>
        {this.playlistStore.isShuffled && 1}
        <button onClick={() => {
          this.playlistStore.selectedTrack &&
          this.playerStore.prev(this.playlistStore.selectedTrack.id);
        }}>
          PREVIOUS
        </button>
        <button onClick={() => {
          this.playlistStore.selectedTrack &&
          this.playerStore.play(this.playlistStore.selectedTrack.id);
        }}>
          PLAY
        </button>
        <button onClick={() => {
          this.playlistStore.selectedTrack &&
          this.playerStore.pause(this.playlistStore.selectedTrack.id);
        }}>
          PAUSE
        </button>
        <button onClick={() => {
          this.playlistStore.selectedTrack &&
          this.playerStore.next(this.playlistStore.selectedTrack.id);
        }}>
          NEXT
        </button>
        <div className="controls__volume">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={String(this.playerStore.volumePercent)}
            ref={volumeInput => this.volumeInput = volumeInput}
            onChange={this.onVolumeChange}
          />
        </div>
        <div className="controls__volume">
          <input
            type="range"
            min="0"
            max="100"
            value={this.playerStore.positionPercent}
            ref={positionInput => this.positionInput = positionInput}
            onChange={this.onPositionChange}
          />
        </div>
      </div>
    );
  }

  private onVolumeChange = (): void => {
    this.throttledSetVolume(Number(this.volumeInput!.value));
  }

  private onPositionChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.throttledSeekToPosition(Number(e.currentTarget.value));
  }

}
