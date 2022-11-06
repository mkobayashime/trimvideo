rollup = yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript

node_modules: package.json yarn.lock
	yarn
	@touch node_modules

.PHONY: lint
lint: node_modules
	yarn eslint .

.PHONY: lint.fix
lint.fix: node_modules
	yarn eslint --fix .

.PHONY: format
format: node_modules
	yarn prettier --write .

.PHONY: format.check
format.check: node_modules
	yarn prettier --check .

.PHONY: clear
clear:
	rm -rf dist

.PHONY: dev
dev: node_modules
	$(rollup) --watch

.PHONY: build
build: node_modules clear
	$(rollup)

.PHONY: typecheck
typecheck: node_modules
	yarn tsc --noEmit

.PHONY: typecheck.watch
typecheck.watch: node_modules
	yarn tsc --noEmit --watch
