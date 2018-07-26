import $ from 'jquery';

export const renderInput = (valid) => {
  const input = document.getElementById('input');
  const buttonAdd = document.getElementById('btn-add');
  if (valid === 'empty') {
    input.value = '';
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.disabled = false;
    buttonAdd.disabled = true;
  } else if (valid === 'invalid') {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.disabled = false;
    buttonAdd.disabled = true;
  } else if (valid === 'loading') {
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    input.disabled = true;
    buttonAdd.disabled = true;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.disabled = false;
    buttonAdd.disabled = false;
  }
};

export const renderError = (errorName) => {
  if (document.getElementById('error')) {
    const errorElement = document.getElementById('error');
    errorElement.remove();
  }
  if (errorName) {
    const jumbotron = document.getElementById('jumbotron');
    const ul = document.createElement('ul');
    ul.id = 'error';
    ul.classList.add('list-group');
    jumbotron.append(ul);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-danger');
    li.textContent = errorName;
    ul.prepend(li);
  }
};

export const renderUlFeeds = () => {
  if (document.getElementById('feeds')) {
    const oldUlFeeds = document.getElementById('feeds');
    oldUlFeeds.remove();
  }
  const main = document.getElementById('main');
  const ul = document.createElement('ul');
  ul.id = 'feeds';
  ul.classList.add('list-group');
  main.append(ul);
};

export const renderLiFeed = (titleFeed, descriptionFeed) => {
  const ul = document.getElementById('feeds');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.classList.add('list-group-item-primary');
  ul.prepend(li);
  const h3 = document.createElement('h3');
  h3.textContent = titleFeed;
  li.append(h3);
  const p = document.createElement('p');
  p.textContent = descriptionFeed;
  li.append(p);
};

export const renderUlArticles = () => {
  if (document.getElementById('articles')) {
    const oldUlArticles = document.getElementById('articles');
    oldUlArticles.remove();
  }
  const main = document.getElementById('main');
  const ul = document.createElement('ul');
  ul.id = 'articles';
  ul.classList.add('list-group');
  main.append(ul);
};

export const renderLiArticle = (titleArticle, linkArticle, descriptionArticle) => {
  const ul = document.getElementById('articles');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  ul.prepend(li);
  const a = document.createElement('a');
  a.textContent = titleArticle;
  a.href = linkArticle;
  li.append(a);
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn');
  button.classList.add('float-right');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#modal');
  button.setAttribute('data-description', descriptionArticle);
  button.textContent = 'Open';
  li.append(button);
};

export const renderModal = () => {
  const forModal = document.getElementById('for-modal');
  forModal.innerHTML = `
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" id="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Description</h5>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $('#modal').on('show.bs.modal', (event) => {
    $('#modal').find('.modal-body').text($(event.relatedTarget).data('description'));
  });
};
