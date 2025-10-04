# Markdown Preview - TOC Sidebar

**English | [Русский](README.ru.md)**

A VSCode extension that adds a table of contents sidebar to Markdown Preview.

The extension injects a JavaScript file into the markdown preview page that collects headers and generates a sidebar from them. Implementation is based on VSCode's built-in mechanism: <https://code.visualstudio.com/api/extension-guides/markdown-extension>.

## The Problem It Solves

VSCode's built-in "Outline" view is not configured to work with the Webview API used by Markdown Preview.

## Features

- **Auto Table of Contents**: Automatically generates a navigable sidebar from document headers (h1-h6)
- **Keyboard Shortcut**: Press `ESC` to toggle sidebar visibility
- **Responsive Design**: Adapts to different screen sizes with a breakpoint at 1366px
- **Persistent State**: Remembers sidebar visibility preference in LocalStorage
- **Multi-language Support**: Automatically detects browser language (English, Russian, Chinese)

## Language Support

The extension automatically detects your browser language and supports:
- **English** (en)
- **Русский** (ru) - Russian
- **简体中文** (zh) - Simplified Chinese

To manually set the language, open browser console in markdown preview and run:
```javascript
localStorage.setItem("toc-sidebar-language", "en") // or "ru" or "zh"
```

## Note

The sidebar visibility state is stored in LocalStorage. Depending on future VSCode Webview implementation changes, this setting may become disabled.

![Screenshot](https://raw.githubusercontent.com/Aligotr/VSCode_Markdown-Preview-TOC-Sidebar/refs/heads/main/assets/docs/Screenshot.jpg)

## Credits

Forked from [Aligotr/VSCode_Markdown-Preview-TOC-Sidebar](https://github.com/Aligotr/VSCode_Markdown-Preview-TOC-Sidebar)
