# Development targets
.PHONY: help install run dev build preview lint format clean

# Default target
help:
	@echo "Available targets:"
	@echo "  install  - Install dependencies"
	@echo "  run      - Start development server"
	@echo "  dev      - Alias for run"
	@echo "  build    - Build for production"
	@echo "  preview  - Preview production build"
	@echo "  lint     - Run ESLint"
	@echo "  format   - Format code with Prettier (if available)"
	@echo "  clean    - Clean build artifacts and node_modules"

# Install dependencies
install:
	npm install

# Start development server
run:
	npm run dev

# Alias for run
dev: run

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Run ESLint
lint:
	npm run lint

# Format code (requires prettier to be installed)
format:
	@if command -v npx prettier >/dev/null 2>&1; then \
		npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,md}"; \
	else \
		echo "Prettier not found. Install with: npm install --save-dev prettier"; \
	fi

# Clean build artifacts and dependencies
clean:
	rm -rf dist
	rm -rf node_modules
	rm -f package-lock.json
