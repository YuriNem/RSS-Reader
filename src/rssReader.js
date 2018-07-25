import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';
import $ from 'jquery';

import parser from './parser';

import {
  renderError,
  renderUlStreams,
  renderUlArticles,
  renderLiStream,
  renderLiArticle,
} from './render';

const input = document.querySelector('input');
const add = document.querySelector('.add');
const form = document.querySelector('form');

const state = {
  input: '',
  valid: 'empty',
  urls: [],
  data: [],
  error: '',
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
    add.disabled = true;
  } else if (!state.valid) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    add.disabled = true;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    add.disabled = false;
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

const openModal = () => {
  $('#exampleModal').on('show.bs.modal', (event) => {
    $('#exampleModal').find('.modal-body').text($(event.relatedTarget).data('description'));
  });
};

watch(state, 'data', () => {
  renderUlStreams();
  renderUlArticles();
  state.data.forEach(({ titleStream, descriptionStream, itemsStream }) => {
    renderLiStream(titleStream, descriptionStream);
    itemsStream.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
      renderLiArticle(titleArticle, linkArticle, descriptionArticle);
    });
  });
  openModal();
});

const rssReader = () => {
  inputStream();
  submitStream();
};

export default rssReader;
