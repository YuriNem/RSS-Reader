import validator from 'validator';

const input = document.querySelector('input');

const state = {
  input: '',
  valid: true,
  urls: [],
};

const inputStream = () => {
  input.addEventListener('input', () => {
    state.input = input.value;
    if ((!validator.isURL(state.input) || state.urls.includes(state.input)) && state.valid) {
      input.classList.add('is-invalid');
      state.valid = !state.valid;
    } else if ((validator.isURL(state.input) || state.input === '') && !state.valid) {
      input.classList.remove('is-invalid');
      state.valid = !state.valid;
    }
  });
};

const submitStream = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.valid && state.input) {
      state.urls.push(state.input);
      state.input = '';
      state.valid = true;
      input.value = '';
      console.log(state.urls);
    } else {
      console.log('Not valid');
    }
  });
};

const rssReader = () => {
  inputStream();
  submitStream();
};

export default rssReader;
