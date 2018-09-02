import * as React from 'react';

import { VolumeControl } from '../volume/volume-control.component';
import { MuteControl } from '../mute/mute-control.component';
import { ShuffleControl } from '../shuffle/shuffle-control.component';

import './volume-panel.scss';

export class VolumePanel extends React.Component {
  render() {
    return (
      <div className="volume-panel">
        <div className="volume-panel__mute">
          <MuteControl/>
        </div>
        <div className="volume-panel__slider">
          <VolumeControl/>
        </div>
        <div className="volume-panel__shuffle">
          <ShuffleControl/>
        </div>
      </div>
    );
  }
}
