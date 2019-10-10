import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createEpicMiddleware} from 'redux-observable';

import * as serviceWorker from './serviceWorker';

import configureStore from './3_store/configureStore';
import { rootEpic } from './3_store/epics';

import './index.css';

import App from './App';

const epicMiddleware = createEpicMiddleware();

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [
  epicMiddleware,
];

// console.log('ENVIRONMENT = ', process.env.NODE_ENV);
if (process.env.NODE_ENV === `development`) {
  const reduxLogger = require('redux-logger');
  const logger = reduxLogger.createLogger({
    collapsed: true,
  });
  middlewares.push(logger);
}
const store = configureStore(middlewares);

epicMiddleware.run(rootEpic);

ReactDOM.hydrate((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
