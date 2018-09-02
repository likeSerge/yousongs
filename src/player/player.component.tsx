import * as React from 'react';

import { Controls } from './controls/controls.component';
import { AdditionForm } from './addition-form/addtion-form.component';
import { Playlist } from './playlist/playlist.component';
import { TrackName } from './track-name/track-name.component';

import './player.scss';

export class Player extends React.Component {
  render() {
    return (
      <div className="player">
        <div className="player__selected-track">
          <TrackName/>
        </div>
        <div className="player__controls">
          <Controls/>
        </div>
        <div className="player__addition-form">
          <AdditionForm/>
        </div>
        <div className="player__playlist">
          <Playlist/>
        </div>
      </div>
    );
  }
}
