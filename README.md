# SigmaDigital Redux Helpers
A tiny set of utilities to reduce redux boilerplate, and help your write cleaner code.

## What does it do?
Take a single object definition of actions and how state changes, and produce an object containing  **immutable action constants**, an object containing **consistent action creators** and a **reducer function** that can be included easily in your store configuration.

## Motivation
Managing state with redux requires quite a bit of boilerplate code, especially when you begin to use consistent patterns for action creators for example, you end up repeating yourself a great deal. Secondly as your app grows, recalling which actions do what, and how becomes a hunt through growing switch statements, and  multiple files. Not to mention that this growing API for your local application state, can increase the time it takes to on-board new team members.

* DRY<span><sup>>TM</sup></span> out your code by defining actions, action creators and reducers with a single definition.
* Consistency through a predefined opinionated structure, and single reliable pattern for action objects
* Improve Readability and Maintainability by clearly defining actions and how state should change in a single place.


# Enough Talk, Lets Code 

```js
// src/store/lib/counter.js
import reduxGen from '@sigmadigital/redux-helpers';

const defaultState = { count: 0 };

// test input data
const definition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

// this exports an object containing reducer, constants, actions
export default  reduxGen({ definition, defaultState });

// src/store/configure.js
import { createStore, combineReducers } from 'redux';
import { reducer } from './lib/counter'

export default  () => createStore(combineReducers(reducer));
```
the `reduxGen` function, takes the definition as above, and the default state, that you would usually pass to your reducer function. it redturns an object:

```js
{
  reducer, // function to be passes to the store
  actions, // object containing action creator functions, the action names have been transformed to camelCase
  constants, // the actions in original case, as an object 
}
```

Have a look at the expample folder, the tests, and sourcecode for more.
