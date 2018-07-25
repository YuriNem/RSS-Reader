const parser = (xmlString) => {
  const parserDOM = new DOMParser();
  const documentData = parserDOM.parseFromString(xmlString.data, 'application/xml');
  const titleStream = documentData.querySelector('title').textContent;
  const descriptionStream = documentData.querySelector('description').textContent;
  const itemsStream = [...documentData.querySelectorAll('item')].map((item) => {
    const titleArticle = item.querySelector('title').textContent;
    const linkArticle = item.querySelector('link').textContent;
    const descriptionArticle = item.querySelector('description').textContent;
    return { titleArticle, linkArticle, descriptionArticle };
  });
  return { titleStream, descriptionStream, itemsStream };
};

export default parser;
