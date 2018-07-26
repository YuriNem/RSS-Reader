import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';

import {
  renderInput,
  renderError,
  renderUlFeeds,
  renderUlArticles,
  renderLiFeed,
  renderLiArticle,
  renderModal,
} from './render';

class State {
  constructor() {
    this.input = '';
    this.valid = 'empty';
    this.urls = [];
    this.feeds = [];
    this.items = [];
    this.error = '';

    watch(this, 'input', () => {
      if (this.input === '') {
        this.valid = 'empty';
      } else if (!isURL(this.input) || this.urls.includes(this.input)) {
        this.valid = 'invalid';
      } else {
        this.valid = 'valid';
      }
    });

    watch(this, 'valid', () => {
      renderInput(this.valid);
    });

    watch(this, 'error', () => {
      renderError(this.error);
    });

    watch(this, 'feeds', () => {
      renderUlFeeds();
      renderUlArticles();
      this.feeds.forEach(({ titleFeed, descriptionFeed, itemsFeed }) => {
        renderLiFeed(titleFeed, descriptionFeed);
        itemsFeed.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
          renderLiArticle(titleArticle, linkArticle, descriptionArticle);
        });
      });
      renderModal();
    });

    watch(this, 'items', () => {
      const newItems = this.items[this.items.length - 1];
      newItems.forEach(({ titleArticle, linkArticle, descriptionArticle }) => {
        renderLiArticle(titleArticle, linkArticle, descriptionArticle);
      });
    });
  }
}

export default State;
