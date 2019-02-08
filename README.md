# SigmaDigital Redux Helpers
A tiny set of utilities to reduce redux boilerplate, and help your write cleaner code.

## What does it do?
Take a single object definition of actions and how state changes, and produce an object containing  **immutable action constants**, an object containing **consistent action creators** and a **reducer function** that can be included easily in your store configuration.

## Motivation
Managing state with redux requires quite a bit of boilerplate code, especially when you begin to use consistent patterns for action creators for example, you end up repeating yourself a great deal. Secondly as your app grows, recalling which actions do what, and how becomes a hunt through growing switch statements, and  multiple files. Not to mention that this growing API for your local application state, can increase the time it takes to on-board new team members.

* DRY<span><sup>>TM</sup></span> out your code by defining actions, action creators and reducers with a single definition.
* Consistency through a predefined opinionated structure, and single reliable pattern for action objects
* Improve Readability and Maintainability by clearly defining actions and how state should change in a single place.


# How

```js
import { createStore, combineReducers } from 'redux';
import reduxGen from '@sigmadigital/redux-helpers';

const defaultState = { count: 0 };

// test input data
const definition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

// this would usually be your default export from a single file for this part of the store.
export const { constants, actions, reducer } = reduxGen({ definition, defaultState });
```
