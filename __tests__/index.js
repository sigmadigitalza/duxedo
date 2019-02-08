import reduxGen from '../index';

// test input data
const defaultState = { count: 0 };
const inputDefinition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

test('returns the constants, actions, and reducer', () => {
  const { constants, actions, reducer } = reduxGen(
    inputDefinition,
    defaultState,
  );

  expect(constants).toEqual({
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET: 'SET',
    RESET: 'RESET',
  });

  expect(Object.keys(actions)).toEqual([
    'increment',
    'decrement',
    'set',
    'reset',
  ]);

  expect(reducer).toBeInstanceOf(Function);

  const s = defaultState;
  const r = reducer;

  expect(r(s, { type: 'INCREMENT' })).toEqual({ count: 1 });
  expect(r(s, { type: 'DECREMENT' })).toEqual({ count: -1 });
  expect(r(s, { type: 'SET', payload: { count: 42 } })).toEqual({ count: 42 });
  expect(r({ count: 42 }, { type: 'RESET' })).toEqual({ count: 0 });
});
