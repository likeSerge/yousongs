import * as React from 'react';
import { observer } from 'mobx-react';

import { throttle } from '../../../utils';
import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore } from '../../types';

import './volume-control.scss';

@observer
export class VolumeControl extends React.Component {
  private readonly playerStore: IPlayerStore;
  private readonly throttledSetVolume: (volume: number) => void;
  private volumeInput: HTMLInputElement | null;

  constructor(props: {}) {
    super(props);

    this.playerStore = tempDependencyManager.getPlayerStore();
    this.throttledSetVolume = throttle(
      this.playerStore.setVolume,
      200,
      { leading: true },
    );
  }

  render() {
    return (
      <div className="volume-control">
        <input
          className="volume-control__input"
          type="range"
          value={String(this.playerStore.volumePercent)}
          ref={volumeInput => this.volumeInput = volumeInput}
          onChange={this.onVolumeChange}
        />
      </div>
    );
  }

  private onVolumeChange = (): void => {
    this.throttledSetVolume(Number(this.volumeInput!.value));
  }
}
