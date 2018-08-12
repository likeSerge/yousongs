import * as React from 'react';

import './addition-form.scss';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlaylistStore } from '../types';

export class AdditionForm extends React.Component {
  private readonly playlistStore: IPlaylistStore;
  private input: HTMLInputElement;

  constructor(props:{}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.addTrack = this.addTrack.bind(this);
  }

  render() {
    return (
      <div className="addition-form">
        <form>
          <input type="text" ref={input => this.input = input} />
          <button onClick={this.addTrack}>ADD TRACK</button>
        </form>
      </div>
    );
  }

  private addTrack(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.playlistStore.addTrack(this.input.value);
  }
}
