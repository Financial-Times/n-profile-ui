node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	tsc

watch:
	tsc -w

build-production: build

_verify_tslint:
	@if [ -e tslint.json ]; then npx tslint -c tslint.json "src/**/*.ts" "test/**/*.ts" && $(DONE); fi

verify-with-tslint: _verify_tslint verify
