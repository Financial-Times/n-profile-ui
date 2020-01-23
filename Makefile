node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	rm -rf dist
	tsc -p tsconfig.commonjs.json
	tsc -p tsconfig.esm.json

watch:
	tsc -w -p tsconfig.commonjs.json -p tsconfig.esm.json

build-production: build

build-for-commit: git add dist

_verify_tslint:
	@if [ -e tslint.json ]; then tslint -c tslint.json "src/**/*.ts" "test/**/*.ts" && $(DONE); fi

verify-with-tslint: _verify_tslint verify

a11y:
	@node .pa11yci.js
	@PA11Y=true make build-demo
	@$(DONE)

unit-test:
	jest ./test/unit/*.spec.ts --config=./test/jest.config.json

client-test:
	jest ./test/client/*.spec.ts --config=./test/jest.config.json

test: verify a11y unit-test client-test
