import State from './State';
import watchState from './watchState';
import { inputFeed, submitFeed } from './feedLogic';

const runRSSReader = () => {
  const state = new State();
  watchState(state);
  inputFeed(state);
  submitFeed(state);
};

export default runRSSReader;
