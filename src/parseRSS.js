const parseRSS = (xmlString) => {
  const parserDOM = new DOMParser();
  const documentFeed = parserDOM.parseFromString(xmlString.data, 'application/xml');
  const titleFeed = documentFeed.querySelector('title').textContent;
  const descriptionFeed = documentFeed.querySelector('description').textContent;
  const itemsFeedReversed = [...documentFeed.getElementsByTagName('item')].map((item) => {
    const titleArticle = item.querySelector('title').textContent;
    const linkArticle = item.querySelector('link').textContent;
    const descriptionArticle = item.querySelector('description').textContent;
    return { titleArticle, linkArticle, descriptionArticle };
  });
  const itemsFeed = itemsFeedReversed.slice().reverse();
  return { titleFeed, descriptionFeed, itemsFeed };
};

export default parseRSS;
