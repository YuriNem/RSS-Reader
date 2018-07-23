install:
	npm install
start:
	npm run babel-node -- src/bin/rss-reader.js
publish:
	npm publish
lint:
	npm run eslint .
