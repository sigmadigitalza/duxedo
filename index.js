(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.duxedo = {}));
}(this, function (exports) { 'use strict';

  // Assign each item in the array given, as the key and value in an
  // immutable object.
  var generateActions = (list = []) =>
    Object.freeze(Object.assign(...list.map(key => ({ [key]: key }))));

  // convert Action strings such as 'ACTION_DEFINED' to camelcase which will
  // be used as the Action Creator function name.
  const camelCaseAction = action =>
    action
      .toLowerCase()
      .trim()
      .split(/[.\-_\s]/g)
      .reduce((str, word) => str + word[0].toUpperCase() + word.slice(1));

  // Create a default FSA compliant actionCreator function that accepts
  // an Object payload, a meta object, and an error.
  const defaultAction = type => (
    payload = {},
    meta = {},
    error = false,
  ) => ({ type, payload, meta, error });

  // Assign each item in the array given, as the camelCased key for an action
  // creator with the same type.
  var generateActionCreators = (list = []) =>
    Object.freeze(
      Object.assign(
        ...list.map(key => ({ [camelCaseAction(key)]: defaultAction(key) })),
      ),
    );

  // Return a reducer function, using the command pattern,
  // that can be passed to redux
  var generateReducer = ({ definition = {}, defaultState = {} }) => {
    const obj = {
      ...definition,
      __run(previousState = defaultState, action = {}) {

        // return the previous state if this action doesn't exist
        if (!this[action.type]) {
          return previousState;
        }

        // run the function, to update state
        return this[action.type](previousState, action);
      },
    };

    return function reducer(previousState = defaultState, action) {
      return obj.__run(previousState, action);
    };
  };

  var index = ({ definition = {}, defaultState = {}, options = {} }) => {
    const keys = Object.keys(definition);

    return {
      constants: generateActions(keys),
      actions: generateActionCreators(keys),
      reducer: generateReducer({ definition, defaultState }),
    };
  };

  exports.default = index;
  exports.generateActions = generateActions;
  exports.generateActionCreators = generateActionCreators;
  exports.generateReducer = generateReducer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
