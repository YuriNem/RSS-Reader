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

const state = {
  input: '',
  valid: 'empty',
  urls: [],
  feeds: [],
  items: [],
  error: '',
};

watch(state, 'input', () => {
  if (state.input === '') {
    state.valid = 'empty';
  } else if (!isURL(state.input) || state.urls.includes(state.input)) {
    state.valid = 'invalid';
  } else {
    state.valid = 'valid';
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

watch(state, 'items', () => {
  const newItems = state.items[state.items.length - 1];
  newItems.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
    renderLiArticle(titleArticle, linkArticle, descriptionArticle);
  });
});

export default state;
