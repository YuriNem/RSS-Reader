import { inputFeed, submitFeed } from './feedLogic';

const runRSSReader = () => {
  inputFeed();
  submitFeed();
};

export default runRSSReader;
