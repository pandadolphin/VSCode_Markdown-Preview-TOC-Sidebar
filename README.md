# Markdown Preview - TOC Sidebar

Navigate long markdown documents effortlessly with an auto-generated table of contents sidebar in your VS Code preview.

![Screenshot](https://raw.githubusercontent.com/Aligotr/VSCode_Markdown-Preview-TOC-Sidebar/refs/heads/main/assets/docs/Screenshot.jpg)

## ✨ Features

- **📑 Auto Table of Contents**: Automatically generates a navigable sidebar from document headers (h1-h6)
- **⌨️ Keyboard Shortcut**: Press `ESC` to toggle sidebar visibility instantly
- **📱 Responsive Design**: Adapts to different screen sizes with a smart breakpoint at 1366px
- **💾 Persistent State**: Remembers your sidebar preference across sessions
- **🌍 Multi-language Support**: Auto-detects browser language (13 languages supported)

## 🚀 Quick Start

1. **Install the Extension**
   - Open VS Code
   - Search for "Markdown Preview TOC Sidebar" in Extensions view (`Cmd+Shift+X`)
   - Click Install

2. **Use It**
   - Open any `.md` file
   - Open markdown preview (`Cmd+Shift+V` or `Ctrl+Shift+V`)
   - The TOC sidebar appears automatically!

3. **Toggle Visibility**
   - Press `ESC` to show/hide the sidebar
   - Or click the hamburger menu icon in the top-left corner

## 🎯 Why This Extension?

VS Code's built-in "Outline" view doesn't work with the Markdown Preview's webview. This extension fills that gap by injecting a lightweight TOC directly into your preview pane, providing seamless navigation for long documents.

## 📖 Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Installation & Publishing](docs/installation-and-publishing.md)
- [UI/UX Improvements](docs/UI_UX_IMPROVEMENTS.md)
- [VS Code Extension Documentation Best Practices](docs/vscode-extension-documentation-best-practices.md)

## 🌍 Language Support

The extension automatically detects your browser language and supports:

| Language | Code | | Language | Code |
|----------|------|---|----------|------|
| English | `en` | | Español | `es` |
| Русский | `ru` | | Português | `pt` |
| 简体中文 | `zh` | | Italiano | `it` |
| 日本語 | `ja` | | 한국어 | `ko` |
| Français | `fr` | | Polski | `pl` |
| Deutsch | `de` | | Türkçe | `tr` |
| Nederlands | `nl` | | | |

To manually set the language:
```javascript
// Open browser console in markdown preview (F12)
localStorage.setItem("toc-sidebar-language", "en") // or any supported language code
```

## ⚙️ Extension Settings

This extension stores preferences in LocalStorage:
- **Sidebar Visibility**: Your show/hide preference is automatically saved
- **Language Preference**: Override auto-detection with manual selection

> **Note**: LocalStorage settings may be affected by future VS Code webview implementation changes.

## 🛠️ Development

### Prerequisites
- Node.js 14.x or higher
- VS Code 1.70.0 or higher

### Build Commands
```bash
# Install dependencies
npm install

# Build and minify
npm run build

# Development build with sourcemaps
npm run esbuild

# Run tests
npm test

# Package extension
npm run package
```

### Architecture
The extension uses VS Code's [Markdown Extension API](https://code.visualstudio.com/api/extension-guides/markdown-extension) to inject custom JavaScript and CSS into the preview webview. No traditional extension activation is required - scripts run directly in the preview context.

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Credits

Forked from [Aligotr/VSCode_Markdown-Preview-TOC-Sidebar](https://github.com/Aligotr/VSCode_Markdown-Preview-TOC-Sidebar)
