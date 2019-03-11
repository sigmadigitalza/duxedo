import duxedo from '../src/index';

// test input data
const defaultState = { count: 0 };
const definition = {
  CAMEL_CASE: state => ({ ...state, count: 0 }),
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

test('returns the constants, actions, and reducer', () => {
  const { constants, actions, reducer } = duxedo({
    definition,
    defaultState,
  });

  expect(constants).toEqual({
    CAMEL_CASE: 'CAMEL_CASE',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET: 'SET',
    RESET: 'RESET',
  });

  const actionKeys = Object.keys(actions);
  expect(actionKeys).toEqual([
    'camelCase',
    'increment',
    'decrement',
    'set',
    'reset',
  ]);

  Object.values(actions).map((action, index) => {
    const result = action();
    expect(result).toEqual({
      payload: {},
      meta: {},
      error: false,
      type: Object.values(constants)[index],
    });
  });

  expect(reducer).toBeInstanceOf(Function);

  const s = defaultState;
  const r = reducer;

  expect(r(s, { type: 'INCREMENT' })).toEqual({ count: 1 });
  expect(r(s, { type: 'DECREMENT' })).toEqual({ count: -1 });
  expect(r(s, { type: 'SET', payload: { count: 42 } })).toEqual({ count: 42 });
  expect(r({ count: 42 }, { type: 'RESET' })).toEqual({ count: 0 });
});
