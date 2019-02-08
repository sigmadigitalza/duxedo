import { createStore, combineReducers } from 'redux';
import reduxGen from '../index';

const defaultState = { count: 0 };

// test input data
const definition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

// this would usually be your default export from a single file for this part of the store.
const { constants, actions, reducer } = reduxGen({ definition, defaultState });

// include it just like any normal reducer
const store = () => createStore(combineReducers(reducer));

// constants for define actions
console.log(constants);
