import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';

import {
  renderInput,
  renderError,
  renderUlStreams,
  renderUlArticles,
  renderLiStream,
  renderLiArticle,
  renderModal,
} from './render';
import parseRSS from './parseRSS';

export const state = {
  input: '',
  valid: 'empty',
  urls: [],
  data: [],
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

watch(state, 'data', () => {
  renderUlStreams();
  renderUlArticles();
  state.data.forEach(({ titleStream, descriptionStream, itemsStream }) => {
    renderLiStream(titleStream, descriptionStream);
    itemsStream.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
      renderLiArticle(titleArticle, linkArticle, descriptionArticle);
    });
  });
  renderModal();
});

const getDiff = (items, newItems) => newItems.filter(
  newItem => items.reduce((acc, item) => (
    newItem.titleArticle === item.titleArticle ? false : acc), true),
);

export const updateItems = (url, items) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${url}`).then((response) => {
    const { itemsStream: newItems } = parseRSS(response);
    const diffItems = getDiff(items, newItems);
    diffItems.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
      renderLiArticle(titleArticle, linkArticle, descriptionArticle);
    });
    setTimeout(updateItems, 5000, url, [...items, ...newItems]);
  }).catch((error) => {
    state.error = error;
  });
};
