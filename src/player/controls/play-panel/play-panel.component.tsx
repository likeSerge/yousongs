import * as React from 'react';

import { PrevControl } from '../prev/prev-control.component';
import { PlayPauseControl } from '../play-pause/play-pause-control.component';
import { NextControl } from '../next/next-control.component';

import './play-panel.scss';

export class PlayPanel extends React.Component {
  render() {
    return (
      <div className="play-panel">
        <div className="play-panel__prev">
          <PrevControl/>
        </div>
        <div className="play-panel__play">
          <PlayPauseControl/>
        </div>
        <div className="play-panel__next">
          <NextControl/>
        </div>
      </div>
    );
  }
}
