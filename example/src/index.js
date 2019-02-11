import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import ConnectedCounter from './components/counter';
import configureStore from './store';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  );
};

render(<App />, document.getElementById('app'));
