import generateReducer from '../src/lib/generateReducer';

// test input data
const defaultState = { count: 0 };
const definition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

test('create a reducer function', () => {
  const r = generateReducer({ definition });
  expect(r).toBeInstanceOf(Function);
});

test('reducer function can known handle actions', () => {
  const r = generateReducer({ definition });
  const s = defaultState;

  expect(r(s, { type: 'INCREMENT' })).toEqual({ count: 1 });
  expect(r(s, { type: 'DECREMENT' })).toEqual({ count: -1 });
  expect(r(s, { type: 'SET', payload: { count: 42 } })).toEqual({ count: 42 });
  expect(r({ count: 42 }, { type: 'RESET' })).toEqual({ count: 0 });
});

test('reducer function can handle unknown actions', () => {
  const r = generateReducer({ definition });
  expect(r({ count: 42 }, { type: 'UNKNOWN' })).toEqual({ count: 42 });
});
