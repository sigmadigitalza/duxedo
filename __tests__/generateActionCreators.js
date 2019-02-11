import generateActionCreators, {
  camelCaseAction,
  defaultAction,
} from '../lib/generateActionCreators';

// test input and output data
const testActionns = ['TESTS_SETUP', 'TESTS_STARTED', 'TESTS_RUNNING'];
const camelCaseActions = ['testsSetup', 'testsStarted', 'testsRunning'];

test('convert to camelcase', () => {
  const result = testActionns.map(action => camelCaseAction(action));
  expect(result).toEqual(camelCaseActions);
});

test('generate action creator with consistent signature', () => {
  const result = defaultAction(camelCaseActions[0])();

  expect(result).toEqual({
    type: camelCaseActions[0],
    payload: {},
    meta: {},
    error: false,
  });

  expect(result.payload).toEqual({});
});

test('generate consistent action creators from a list of actions', () => {
  const result = generateActionCreators(testActionns);
  expect(Object.keys(result)).toEqual(camelCaseActions);

  camelCaseActions.forEach((action, index) =>
    expect(result[action]()).toEqual({
      type: testActionns[index],
      payload: {},
      meta: {},
      error: false,
    }),
  );

  const prop = 42;
  camelCaseActions.forEach((action, index) =>
    expect(result[action]({ prop })).toEqual({
      type: testActionns[index],
      payload: { prop },
      meta: {},
      error: false,
    }),
  );
});
