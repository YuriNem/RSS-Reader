export const renderError = (errorName) => {
  if (errorName) {
    if (document.querySelector('.error')) {
      const errorElement = document.querySelector('.error');
      errorElement.remove();
    }
    const jumbotron = document.querySelector('.jumbotron');
    const ul = document.createElement('ul');
    ul.classList.add('error');
    ul.classList.add('list-group');
    jumbotron.append(ul);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-danger');
    li.textContent = errorName;
    ul.append(li);
  } else if (document.querySelector('.error')) {
    const errorElement = document.querySelector('.error');
    errorElement.remove();
  }
};

export const renderUlStreams = () => {
  if (document.querySelector('.streams')) {
    const oldUlStreams = document.querySelector('.streams');
    oldUlStreams.remove();
  }
  const main = document.querySelector('main');
  const ul = document.createElement('ul');
  ul.classList.add('streams');
  ul.classList.add('list-group');
  main.append(ul);
};

export const renderLiStream = (titleStream, descriptionStream) => {
  const ul = document.querySelector('.streams');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.classList.add('list-group-item-primary');
  ul.append(li);
  const h3 = document.createElement('h3');
  h3.textContent = titleStream;
  li.append(h3);
  const p = document.createElement('p');
  p.textContent = descriptionStream;
  li.append(p);
};

export const renderUlArticles = () => {
  if (document.querySelector('.articles')) {
    const oldUlArticles = document.querySelector('.articles');
    oldUlArticles.remove();
  }
  const main = document.querySelector('main');
  const ul = document.createElement('ul');
  ul.classList.add('articles');
  ul.classList.add('list-group');
  main.append(ul);
};

export const renderLiArticle = (titleArticle, linkArticle) => {
  const ul = document.querySelector('.articles');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  ul.append(li);
  const a = document.createElement('a');
  a.textContent = titleArticle;
  a.href = linkArticle;
  li.append(a);
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#exampleModal');
  button.textContent = 'Open';
  li.append(button);
};
