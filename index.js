import generateActions from './lib/generateActions';
import generateActionCreators from './lib/generateActionCreators';
import generateReducer from './lib/generateReducer';

export default ({ definition = {}, defaultState = {}, options = {} }) => {
  const keys = Object.keys(definition);

  return {
    constants: generateActions(keys),
    actions: generateActionCreators(keys),
    reducer: generateReducer({ definition, defaultState }),
  };
};

// export core functions
export { generateActions, generateActionCreators, generateReducer };
