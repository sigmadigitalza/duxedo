// Assign each item in the array given, as the key and value in an
// immutable object.
export default (list = []) =>
  Object.freeze(Object.assign(...list.map(key => ({ [key]: key }))));
