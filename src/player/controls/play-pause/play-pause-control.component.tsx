import { observer } from 'mobx-react';
import * as React from 'react';

import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore, PlayerState } from '../../types';
import './play-pause-control.scss';

@observer
export class PlayPauseControl extends React.Component {
  private readonly playlistStore: IPlaylistStore;
  private readonly playerStore: IPlayerStore;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerStore = tempDependencyManager.getPlayerStore();

  }

  render() {
    const { state } = this.playerStore;
    const { selectedTrack } = this.playlistStore;
    const icon = state === PlayerState.Playing || state === PlayerState.Buffering
      ? require('./images/icon-pause.png')
      : require('./images/icon-play.png');

    return (
      <div className="play-pause-control">
        {
          selectedTrack &&
          <img
            src={selectedTrack.thumbnail}
            className="play-pause-control__thumbnail"
          />
        }
        <img
          className="play-pause-control__icon"
          src={icon}
          onClick={this.togglePlay}
        />
      </div>
    );
  }

  private togglePlay = (): void => {
    if (!this.playlistStore.selectedTrack) {
      return;
    }
    this.playerStore.state === PlayerState.Playing
      ? this.playerStore.pause(this.playlistStore.selectedTrack.id)
      : this.playerStore.play(this.playlistStore.selectedTrack.id);
  }
}
