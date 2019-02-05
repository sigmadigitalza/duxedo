import generateActions from '../lib/generateActions';

// test input data
const testActionns = ['TESTS_SETUP', 'TESTS_STARTED', 'TESTS_RUNNING'];

test('transforms a array of actions into an object', () => {
  const result = generateActions(testActionns);

  expect(result).toEqual({
    TESTS_SETUP: 'TESTS_SETUP',
    TESTS_STARTED: 'TESTS_STARTED',
    TESTS_RUNNING: 'TESTS_RUNNING',
  });
});
