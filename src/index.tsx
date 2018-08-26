import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure as configureMobX } from 'mobx';

import { App } from './app.component';

import './styles.scss';

// enable mobX strict
configureMobX({
  enforceActions: true,
});

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);
