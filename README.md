# Duxedo for Redux
A tiny, easy to use utility to help you write cleaner code, and scale redux easily.

## What does it do?
Take a single object definition of actions and how state changes, and produce an object containing  **immutable action constants**, an object containing **consistent FSA compliant action creators** and a **reducer function** that can be included easily in your store configuration, or components, just the way you would usually. No extra fuss.

## Motivation
Managing state with redux requires quite a bit of boilerplate code, especially when you begin to use consistent patterns for action creators for example, you end up repeating yourself a great deal. Secondly as your app grows, recalling which actions do what, and how becomes a hunt through growing switch statements, and  multiple files. Not to mention that this growing API for your local application state, can increase the time it takes to on-board new team members, along with increasing support, maintenance, and iteration time.

* DRY<span><sup>>TM</sup></span> out your code by defining actions, action creators and reducers with a single definition.
* Consistency through a predefined opinionated structure, and single reliable pattern for action objects. ([FSA](https://github.com/redux-utilities/flux-standard-action) compliant)
* Improve Readability and Maintainability by clearly defining actions and how state should change in a single place.


# Enough Talk, Lets Code 
install with npm:
```sh
npm install --save @sigmadigital/duxedo
```
or with yarn:
```sh
yarn add @sigmadigital/duxedo
```

Add your dependencies if you haven't already:

```js
npm install --save react redux react-dom react-redux
```

**NB**: You'll likely need a build pipeline (ie: webpack, parcel or rollup etc) with babel to transpile es6/es7+.. 

```js
// src/store/definitions/counter.js
import duxedo from "@sigmadigital/duxedo";

// define your default state
const defaultState = { count: 0 };

// Define your actions and how state should change
const definition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

// this exports an object containing reducer, constants, actions
export const { reducer, actions, constants } = duxedo({
  definition,
  defaultState,
});

// src/store/index.js
import { createStore, combineReducers } from 'redux';
import { reducer as counter } from './definitions/counter';

export default () => createStore(combineReducers({ counter }));

```
the `duxedo` function takes the definition as above, and the default state, that you would usually pass to your reducer function and returns an object:

```js
{
  reducer, // function to be passes to the store
  actions, // object containing action creator functions, note that the action names have been transformed to **camelCase**
  constants, // the actions in original case, as an object 
}
```

Have a look at the `/example` directory for a full example with redux and react. Alternatively, have a look at the [example app](https://zz2yvwmmy4.codesandbox.io/) or fork the sandbox here:

[![Edit Duxedo for Redux](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zz2yvwmmy4)


## Collaboration
If you find an **issue**, have an **idea** or would like to contribute, either let us know in the issues, or fork our repo, and open a **pull request**. If you do, please ensure **all tests are passing**, and that any new items have coverage as well.

----
A **Sigma Digital** Project. Copyright 2019. License **MIT**.
