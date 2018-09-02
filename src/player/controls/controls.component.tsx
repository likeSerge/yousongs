import * as React from 'react';

import { VolumePanel } from './volume-panel/volume-panel.component';
import { PlayPanel } from './play-panel/play-panel.component';
import { PositionControl } from './position/position-control.component';

import './controls.scss';

export class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <VolumePanel/>
        <PlayPanel/>
        <PositionControl/>
      </div>
    );
  }
}
