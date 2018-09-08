import * as React from 'react';
import { observer } from 'mobx-react';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlaylistStore } from '../types';
import { PlaylistItem } from './playlist-item/playlist-item.component';

import './playlist.scss';

@observer
export class Playlist extends React.Component {
  private playlistStore: IPlaylistStore;

  constructor(props: {}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
  }

  render() {
    return (
      <div className="playlist">
        {
          [...this.playlistStore.playlist.values()].map(track => (
            <PlaylistItem key={track.id} track={track}/>
          ))
        }
      </div>
    );
  }

}
