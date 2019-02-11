import duxedo from '../../../../index';

const defaultState = { count: 0 };

// test input data
const definition = {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET: (state, { payload }) => ({ ...state, count: payload.count }),
  RESET: state => ({ ...state, count: 0 }),
};

export const { reducer, actions, constants } = duxedo({
  definition,
  defaultState,
});

// export { reducer, actions, constants };
