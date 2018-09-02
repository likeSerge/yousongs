import { observer } from 'mobx-react';
import * as React from 'react';

import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore, PlayerState } from '../../types';
import './prev-control.scss';

@observer
export class PrevControl extends React.Component {
  private readonly playlistStore: IPlaylistStore;
  private readonly playerStore: IPlayerStore;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerStore = tempDependencyManager.getPlayerStore();
  }

  render() {
    return (
      <img
        className="prev-control"
        src={require('./images/icon-prev.png')}
        onClick={this.onPrev}
      />
    );
  }

  private onPrev = (): void => {
    this.playlistStore.selectedTrack &&
    this.playerStore.prev(this.playlistStore.selectedTrack.id);
  }
}
