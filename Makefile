check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	node --test --test-reporter spec

.PHONY: check lint test
