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

_verify_tslint:
	@if [ -e tslint.json ]; then npx tslint -c tslint.json "src/**/*.ts" "test/**/*.ts" && $(DONE); fi

verify-with-tslint: _verify_tslint verify

build-demo:
	# transpiling client-side code
	rm -rf public
	tsc --p demos/tsconfig.demo.json
	webpack --config demos/webpack.config.demo.js
	# copying views
	rm -rf bower_components/n-profile-ui
	mkdir bower_components/n-profile-ui
	cp -r templates/ bower_components/n-profile-ui/templates/
	# building styles
	node-sass demos/scss/demo.scss public/main.css --include-path bower_components
	@$(DONE)

demo: build-demo
	npx ts-node demos/app.ts

a11y:
	@node .pa11yci.js
	@PA11Y=true make build-demo
	@$(DONE)

test: verify a11y
