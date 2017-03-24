import 'react-hot-loader/patch';
import React from 'react'
import ReactDOM from 'react-dom';
import './assets/style/comm.scss'
import Home from './pages/home.jsx'
import { AppContainer } from 'react-hot-loader';
const Render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};
Render(
    Home
);
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./pages/home', () => {
    Render(Home)
  });
}