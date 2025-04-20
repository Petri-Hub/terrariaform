installation:
	scripts/install.sh

build:
	scripts/build.sh

hosting:
	$(MAKE) installation
	$(MAKE) build