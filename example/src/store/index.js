import { createStore, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as counter } from './definitions/counter';

export default () =>
  createStore(combineReducers({ counter }), composeWithDevTools());
