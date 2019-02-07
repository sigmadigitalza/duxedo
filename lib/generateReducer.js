// Return a reducer function, using the command pattern,
// that can be passed to redux
export default ({ definition = {}, defaultState = {} }) => {
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

  return function reducer(previousState, action) {
    return obj.__run(previousState, action);
  };
};
