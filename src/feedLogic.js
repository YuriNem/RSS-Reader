import axios from 'axios';

import state from './state';
import parseRSS from './parseRSS';

export const inputFeed = () => {
  const input = document.getElementById('input');
  input.addEventListener('input', () => {
    state.input = input.value;
  });
};

const getDiff = (items, newItems) => newItems.filter(
  newItem => items.reduce((acc, item) => (
    newItem.titleArticle === item.titleArticle ? false : acc), true),
);

const updateItems = (url, index) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${url}`).then((response) => {
    const { itemsFeed: newItems } = parseRSS(response);
    const items = state.feeds[index].itemsFeed;
    const diffItems = getDiff(items, newItems);
    if (diffItems.length) {
      state.feeds[index].itemsFeed = [...items, ...diffItems];
    }
  }).then(() => {
    setTimeout(updateItems, 5000, url, index);
  }).catch((error) => {
    state.error = error;
  });
};

const getFeed = (urlFeed) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlFeed}`).then((response) => {
    const feed = parseRSS(response);
    state.error = '';
    state.urls = [...state.urls, urlFeed];
    state.feeds = [...state.feeds, feed];
    state.input = '';
    return { url: urlFeed, index: state.feeds.length - 1 };
  }).then(({ url, index }) => {
    setTimeout(updateItems, 5000, url, index);
  }).catch((error) => {
    state.error = error;
    state.valid = 'valid';
  });
};

export const submitFeed = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.valid === 'valid') {
      state.valid = 'loading';
      getFeed(state.input);
    }
  });
};
