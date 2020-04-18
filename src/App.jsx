import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import createStore from './redux/createStore';
import Router from './route/router';

const { store, history } = createStore(createBrowserHistory());

function App() {
  return (
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  );
}

export default App;
