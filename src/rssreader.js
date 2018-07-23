import validator from 'validator';

const state = {
  input: '',
  urls: [],
};

const addStream = () => {
  const input = document.querySelector('input');
  input.addEventListener('input', (event) => {
    event.preventDefault();
    if ((!validator.isURL(input.value) || state.urls.includes(input.value)) && !input.classList.contains('is-invalid')) {
      input.classList.add('is-invalid');
    } else if ((validator.isURL(input.value) || input.value === '') && input.classList.contains('is-invalid')) {
      input.classList.remove('is-invalid');
    }
    state.input = input.value;
  });
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.urls.push(state.input);
    input.value = '';
    state.input = '';
  });
};

const rssreader = () => {
  addStream();
};

export default rssreader;
