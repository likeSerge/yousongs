import * as React from 'react';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlaylistStore } from '../types';
import './addition-form.scss';
// TODO: create ref

export class AdditionForm extends React.Component {
  private readonly playlistStore: IPlaylistStore;
  private input: HTMLInputElement | null;

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
    this.playlistStore.addTrack(this.input!.value);
    this.input!.value = '';
  }
}
