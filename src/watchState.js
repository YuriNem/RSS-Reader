import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';

import {
  renderInput,
  renderError,
  renderUlFeeds,
  renderUlArticles,
  renderLiFeed,
  renderLiArticle,
  renderModal,
} from './render';

const watchState = (state) => {
  watch(state, 'input', () => {
    if (state.input === '') {
      state.updateValid('empty');
    } else if (!isURL(state.input) || state.urls.includes(state.input)) {
      state.updateValid('invalid');
    } else {
      state.updateValid('valid');
    }
  });

  watch(state, 'valid', () => {
    renderInput(state.valid);
  });

  watch(state, 'error', () => {
    renderError(state.error);
  });

  watch(state, 'feeds', () => {
    renderUlFeeds();
    renderUlArticles();
    state.feeds.forEach(({ titleFeed, descriptionFeed, itemsFeed }) => {
      renderLiFeed(titleFeed, descriptionFeed);
      itemsFeed.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
        renderLiArticle(titleArticle, linkArticle, descriptionArticle);
      });
    });
    renderModal();
  });
};

export default watchState;
