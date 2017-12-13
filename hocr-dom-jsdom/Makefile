PATH := $(PWD)/node_modules/.bin:$(PATH)

# BEGIN-EVAL makefile-parser --make-help Makefile

help:
	@echo ""
	@echo "  Targets"
	@echo ""
	@echo "    test  Run unit tests"

# END-EVAL


# Run unit tests
.PHONY: test
test: test/ocr-fileformat-samples
	tap test/*.test.js

test/ocr-fileformat-samples:
	git clone --depth 1 https://github.com/kba/ocr-fileformat-samples $@
