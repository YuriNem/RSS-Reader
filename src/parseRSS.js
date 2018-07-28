const parseRSS = (xml) => {
  const parser = new DOMParser();
  const documentFeed = parser.parseFromString(xml.data, 'application/xml');
  const titleFeed = documentFeed.querySelector('title').textContent;
  const descriptionFeed = documentFeed.querySelector('description').textContent;
  const itemsFeedReversed = [...documentFeed.getElementsByTagName('item')].map((item) => {
    const titleItem = item.querySelector('title').textContent;
    const linkItem = item.querySelector('link').textContent;
    const descriptionItem = item.querySelector('description').textContent;
    return { titleItem, linkItem, descriptionItem };
  });
  const itemsFeed = itemsFeedReversed.slice().reverse();
  return { titleFeed, descriptionFeed, itemsFeed };
};

export default parseRSS;
