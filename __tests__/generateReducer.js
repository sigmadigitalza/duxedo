import generateReducer from '../lib/generateReducer';

const defaultState = { count: 0 };

// test input data
const inputDefinition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

test('create a reducer function', () => {
  const reducer = generateReducer({ definition: inputDefinition });

  // must be a reducer function
  expect(reducer).toBeInstanceOf(Function);

  // test each function
  expect(reducer(defaultState, { type: 'INCREMENT' })).toEqual({ count: 1 });
  expect(reducer(defaultState, { type: 'DECREMENT' })).toEqual({
    count: -1,
  });
  expect(
    reducer(defaultState, { type: 'SET', payload: { count: 42 } }),
  ).toEqual({ count: 42 });
  expect(reducer({ count: 42 }, { type: 'RESET' })).toEqual({ count: 0 });
});

// test('transforms a array of actions into an object', () => {
//   const { constants, actions, reducer } = generateReducer(inputDefinition);
//
//   expect(constants).toEqual({
//     INCREMENT: 'INCREMENT',
//     DECREMENT: 'DECREMENT',
//     SET: 'SET',
//     RESET: 'RESET',
//   });
//
//   expect(actions).toEqual({
//     increment: ({ payload }) =>({ type: 'INCREMENT', payload }),
//     decrement: ({ payload }) =>({ type: 'DECREMENT', payload }),
//     set: ({ payload }) =>({ type: 'SET', payload }),
//     reset: ({ payload }) =>({ type: 'RESET', payload }),
//   });
//
//   expect(reducer).toEqual({});
// });
