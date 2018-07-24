const parser = (xmlString) => {
  const parserDOM = new DOMParser();
  const documentData = parserDOM.parseFromString(xmlString.data, 'application/xml');
  const titleStream = documentData.querySelector('title').textContent;
  const description = documentData.querySelector('description').textContent;
  const items = [...documentData.querySelectorAll('item')].map((item) => {
    const titleArticle = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    return { titleArticle, link };
  });
  return { titleStream, description, items };
};

export default parser;
