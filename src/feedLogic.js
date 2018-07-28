import axios from 'axios';

import parseRSS from './parseRSS';

export const inputFeed = (state) => {
  const input = document.getElementById('input');
  input.addEventListener('input', () => {
    state.updateInput(input.value);
  });
};

const getDiff = (items, newItems) => newItems.filter(
  newItem => items.reduce((acc, item) => (
    newItem.titleArticle === item.titleArticle ? false : acc), true),
);

const updateItems = (url, state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${url}`).then((response) => {
    const { itemsFeed: newItems } = parseRSS(response);
    const index = state.urls.indexOf(url);
    const items = state.feeds[index].itemsFeed;
    const diffItems = getDiff(items, newItems);
    if (diffItems.length) {
      state.updateItems(index, diffItems);
    }
  }).then(() => {
    setTimeout(updateItems, 5000, url, state);
  }).catch((error) => {
    state.updateError(error);
  });
};

const getFeed = (urlFeed, state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlFeed}`).then((response) => {
    const feed = parseRSS(response);
    state.updateError('');
    state.updateUrls(urlFeed);
    state.updateFeeds(feed);
    state.updateInput('');
    return urlFeed;
  }).then((url) => {
    setTimeout(updateItems, 5000, url, state);
  }).catch((error) => {
    state.updateError(error);
    state.updateValid('valid');
  });
};

export const submitFeed = (state) => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.valid === 'valid') {
      state.updateValid('loading');
      const urlFeed = state.input;
      getFeed(urlFeed, state);
    }
  });
};
