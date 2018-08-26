import * as React from 'react';

import { Player } from './player/player.component';

import './app.scss';

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="app__player-wrapper">
          <Player/>
        </div>
      </div>
    );
  }
}
