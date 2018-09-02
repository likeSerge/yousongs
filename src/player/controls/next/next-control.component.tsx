import { observer } from 'mobx-react';
import * as React from 'react';

import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore, PlayerState } from '../../types';
import './next-control.scss';

@observer
export class NextControl extends React.Component {
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
        className="next-control"
        src={require('./images/icon-next.png')}
        onClick={this.onNext}
      />
    );
  }

  private onNext = (): void => {
    this.playlistStore.selectedTrack &&
    this.playerStore.next(this.playlistStore.selectedTrack.id);
  }
}
