import * as React from 'react';
import { observer } from 'mobx-react';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlaylistStore } from '../types';
import './selected-track.scss';

@observer
export class SelectedTrack extends React.Component {
  private readonly playlistStore: IPlaylistStore;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
  }

  render() {
    const { selectedTrack } = this.playlistStore;
    if (!selectedTrack) {
      return null;
    }

    return (
      <div className="selected-track">
        { selectedTrack.name }
      </div>
    );
  }
}
