import State from './State';
import watchState from './watchState';
import { handleFeedInput, handleFeedForm } from './feedLogic';

const runRSSReader = () => {
  const state = new State();
  watchState(state);
  handleFeedInput(state);
  handleFeedForm(state);
};

export default runRSSReader;
