import * as React from 'react';
import { tempDependencyManager } from '../temp-dependency-manager';
import { IPlaylistStore } from '../types';
import './addition-form.scss';

export class AdditionForm extends React.Component {
  private readonly playlistStore: IPlaylistStore;
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props:{}) {
    super(props);

    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.addTrack = this.addTrack.bind(this);
  }

  render() {
    return (
      <div className="addition-form">
        <form>
          <label
            className="addition-form__title"
            htmlFor="track"
          >
            Link to youtube video:
          </label>
          <input
            className="addition-form__input"
            type="text"
            name="track"
            ref={this.inputRef}
          />
          <button onClick={this.addTrack}>ADD TRACK</button>
        </form>
      </div>
    );
  }

  private addTrack(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.playlistStore.addTrack(this.inputRef.current!.value);
    this.inputRef.current!.value = '';
  }
}
