# Frequently Asked Questions (FAQ)

Quick answers to common questions about Markdown Preview TOC Sidebar.

## General Questions

### Q: What does this extension do?

**A:** It adds an automatic table of contents sidebar to VS Code's markdown preview, allowing you to navigate long documents easily by clicking on headers.

### Q: Why do I need this if VS Code has an Outline view?

**A:** VS Code's built-in Outline view doesn't work with the Markdown Preview webview. This extension fills that gap by injecting a TOC directly into the preview pane.

### Q: Is this extension free?

**A:** Yes, it's completely free and open source under the MIT license.

### Q: Does it work offline?

**A:** Yes, the extension works entirely offline. No internet connection required.

## Installation & Setup

### Q: How do I install the extension?

**A:** Three ways:
1. **VS Code Marketplace**: Search for "Markdown Preview TOC Sidebar" in Extensions view
2. **Command Line**: `code --install-extension publisher.markdown-preview-toc-sidebar`
3. **VSIX File**: Download and install manually via "Extensions: Install from VSIX..."

### Q: Do I need to configure anything after installation?

**A:** No configuration needed! The extension works automatically when you open any markdown preview.

### Q: What versions of VS Code are supported?

**A:** VS Code version 1.70.0 or higher is required.

### Q: Does it work with VS Code Insiders?

**A:** Yes, it works with both stable and Insiders versions of VS Code.

## Usage Questions

### Q: How do I show/hide the TOC sidebar?

**A:** Two ways:
- Press `ESC` while the preview is focused
- Click the hamburger menu (☰) icon in the top-left corner

### Q: Why doesn't the ESC key work?

**A:** The preview pane must be focused. Click anywhere in the preview first, then press ESC.

### Q: Can I change the keyboard shortcut?

**A:** The ESC key is built into the extension. For custom shortcuts, you can create keybindings to focus the preview and then trigger ESC programmatically.

### Q: How do I navigate to a section?

**A:** Simply click on any header in the TOC sidebar. The preview will smoothly scroll to that section.

### Q: Does it work with all header levels?

**A:** Yes, it supports all six markdown header levels (h1 through h6):
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

## Features & Functionality

### Q: Can I customize the sidebar width?

**A:** The sidebar width is currently fixed at 250px for consistency. This may become configurable in future versions.

### Q: Does it support multiple languages?

**A:** Yes! 13 languages are supported:
- English, Russian, Chinese, Japanese, French, German, Dutch
- Spanish, Portuguese, Italian, Korean, Polish, Turkish

The extension auto-detects your browser language.

### Q: How do I change the language?

**A:** Open the browser console in preview (F12) and run:
```javascript
localStorage.setItem('toc-sidebar-language', 'en') // or 'zh', 'ja', etc.
```

### Q: Does it remember my preference for showing/hiding?

**A:** Yes, your visibility preference is saved in LocalStorage and persists across sessions.

### Q: Can I have different settings for different projects?

**A:** Currently, settings are stored per workspace, so yes, different projects can have different states.

## Compatibility

### Q: Does it work with other markdown extensions?

**A:** Yes, it's compatible with most markdown extensions including:
- Markdown All in One
- Markdown Preview Enhanced (basic compatibility)
- markdownlint
- Markdown PDF

### Q: Does it work with custom markdown preview themes?

**A:** Yes, the TOC sidebar adapts to your chosen markdown preview theme automatically.

### Q: Does it support GitHub Flavored Markdown?

**A:** Yes, any markdown that VS Code's preview can render will work with the TOC.

### Q: Does it work with Jupyter notebooks?

**A:** No, this extension is specifically for markdown files (`.md` or `.markdown`). Jupyter notebooks have their own TOC functionality.

## Technical Questions

### Q: How does the extension work?

**A:** It uses VS Code's markdown extension API to inject JavaScript and CSS into the preview webview. The script collects headers and generates the TOC dynamically.

### Q: Does it affect editor performance?

**A:** No, the extension only runs in the preview pane and has minimal performance impact. It doesn't affect editor performance at all.

### Q: Is my data private?

**A:** Yes, the extension:
- Runs entirely locally
- Doesn't collect any data
- Doesn't make network requests
- Only stores visibility preference in local browser storage

### Q: What happens if LocalStorage is disabled?

**A:** The extension still works, but won't remember your show/hide preference between sessions.

## Troubleshooting

### Q: The TOC isn't showing up. What should I do?

**A:** Quick checklist:
1. Is your file `.md` or `.markdown`?
2. Are you in Preview mode (not Source)?
3. Does your document have headers?
4. Try reloading: `Cmd+R` / `Ctrl+R`

### Q: Headers in my document aren't appearing in the TOC?

**A:** Check your markdown syntax:
- ✅ `# Header` (space after #)
- ❌ `#Header` (no space)
- ❌ `# Header #` (trailing #)

### Q: The sidebar is in the wrong language?

**A:** The extension auto-detects browser language. To override:
```javascript
// In preview console (F12)
localStorage.setItem('toc-sidebar-language', 'en')
```

### Q: It worked before but stopped working?

**A:** Try these in order:
1. Reload window: `Cmd+R` / `Ctrl+R`
2. Disable and re-enable extension
3. Restart VS Code
4. Reinstall extension

## Limitations

### Q: Can I export the TOC with my document?

**A:** The TOC is only visible in VS Code's preview. For PDF export or HTML generation, consider using extensions like "Markdown PDF" which have their own TOC generation.

### Q: Can I customize the TOC styling?

**A:** Not directly through settings. The extension uses minimal styling that adapts to your theme. Custom CSS injection may be added in future versions.

### Q: Does it support wiki-style links?

**A:** The TOC works with standard markdown headers only. Wiki links in content are supported but don't affect TOC generation.

### Q: Can I exclude certain headers from the TOC?

**A:** Currently, all headers are included. Selective exclusion may be added in future versions.

## Mobile & Remote

### Q: Does it work with VS Code in the browser (vscode.dev)?

**A:** No, browser-based VS Code has limitations with extensions that inject scripts. Use desktop VS Code for full functionality.

### Q: Does it work with Remote Development?

**A:** Yes, it works with:
- Remote - SSH
- Remote - Containers
- Remote - WSL
- GitHub Codespaces (desktop client)

### Q: Can I use it on iPad with VS Code?

**A:** Native VS Code isn't available on iPad. Alternative code editors on iPad don't support VS Code extensions.

## Contributing & Development

### Q: Is this open source?

**A:** Yes! The source code is available on [GitHub](https://github.com/your-username/VSCode_Markdown-Preview-TOC-Sidebar).

### Q: How can I contribute?

**A:** We welcome contributions! You can:
- Report bugs via GitHub Issues
- Submit pull requests with improvements
- Improve documentation
- Add translations for new languages

### Q: How do I build from source?

**A:** Clone the repository and run:
```bash
npm install
npm run build
```

### Q: Can I fork this for my own use?

**A:** Yes, the MIT license allows forking, modification, and redistribution.

## Future Features

### Q: Will you add [feature X]?

**A:** Check the [GitHub Issues](https://github.com/your-username/VSCode_Markdown-Preview-TOC-Sidebar/issues) for planned features. Feel free to suggest new features there!

### Q: Planned improvements?

**A:** Potential future features include:
- Configurable sidebar width
- Custom CSS support
- Collapsible sections
- Search within TOC
- Export TOC as markdown

### Q: How often is the extension updated?

**A:** Updates are released as needed for:
- Bug fixes
- VS Code compatibility
- New features based on user feedback
- Security updates

## Common Misconceptions

### Q: Does this modify my markdown files?

**A:** No, the extension only affects the preview display. Your markdown files remain unchanged.

### Q: Do I need to add special syntax for the TOC?

**A:** No, it works with standard markdown headers automatically. No special syntax required.

### Q: Will it slow down my editor?

**A:** No, the extension only runs in the preview pane and doesn't affect editor performance.

### Q: Does it require an internet connection?

**A:** No, it works completely offline.

## Getting Help

### Q: Where can I get help?

**A:** Several options:
1. Check this FAQ
2. Read the [Troubleshooting Guide](troubleshooting.md)
3. Search [GitHub Issues](https://github.com/your-username/VSCode_Markdown-Preview-TOC-Sidebar/issues)
4. Create a new issue with details

### Q: How do I report a bug?

**A:** Create an issue on GitHub with:
- VS Code version
- Extension version
- Operating system
- Steps to reproduce
- Expected vs. actual behavior

### Q: Is there a community forum?

**A:** Use GitHub Discussions for questions and community support.

---

💡 **Didn't find your answer?** Check the [documentation](../getting-started.md) or [create an issue](https://github.com/your-username/VSCode_Markdown-Preview-TOC-Sidebar/issues/new) on GitHub!