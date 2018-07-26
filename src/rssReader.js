import axios from 'axios';

import { state, updateItems } from './state';
import parseRSS from './parseRSS';

const inputStream = () => {
  const input = document.getElementById('input');
  input.addEventListener('input', () => {
    state.input = input.value;
  });
};

const getStream = (urlStream) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlStream}`).then((response) => {
    const data = parseRSS(response);
    state.error = '';
    state.urls = [...state.urls, urlStream];
    state.input = '';
    state.data = [...state.data, data];
    return { url: urlStream, items: data.itemsStream };
  }).then(({ url, items }) => {
    setTimeout(updateItems, 5000, url, items);
  }).catch((error) => {
    state.error = error;
    state.valid = 'valid';
  });
};

const submitStream = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.valid === 'valid') {
      state.valid = 'loading';
      getStream(state.input);
    }
  });
};

const rssReader = () => {
  inputStream();
  submitStream();
};

export default rssReader;
