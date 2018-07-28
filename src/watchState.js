import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';

import {
  renderInput,
  renderUlFeeds,
  renderUlItems,
  renderLiFeed,
  renderLiItem,
  renderModal,
  renderElementError,
} from './render';

const watchState = (state) => {
  watch(state, 'input', () => {
    if (state.input === '') {
      state.setValidationState('empty');
    } else if (!isURL(state.input) || state.urls.includes(state.input)) {
      state.setValidationState('invalid');
    } else {
      state.setValidationState('valid');
    }
  });

  watch(state, 'validationState', () => {
    renderInput(state.validationState);
  });

  watch(state, 'feeds', () => {
    renderUlFeeds();
    renderUlItems();
    state.feeds.forEach(({ titleFeed, descriptionFeed, itemsFeed }) => {
      renderLiFeed(titleFeed, descriptionFeed);
      itemsFeed.forEach(({ titleItem, linkItem, descriptionItem }) => {
        renderLiItem(titleItem, linkItem, descriptionItem);
      });
    });
    renderModal();
  });

  watch(state, 'error', () => {
    renderElementError(state.error);
  });
};

export default watchState;
