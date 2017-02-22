import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AppContainer from './containers/AppContainer.js';

import './index.css';

ReactDOM.render(
  <Router basename='/projects/FreeCodeCamp/fcc-recipe-app'>
      <Route component={AppContainer}/>
  </Router>,
  document.getElementById('root')
);
