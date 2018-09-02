import * as React from 'react';
import { observer } from 'mobx-react';

import { secondsToMinutesAndSeconds, throttle } from '../../../utils';
import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore } from '../../types';

import './position-control.scss';

// TODO: create ref
@observer
export class PositionControl extends React.Component {
  private readonly playerStore: IPlayerStore;
  private readonly playlistStore: IPlaylistStore;
  private readonly throttledSeekToPosition: (positionSeconds: number) => void;
  private positionInput: HTMLInputElement | null;

  constructor(props: {}) {
    super(props);

    this.playerStore = tempDependencyManager.getPlayerStore();
    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.throttledSeekToPosition = throttle(
      this.playerStore.seekToPosition,
      150,
      { leading: true },
    );
  }

  render() {
    if (!this.playlistStore.selectedTrack) {
      return null;
    }

    const { durationMs } = this.playlistStore.selectedTrack;
    const currentMs = durationMs * this.playerStore.positionPercent / 100;
    return (
      <div className="position-control">
        <div className="position-control__time">
          {secondsToMinutesAndSeconds(Math.round(currentMs / 1000))}
        </div>
        <input
          className="position-control__slider"
          type="range"
          value={this.playerStore.positionPercent}
          ref={positionInput => this.positionInput = positionInput}
          onChange={this.onPositionChange}
        />
        <div className="position-control__time">
          {secondsToMinutesAndSeconds(Math.round(durationMs / 1000))}
        </div>
      </div>
    );
  }

  private onPositionChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.throttledSeekToPosition(Number(e.currentTarget.value));
  }
}
