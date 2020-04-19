import React from 'react';
import { withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Header from '../components/Header';
import Routes from '../routes';

const App = () => {
  return <div className="full height">
    <Header name='Arjan Pogi' />
    <Routes />
  </div>
}

export default withRouter(App);
