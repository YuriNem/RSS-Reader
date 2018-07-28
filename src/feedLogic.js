import axios from 'axios';

import parseRSS from './parseRSS';

export const handleFeedInput = (state) => {
  const input = document.getElementById('input');
  input.addEventListener('input', () => {
    state.setInput(input.value);
  });
};

const getDiff = (items, newItems) => newItems.filter(
  newItem => items.reduce((acc, item) => (
    newItem.titleItem === item.titleItem ? false : acc), true),
);

const updateItems = (urlItems, state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlItems}`).then((response) => {
    const { itemsFeed: newItems } = parseRSS(response);
    const index = state.urls.indexOf(urlItems);
    const items = state.feeds[index].itemsFeed;
    const diffItems = getDiff(items, newItems);
    if (diffItems.length) {
      state.addItems(index, diffItems);
    }
  }).then(() => {
    setTimeout(updateItems, 5000, urlItems, state);
  }).catch((error) => {
    state.setError(error);
  });
};

const getFeed = (urlFeed, state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlFeed}`).then((response) => {
    const feed = parseRSS(response);
    state.setError('');
    state.addUrl(urlFeed);
    state.addFeed(feed);
    state.setInput('');
    return urlFeed;
  }).then((urlItems) => {
    setTimeout(updateItems, 5000, urlItems, state);
  }).catch((error) => {
    state.setError(error);
    state.setValidationState('valid');
  });
};

export const handleFeedForm = (state) => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.validationState === 'valid') {
      state.setValidationState('loading');
      const urlFeed = state.input;
      getFeed(urlFeed, state);
    }
  });
};
