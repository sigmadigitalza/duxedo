import generateActions from './lib/generateActions';
import generateActionCreators from './lib/generateActionCreators';
import generateReducer from './lib/generateReducer';

export default (definition = {}, defaultState = {}) => ({
  constants: generateActions,
  actions: generateActionCreators,
  reducer: generateReducer,
});

// export core functions
export { generateActions, generateActionCreators, generateReducer };
