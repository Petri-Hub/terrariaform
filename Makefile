.PHONY: cleanup installation build hosting server

cleanup:
	rm -rf server/**

installation:
	scripts/install.sh

build:
	scripts/build.sh

hosting:
	docker run -t tmodloader-server:latest .
	
server:
	$(MAKE) cleanup
	$(MAKE) installation
	$(MAKE) build
	$(MAKE) hosting