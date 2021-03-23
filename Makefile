NODE = @node
TSC = $(NODE) --max-old-space-size=4096 node_modules/.bin/tsc
MOCHA = $(NODE) --max-old-space-size=4096 node_modules/.bin/mocha
NYC = $(NODE) --max-old-space-size=4096 node_modules/.bin/nyc
ROLLUP = $(NODE) --max-old-space-size=4096 node_modules/.bin/rollup
TSLINT = $(NODE) --max-old-space-size=4096 node_modules/.bin/tslint
COVERALLS = $(NODE) --max-old-space-size=4096 node_modules/.bin/coveralls

ifneq ($(CI), true)
LOCAL_ARG = --local --verbose --diagnostics
endif

clean:
		@echo '> Cleaning'
		@(rm -rf coverage || true)
		@(rm -rf .nyc_output || true)
		@(rm *.lcov || true)
		@(rm -rf dist || true)

build: clean
		@echo '> Building'
		${ROLLUP} -c --environment BUILD:production
		$(MAKE) provision-bundled

provision-bundled:
		@echo '> Generating bundles'
		@cp ./static/package.json ./dist/package.json
		@cp ./static/api-extractor.json ./dist/api-extractor.json
		@cp ./static/tsconfig.json ./dist/tsconfig.json
		cd ./dist && ../node_modules/.bin/api-extractor run $(LOCAL_ARG) --typescript-compiler-folder ../node_modules/typescript
		@mv ./dist/dist/decentraland-transactions.d.ts ./dist
		@rm ./dist/tsconfig.json
		@rm ./dist/tsdoc-metadata.json
		@rm -rf ./dist/node_modules
		@rm -rf ./dist/api-extractor.json
		@rm -rf ./dist/decl || true
		@rm -rf ./dist/dist || true
		@rm -rf ./dist/temp || true

test:
		echo '> test'
		node --experimental-modules --es-module-specifier-resolution=node node_modules/.bin/nyc node_modules/mocha/bin/_mocha

ci: | build test

.PHONY: build test