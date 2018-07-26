const parseRSS = (xmlString) => {
  const parserDOM = new DOMParser();
  const documentData = parserDOM.parseFromString(xmlString.data, 'application/xml');
  const titleStream = documentData.querySelector('title').textContent;
  const descriptionStream = documentData.querySelector('description').textContent;
  const itemsStreamReverse = [...documentData.getElementsByTagName('item')].map((item) => {
    const titleArticle = item.querySelector('title').textContent;
    const linkArticle = item.querySelector('link').textContent;
    const descriptionArticle = item.querySelector('description').textContent;
    return { titleArticle, linkArticle, descriptionArticle };
  });
  const itemsStream = itemsStreamReverse.slice().reverse();
  return { titleStream, descriptionStream, itemsStream };
};

export default parseRSS;
