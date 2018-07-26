import axios from 'axios';

import State from './State';
import parseRSS from './parseRSS';

const rssReader = () => {
  const state = new State();

  const inputFeed = () => {
    const input = document.getElementById('input');
    input.addEventListener('input', () => {
      state.input = input.value;
    });
  };

  inputFeed();

  const getDiff = (items, newItems) => newItems.filter(
    newItem => items.reduce((acc, item) => (
      newItem.titleArticle === item.titleArticle ? false : acc), true),
  );

  const updateItems = (url, items) => {
    axios.get(`https://cors-anywhere.herokuapp.com/${url}`).then((response) => {
      const { itemsFeed: newItems } = parseRSS(response);
      const diffItems = getDiff(items, newItems);
      if (diffItems.length) {
        state.items = [...state.items, diffItems];
      }
      return [...items, ...diffItems];
    }).then((updatedItems) => {
      setTimeout(updateItems, 5000, url, updatedItems);
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
      return { url: urlFeed, items: feed.itemsFeed };
    }).then(({ url, items }) => {
      setTimeout(updateItems, 5000, url, items);
    }).catch((error) => {
      state.error = error;
      state.valid = 'valid';
    });
  };

  const submitFeed = () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (state.valid === 'valid') {
        state.valid = 'loading';
        getFeed(state.input);
      }
    });
  };

  submitFeed();
};

export default rssReader;
