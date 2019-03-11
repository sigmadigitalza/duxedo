// convert Action strings such as 'ACTION_DEFINED' to camelcase which will
// be used as the Action Creator function name.
export const camelCaseAction = action =>
  action
    .toLowerCase()
    .trim()
    .split(/[.\-_\s]/g)
    .reduce((str, word) => str + word[0].toUpperCase() + word.slice(1));

// Create a default FSA compliant actionCreator function that accepts
// an Object payload, a meta object, and an error.
export const defaultAction = type => (
  payload = {},
  meta = {},
  error = false,
) => ({ type, payload, meta, error });

// Assign each item in the array given, as the cameCased key for an action
// creator with the same type.
export default (list = []) =>
  Object.freeze(
    Object.assign(
      ...list.map(key => ({ [camelCaseAction(key)]: defaultAction(key) })),
    ),
  );
