install:
	npm install
build:
	rm -rf dist
	NODE_ENV=production npm run webpack
publish:
	npm publish
lint:
	npm run eslint .
