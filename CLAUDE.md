# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VSCode extension that adds a sidebar table of contents (TOC) for Markdown Preview. The extension injects JavaScript into the markdown preview webview to collect headers and generate a navigable sidebar.

**Architecture**: The extension uses VSCode's built-in markdown extension API (`markdown.previewScripts` and `markdown.previewStyles`) to inject custom JS/CSS into the preview webview. No traditional VSCode extension activation code is needed - the scripts run directly in the preview context.

## Key Files

- `src/md-toc-sidebar.js` - Main logic: collects headers from `.markdown-body`, generates nested TOC structure, manages sidebar visibility (stored in LocalStorage)
- `src/md-toc-sidebar.css` - Responsive styling with breakpoint at 1366px width
- `out/` - Built/minified output files referenced in package.json contributes section

## Development Commands

```bash
# Build (minify and bundle)
npm run esbuild-base

# Build with sourcemaps (for development)
npm run esbuild

# Lint
npm run lint

# Run tests (runs lint + build first)
npm run pretest && npm run test

# Package extension
npm run build

# Publish to marketplace
npm run publish
```

## Build System

Uses esbuild to minify both JS and CSS:
- Input: `src/md-toc-sidebar.{js,css}`
- Output: `out/md-toc-sidebar.min.{js,css}`
- The `vscode:prepublish` script runs automatically before publishing

## Code Architecture

**Initialization Flow**:
1. `document.onreadystatechange` waits for DOM ready
2. Checks for `.markdown-body` element (VSCode's markdown preview container)
3. If not found, removes injected CSS (preview is not markdown)
4. If found, calls `start()` to initialize

**Core Functions**:
- `start()` - Creates toggle button, sets up ESC key listener, checks LocalStorage for sidebar visibility preference
- `generateSidebar()` - Creates sidebar wrapper and calls `generateToc()`
- `generateToc()` - Parses h1-h6 headers, builds nested `<ul>` structure with proper hierarchy
- `toggleSidebar()` - Core toggle logic for showing/hiding sidebar
- `toggleSidebarStatusListener()` - Handles button click events for toggling

**State Management**:
- Sidebar visibility stored in LocalStorage with key `"toc-sidebar-visibility"`
- Note: LocalStorage may be disabled depending on VSCode's webview implementation

## Testing

Test file: `test/extension.test.js`
Uses Mocha test framework (@vscode/test-electron for VSCode extension testing)

## Localization

Supports English, Russian, and Chinese (Simplified):
- Translations defined in `translations` object in `md-toc-sidebar.js`
- Auto-detects browser language via `navigator.language`
- Can be manually overridden by setting `localStorage.setItem("toc-sidebar-language", "en"|"ru"|"zh")`
- Defaults to English if browser language is not supported
- Localized strings: sidebar header, empty state message, LocalStorage error messages
