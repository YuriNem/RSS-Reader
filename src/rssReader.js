import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';

import parser from './parser';

import {
  renderError,
  renderUlStreams,
  renderUlArticles,
  renderLiStream,
  renderLiArticle,
} from './render';


const input = document.querySelector('input');
const button = document.querySelector('.add');
const form = document.querySelector('form');

const state = {
  input: '',
  valid: 'empty',
  urls: [],
  error: '',
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
    button.disabled = true;
  } else if (!state.valid) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    button.disabled = true;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    button.disabled = false;
  }
});

const getStream = (urlStream) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlStream}`).then((response) => {
    const data = parser(response);
    state.error = '';
    state.urls = [...state.urls, state.input];
    state.input = '';
    state.data = [...state.data, data];
  }).catch((error) => {
    state.error = error;
  });
};

const submitStream = () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.valid === true) {
      getStream(state.input);
    }
  });
};

watch(state, 'error', () => {
  renderError(state.error);
});

watch(state, 'data', () => {
  renderUlStreams();
  renderUlArticles();
  state.data.forEach(({ titleStream, descriptionStream, itemsStream }) => {
    renderLiStream(titleStream, descriptionStream);
    itemsStream.forEach(({ titleArticle, linkArticle }) => {
      renderLiArticle(titleArticle, linkArticle);
    });
  });
});

const rssReader = () => {
  inputStream();
  submitStream();
};

export default rssReader;
