import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';

import parser from './parser';

import {
  renderUlStreams,
  renderUlArticles,
  renderLiStream,
  renderLiArticle,
} from './render';


const input = document.querySelector('input');
const form = document.querySelector('form');

const state = {
  input: '',
  valid: 'empty',
  urls: [],
  data: [],
};

const inputStream = () => {
  input.addEventListener('input', () => {
    state.input = input.value;
  });
};

watch(state, 'input', () => {
  if (state.input === '') {
    input.value = '';
    state.valid = 'empty';
  } else if (!isURL(state.input) || state.urls.includes(state.input)) {
    state.valid = false;
  } else {
    state.valid = true;
  }
});

watch(state, 'valid', () => {
  if (state.valid === 'empty') {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
  } else if (!state.valid) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
});

const getStream = (urlStream) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlStream}`).then((res) => {
    state.data = [...state.data, parser(res)];
  }).catch(err => console.log(err));
};

const submitStream = () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.valid === true) {
      getStream(state.input);
      state.urls = [...state.urls, state.input];
      state.input = '';
    }
  });
};

watch(state, 'data', () => {
  renderUlStreams();
  renderUlArticles();
  state.data.forEach(({ titleStream, description, items }) => {
    renderLiStream(titleStream, description);
    items.forEach(({ titleArticle, link }) => {
      renderLiArticle(titleArticle, link);
    });
  });
});

const rssReader = () => {
  inputStream();
  submitStream();
};

export default rssReader;
