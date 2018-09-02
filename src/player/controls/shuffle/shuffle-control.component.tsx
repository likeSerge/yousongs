import * as React from 'react';
import { observer } from 'mobx-react';

import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlaylistStore } from '../../types';

import './shuffle-control.scss';

@observer
export class ShuffleControl extends React.Component {
  private readonly playlistStore: IPlaylistStore;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
  }

  render() {
    const volumeIcon = this.playlistStore.isShuffled
      ? require('./images/icon-shuffle-on.png')
      : require('./images/icon-shuffle.png');
    return (
      <img
        className="shuffle-control"
        src={volumeIcon}
        onClick={this.playlistStore.toggleShuffle}
      />
    );
  }
}
