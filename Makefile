# Development targets
.PHONY: help install run dev build start lint clean

help:
	@echo "Available targets:"
	@echo "  install  - Install dependencies"
	@echo "  run      - Start development server"
	@echo "  dev      - Alias for run"
	@echo "  build    - Build for production"
	@echo "  start    - Start production server"
	@echo "  lint     - Run ESLint"
	@echo "  clean    - Clean build artifacts and node_modules"

install:
	npm install

run:
	npm run dev

dev: run

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

clean:
	rm -rf .next out dist node_modules package-lock.json
