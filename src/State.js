class State {
  constructor() {
    this.input = '';
    this.validationState = 'empty';
    this.urls = [];
    this.feeds = [];
    this.error = '';
  }

  setInput(input) {
    this.input = input;
  }

  setValidationState(validationState) {
    this.validationState = validationState;
  }

  addUrl(url) {
    this.urls = [...this.urls, url];
  }

  addFeed(feed) {
    this.feeds = [...this.feeds, feed];
  }

  addItems(index, items) {
    this.feeds[index].itemsFeed = [...this.feeds[index].itemsFeed, ...items];
  }

  setError(error) {
    this.error = error;
  }
}

export default State;
