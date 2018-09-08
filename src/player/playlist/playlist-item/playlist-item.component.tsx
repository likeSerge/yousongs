import * as React from 'react';
import { observer } from 'mobx-react';
import { tempDependencyManager } from '../../temp-dependency-manager';
import { IPlayerStore, IPlaylistStore, ITrack } from '../../types';
import './playlist-item.scss';

export interface PlaylistItemProps {
  track: ITrack;
}

@observer
export class PlaylistItem extends React.Component<PlaylistItemProps> {
  private playlistStore: IPlaylistStore;
  private playerStore: IPlayerStore;

  constructor(props: PlaylistItemProps) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerStore = tempDependencyManager.getPlayerStore();
  }

  render() {
    const { track } = this.props;
    return (
      <div
        className={`playlist-item ${this.addClassForSelectedTrack(track)}`}
      >
        <img
          className="playlist-item__play-icon"
          src={this.props.track.thumbnail}
          onClick={this.playTrack}
        />
        <div className="playlist-item__name">
          {track.name}
        </div>
        <img
          className="playlist-item__remove-icon"
          src={require('./images/icon-remove.png')}
          onClick={this.removeTrack}
        />
      </div>
    );
  }

  private addClassForSelectedTrack(track: ITrack): string {
    return this.playlistStore.selectedTrack &&
      this.playlistStore.selectedTrack.id === track.id
        ? 'playlist-item_selected'
        : '';
  }

  private playTrack = (): void => {
    this.playerStore.play(this.props.track.id);
  }

  private removeTrack = (): void => {
    this.playlistStore.removeTrack(this.props.track.id);
  }
}
