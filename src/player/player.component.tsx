import * as React from 'react';

import { Controls } from './controls/controls.component';
import { AdditionForm } from './addition-form/addtion-form.component';
import { Playlist } from './playlist/playlist.component';

import './player.scss';
import { tempDependencyManager } from './temp-dependency-manager';

export class Player extends React.Component {
  render() {
    return (
      <div className="player">
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
