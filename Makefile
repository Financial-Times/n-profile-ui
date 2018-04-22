node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	rm -rf dist
	tsc

watch:
	tsc -w

build-production: build

build-for-commit: build eslint-fix-dist
	git add dist

eslint-fix-dist:
	eslint --fix ./dist
	eslint --rule 'indent: [error, tab]' --fix "./dist/**/*.js"

_verify_tslint:
	@if [ -e tslint.json ]; then tslint -c tslint.json "src/**/*.ts" "test/**/*.ts" && $(DONE); fi

verify-with-tslint: _verify_tslint verify

build-demo:
	# transpiling client-side code
	rm -rf public
	tsc --p demos/tsconfig.demo.json
	webpack-cli --config demos/webpack.config.demo.js
	# copying views
	rm -rf bower_components/n-profile-ui
	mkdir bower_components/n-profile-ui
	cp -r templates/ bower_components/n-profile-ui/templates/
	# building styles
	node-sass demos/scss/demo.scss public/main.css --include-path bower_components
	@$(DONE)

demo: build-demo
	ts-node demos/app.ts

a11y:
	@node .pa11yci.js
	@PA11Y=true make build-demo
	@$(DONE)

test: verify a11y
	mocha "test/**/*.spec.ts" -r ts-node/register --exit
