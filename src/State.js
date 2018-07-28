class State {
  constructor() {
    this.input = '';
    this.valid = 'empty';
    this.urls = [];
    this.feeds = [];
    this.error = '';
  }

  updateInput(input) {
    this.input = input;
  }

  updateValid(valid) {
    this.valid = valid;
  }

  updateUrls(url) {
    this.urls = [...this.urls, url];
  }

  updateFeeds(feed) {
    this.feeds = [...this.feeds, feed];
  }

  updateItems(index, items) {
    this.feeds[index].itemsFeed = [...this.feeds[index].itemsFeed, ...items];
  }

  updateError(error) {
    this.error = error;
  }
}

export default State;
