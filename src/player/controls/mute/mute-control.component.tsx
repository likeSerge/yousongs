import * as React from 'react';
import { observer } from 'mobx-react';

import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore } from '../../types';

import './mute-control.scss';

@observer
export class MuteControl extends React.Component {
  private readonly playerStore: IPlayerStore;

  constructor(props: {}) {
    super(props);

    this.playerStore = tempDependencyManager.getPlayerStore();
  }

  render() {
    const muteIcon = this.playerStore.isMuted
      ? require('./images/icon-mute.png')
      : require('./images/icon-volume.png');
    return (
      <img
        className="mute-control"
        src={muteIcon}
        onClick={this.playerStore.toggleMute}
      />
    );
  }
}
