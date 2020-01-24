node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

clean:
	rm -rf dist
	

build:
	make clean	
	page-kit build

watch:
	page-kit --development --watch

build-for-commit: 
	build
	git add dist

_verify_tslint:
	@if [ -e tslint.json ]; then tslint -c tslint.json "src/**/*.ts" "test/**/*.ts" && $(DONE); fi

verify-with-tslint: 
	_verify_tslint verify

a11y:
	@node .pa11yci.js
	@PA11Y=true make build-demo
	@$(DONE)

unit-test:
	jest ./test/unit/*.spec.ts --config=./test/jest.config.json

client-test:
	jest ./test/client/*.spec.ts --config=./test/jest.config.json

test: verify a11y unit-test client-test
