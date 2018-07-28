import $ from 'jquery';

export const renderInput = (validationState) => {
  const input = document.getElementById('input');
  const buttonAdd = document.getElementById('btn-add');
  if (validationState === 'empty') {
    input.value = '';
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.disabled = false;
    buttonAdd.disabled = true;
  } else if (validationState === 'invalid') {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.disabled = false;
    buttonAdd.disabled = true;
  } else if (validationState === 'loading') {
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

export const renderUlFeeds = () => {
  if (document.getElementById('feeds')) {
    const ulFeeds = document.getElementById('feeds');
    ulFeeds.remove();
  }
  const main = document.getElementById('main');
  const ul = document.createElement('ul');
  ul.id = 'feeds';
  ul.classList.add('list-group');
  main.append(ul);
};

export const renderUlItems = () => {
  if (document.getElementById('items')) {
    const ulItems = document.getElementById('items');
    ulItems.remove();
  }
  const main = document.getElementById('main');
  const ul = document.createElement('ul');
  ul.id = 'items';
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

export const renderLiItem = (titleItem, linkItem, descriptionItem) => {
  const ul = document.getElementById('items');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  ul.prepend(li);
  const a = document.createElement('a');
  a.textContent = titleItem;
  a.href = linkItem;
  li.append(a);
  const buttonOpen = document.createElement('button');
  buttonOpen.id = 'open';
  buttonOpen.type = 'button';
  buttonOpen.classList.add('btn');
  buttonOpen.classList.add('float-right');
  buttonOpen.setAttribute('data-toggle', 'modal');
  buttonOpen.setAttribute('data-target', '#modal');
  buttonOpen.setAttribute('data-description', descriptionItem);
  buttonOpen.textContent = 'Open';
  li.append(buttonOpen);
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $('#modal').on('show.bs.modal', (event) => {
    $('#modal').find('.modal-body').text($(event.relatedTarget).data('description'));
  });
};

export const renderElementError = (error) => {
  if (document.getElementById('error')) {
    const elementError = document.getElementById('error');
    elementError.remove();
  }
  if (error) {
    const jumbotron = document.getElementById('jumbotron');
    const ul = document.createElement('ul');
    ul.id = 'error';
    ul.classList.add('list-group');
    jumbotron.append(ul);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-danger');
    li.textContent = error;
    ul.prepend(li);
  }
};
