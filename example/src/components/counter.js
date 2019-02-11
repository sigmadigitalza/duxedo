import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { actions } from '../store/definitions/counter';

export const Counter = ({ count, inc, dec, set, reset }) => (
  <div>
    <h1>Duxedo Counter: {count}</h1>
    <button type="button" onClick={inc}>
      Add one
    </button>
    <button type="button" onClick={dec}>
      Remove one
    </button>
    <button type="button" onClick={set}>
      Set to 42
    </button>
    <button type="button" onClick={reset}>
      Reset to Zero
    </button>
  </div>
);

const mapStateToProps = state => ({ count: state.counter.count });
const mapDispatchToProps = dispatch => ({
  inc: () => dispatch(actions.increment()),
  dec: () => dispatch(actions.decrement()),
  set: () => dispatch(actions.set({ count: 42 })),
  reset: () => dispatch(actions.reset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
