import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import {mockStore} from './mock-test/mock-store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Route exact={true} path="/" component={App}/>
      </BrowserRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
