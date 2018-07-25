import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';
import $ from 'jquery';

import {
  renderInput,
  renderError,
  renderUlStreams,
  renderUlArticles,
  renderLiStream,
  renderLiArticle,
} from './render';
import parseXmlToStream from './parseXmlToStream';

const state = {
  input: '',
  valid: 'empty',
  urls: [],
  data: [],
  error: '',
};

const inputStream = () => {
  const input = document.getElementById('input');
  input.addEventListener('input', () => {
    state.input = input.value;
  });
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

const getDiff = (items, newItems) => newItems.filter(newItem => items.reduce((acc, item) => (
  newItem.titleArticle === item.titleArticle ? false : acc), true));

const getStream = (urlStream) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${urlStream}`).then((response) => {
    const data = parseXmlToStream(response);
    state.error = '';
    state.urls = [...state.urls, state.input];
    state.input = '';
    state.data = [...state.data, data];
    return { url: urlStream, items: data.itemsStream };
  }).then(({ url, items }) => {
    const stream = {
      url,
      items,
    };
    const updateItems = () => {
      axios.get(`https://cors-anywhere.herokuapp.com/${stream.url}`).then((response) => {
        const { itemsStream: newItems } = parseXmlToStream(response);
        const diffItems = getDiff(stream.items, newItems);
        diffItems.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
          renderLiArticle(titleArticle, linkArticle, descriptionArticle);
        });
        stream.items = [...stream.items, ...diffItems];
      }).catch((error) => {
        state.error = error;
      });
    };
    setInterval(updateItems, 5000);
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

watch(state, 'error', () => {
  renderError(state.error);
});

const openModal = () => {
  $('#modal').on('show.bs.modal', (event) => {
    $('#modal').find('.modal-body').text($(event.relatedTarget).data('description'));
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
