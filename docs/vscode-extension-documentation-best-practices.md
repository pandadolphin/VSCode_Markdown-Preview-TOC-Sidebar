# Best Practices f r VSCode Extension Documentation

A comprehensive guide for creating effective user documentation for Visual Studio Code extensions.

## Table of Contents

- [Documentation Structure](#documentation-structure)
- [README.md Best Practices](#readmemd-best-practices)
- [Getting Started Guide](#getting-started-guide)
- [Usage Documentation](#usage-documentation)
- [Visual Documentation](#visual-documentation)
- [Configuration Documentation](#configuration-documentation)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Interactive Elements](#interactive-elements)
- [Version-Specific Documentation](#version-specific-documentation)
- [Search and Discovery](#search-and-discovery)
- [Examples of Well-Documented Extensions](#examples-of-well-documented-extensions)
- [Documentation Tools and Resources](#documentation-tools-and-resources)

## Documentation Structure

Organize your extension documentation into logical sections that users can easily navigate. A well-structured documentation tree helps users find information quickly.

### Recommended Directory Structure

```
docs/
├── getting-started.md           # Quick setup and first use
├── usage/
│   ├── basic-usage.md          # Core features with GIFs/screenshots
│   ├── keyboard-shortcuts.md   # All keyboard shortcuts
│   ├── commands.md             # Command palette commands
│   └── configuration.md        # Settings and customization
├── guides/
│   ├── advanced-usage.md      # Power user features
│   ├── troubleshooting.md     # Common issues and solutions
│   ├── faq.md                 # Frequently asked questions
│   └── migration-guide.md     # For version upgrades
├── api-reference.md            # If extension provides API
├── contributing.md             # For open-source projects
└── images/                     # Screenshots and GIFs
    ├── features/
    └── tutorials/
```

### Key Principles

- **Progressive Disclosure**: Start simple, add complexity gradually
- **Task-Oriented**: Organize by what users want to do, not by features
- **Searchable**: Use clear, descriptive headings with keywords
- **Maintainable**: Keep docs close to code, update with each release

## README.md Best Practices

The README is your extension's landing page. It should be compelling, informative, and guide users to take action.

### Structure Template

```markdown
# Extension Name

Brief, compelling description (1-2 sentences) that explains what problem it solves.

![Hero Image/GIF showing the extension in action](link-to-image)

## ✨ Features

- **Feature 1**: Brief description with [link to details]
- **Feature 2**: Brief description with [link to details]
- **Feature 3**: Brief description with [link to details]

## 🚀 Quick Start

1. Install from [VS Code Marketplace](marketplace-link) or run:
   ```
   ext install publisher.extension-name
   ```
2. Open any relevant file type
3. Use `Cmd+Shift+P` and run "Extension: Command Name"
4. See the magic happen!

## 📖 Documentation

- [Getting Started](docs/getting-started.md)
- [Usage Guide](docs/usage/basic-usage.md)
- [Configuration](docs/usage/configuration.md)
- [Troubleshooting](docs/guides/troubleshooting.md)

## 🎯 Requirements

- VS Code version X.X.X or higher
- Any other dependencies

## ⚙️ Extension Settings

This extension contributes the following settings:

- `extension.setting1`: Description (default: `value`)
- `extension.setting2`: Description (default: `value`)

## 📝 Known Issues

- Issue 1 with [workaround]
- Issue 2 being tracked in [#issue-number]

## 📄 License

[License Type](LICENSE)
```

### Best Practices

- **Keep it concise**: Under 500 lines for main content
- **Use badges**: Version, downloads, ratings, build status
- **Include visuals**: Hero GIF within first screen
- **Clear CTAs**: Make installation obvious
- **Link extensively**: Connect to detailed docs

## Getting Started Guide

The Getting Started guide should get users from zero to first success as quickly as possible.

### Essential Sections

#### 1. Prerequisites
```markdown
## Prerequisites

Before you begin, ensure you have:
- Visual Studio Code version 1.70.0 or later
- [Any required extensions]
- [System requirements]
```

#### 2. Installation
```markdown
## Installation

### From VS Code Marketplace
1. Open VS Code
2. Press `Cmd+Shift+X` to open Extensions view
3. Search for "Extension Name"
4. Click Install

### From VSIX File
1. Download the `.vsix` file from [releases]
2. Run `code --install-extension extension-name.vsix`

### From Source
1. Clone the repository
2. Run `npm install`
3. Press `F5` to run in development mode
```

#### 3. First Steps
```markdown
## Your First [Task]

Let's create your first [thing] in under 2 minutes:

1. Create a new file called `example.md`
2. Add some content
3. Press `Cmd+Shift+P` and run "Extension: Command"
4. You should see [expected result]

![Animation showing these steps](images/quickstart.gif)

🎉 Congratulations! You've just [accomplished task].
```

#### 4. Next Steps
```markdown
## What's Next?

Now that you've got the basics:
- [Learn about advanced features](usage/advanced-usage.md)
- [Customize settings](usage/configuration.md)
- [Explore keyboard shortcuts](usage/keyboard-shortcuts.md)
```

## Usage Documentation

Each feature should have comprehensive documentation that answers: what, why, how, and when.

### Feature Documentation Template

```markdown
## Feature Name

### What It Does
Brief description of the feature's purpose and benefit.

### When to Use It
Scenarios where this feature is most helpful.

### How to Use It

#### Method 1: Keyboard Shortcut
Press `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)

![GIF showing keyboard shortcut](images/feature-keyboard.gif)

#### Method 2: Command Palette
1. Press `Cmd+Shift+P`
2. Type "Extension: Feature Name"
3. Press Enter

![GIF showing command palette](images/feature-command.gif)

#### Method 3: Context Menu
Right-click in the editor and select "Feature Name"

![Screenshot of context menu](images/feature-context-menu.png)

### Configuration Options

| Setting | Description | Default | Options |
|---------|------------|---------|---------|
| `extension.featureEnabled` | Enable/disable this feature | `true` | `true`, `false` |
| `extension.featureMode` | Operating mode | `"auto"` | `"auto"`, `"manual"`, `"smart"` |

### Examples

#### Example 1: Basic Usage
```
[Code example with explanation]
```

#### Example 2: Advanced Usage
```
[More complex example]
```

### Tips and Tricks
- 💡 **Pro tip**: Hold `Alt` while clicking for additional options
- ⚡ **Performance**: For large files, consider enabling X setting

### Related Features
- [Related Feature 1](related-feature-1.md)
- [Related Feature 2](related-feature-2.md)
```

## Visual Documentation

Visual content dramatically improves documentation effectiveness. Users understand features faster with GIFs and screenshots.

### Guidelines for Visual Content

#### GIFs
- **When to use**: Demonstrating interactions, workflows, or animations
- **Tools**:
  - [LICEcap](https://www.cockos.com/licecap/) (Windows/Mac)
  - [Gifox](https://gifox.app/) (Mac)
  - [Peek](https://github.com/phw/peek) (Linux)
  - [ScreenToGif](https://www.screentogif.com/) (Windows)
- **Optimization**:
  - Keep under 2MB for README
  - Use [ezgif.com](https://ezgif.com/optimize) to compress
  - Dimensions: 800px width maximum
  - Frame rate: 10-15 fps is usually sufficient
- **Recording tips**:
  - Clean desktop/editor
  - Consistent theme
  - Slow, deliberate movements
  - Highlight cursor if needed

#### Screenshots
- **When to use**: Static UI elements, settings, results
- **Format**: PNG for UI, JPG for photos
- **Annotations**: Add arrows, boxes, numbers for clarity
- **Tools**:
  - Built-in OS tools
  - [Snagit](https://www.techsmith.com/snagit)
  - [ShareX](https://getsharex.com/) (Windows)
  - [Shottr](https://shottr.cc/) (Mac)

#### Naming Convention
```
feature-name-action-type.ext
Examples:
- toggle-sidebar-keyboard.gif
- settings-panel-overview.png
- error-message-example.png
```

## Configuration Documentation

Document every configuration option thoroughly. Users need to understand what each setting does and when to change it.

### Configuration Documentation Template

```markdown
## Configuration Reference

### General Settings

#### `extension.enableFeature`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enables or disables the main feature
- **Example**:
  ```json
  {
    "extension.enableFeature": false
  }
  ```
- **When to change**: Disable if experiencing performance issues

#### `extension.mode`
- **Type**: `string`
- **Default**: `"auto"`
- **Options**:
  - `"auto"` - Automatically detect best mode
  - `"manual"` - Require user interaction
  - `"aggressive"` - Process immediately
- **Description**: Controls how the extension processes files
- **Example**:
  ```json
  {
    "extension.mode": "manual"
  }
  ```

### Advanced Settings

#### `extension.performance.cacheSize`
- **Type**: `number`
- **Default**: `100`
- **Range**: `0` to `1000`
- **Description**: Maximum number of items to cache in memory
- **Performance Impact**: Higher values increase memory usage but improve speed
- **Recommendation**: Increase for large projects, decrease for limited RAM

### Setting Profiles

#### Minimal Configuration
```json
{
  "extension.enableFeature": true,
  "extension.mode": "manual"
}
```

#### Power User Configuration
```json
{
  "extension.enableFeature": true,
  "extension.mode": "aggressive",
  "extension.performance.cacheSize": 500,
  "extension.advanced.experimentalFeatures": true
}
```
```

## Troubleshooting Guide

A well-structured troubleshooting guide saves users frustration and reduces support burden.

### Troubleshooting Template

```markdown
# Troubleshooting Guide

## Quick Fixes
Try these first:
1. Reload VS Code window: `Cmd+R` (Mac) / `Ctrl+R` (Windows/Linux)
2. Disable and re-enable the extension
3. Update to the latest version
4. Check the [Known Issues](link) section

## Common Issues

### Issue: Extension Not Activating

**Symptoms:**
- No extension features appear
- Commands not found in command palette
- Status bar item missing

**Possible Causes:**
1. VS Code version incompatibility
2. Conflicting extensions
3. Corrupted installation

**Solutions:**

#### Check VS Code Version
1. Open `Help > About`
2. Verify version is X.X.X or higher
3. Update if necessary

#### Check for Conflicts
1. Disable all other extensions
2. Restart VS Code
3. Enable extensions one by one to identify conflict

#### Reinstall Extension
```bash
code --uninstall-extension publisher.extension-name
code --install-extension publisher.extension-name
```

**Still not working?**
- Check developer console: `Help > Toggle Developer Tools`
- Look for error messages related to the extension
- [Report an issue](link) with console output

### Issue: Performance Problems

**Symptoms:**
- Editor becomes slow
- High CPU usage
- Freezing or hanging

**Diagnostic Steps:**
1. Open Process Explorer: `Cmd+Shift+P` > "Process Explorer"
2. Check extension host CPU usage
3. Profile the extension:
   ```
   Developer: Start Extension Host Profile
   [Reproduce issue]
   Developer: Stop Extension Host Profile
   ```

**Solutions:**
- Reduce cache size in settings
- Disable real-time features
- Exclude large directories
```

### Error Message Reference

```markdown
## Error Messages

### "Extension failed to activate"
**Meaning**: The extension crashed during startup
**Solution**: Check logs at `~/.vscode/logs/extension-name/`

### "Cannot read property 'X' of undefined"
**Meaning**: Missing required configuration
**Solution**: Reset settings to defaults
```

## Interactive Elements

Enhance documentation with interactive elements that improve navigation and usability.

### Navigation Aids

#### Table of Contents
```markdown
## Table of Contents
- [Installation](#installation)
  - [From Marketplace](#from-marketplace)
  - [From Source](#from-source)
- [Configuration](#configuration)
- [Usage](#usage)
```

#### Anchor Links
```markdown
See [Configuration section](#configuration) for details.

<a name="configuration"></a>
## Configuration
```

#### Back to Top Links
```markdown
[⬆ Back to top](#table-of-contents)
```

### Code Snippets

#### Copyable Code Blocks
````markdown
```bash
# Users can copy this entire block
npm install
npm run build
npm test
```
````

#### Inline Code with Context
```markdown
Run `npm run build` to compile the extension, or use the build task in VS Code (`Cmd+Shift+B`).
```

### Collapsible Sections

```markdown
<details>
<summary>📋 Full Configuration Example (click to expand)</summary>

```json
{
  "extension.setting1": "value",
  "extension.setting2": true,
  // ... long configuration
}
```

</details>
```

### Callout Boxes

```markdown
> **Note:** This feature requires VS Code 1.70.0 or later

> ⚠️ **Warning:** Changing this setting may affect performance

> 💡 **Tip:** Use `Cmd+K Cmd+S` to quickly access keyboard shortcuts

> ❌ **Deprecation Notice:** This feature will be removed in v2.0.0
```

## Version-Specific Documentation

Maintain clear version documentation to help users navigate changes.

### Changelog Best Practices

```markdown
# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]
### Added
- New feature X (experimental)

## [1.2.0] - 2024-01-15
### Added
- ✨ New sidebar toggle animation
- 🎨 Custom theme support

### Changed
- ⚡ Improved performance by 50%
- 🔧 Updated default settings

### Fixed
- 🐛 Fixed sidebar not appearing on first load (#123)

### Deprecated
- ⚠️ `oldSetting` will be removed in 2.0.0, use `newSetting` instead

### Breaking Changes
- 💥 Changed command from `extension.doThing` to `extension.feature.doThing`
```

### Migration Guides

```markdown
# Migrating from v1.x to v2.0

## Breaking Changes

### Changed Command Names
Old commands have been reorganized under feature namespaces:

| Old Command | New Command |
|-------------|-------------|
| `extension.toggle` | `extension.sidebar.toggle` |
| `extension.refresh` | `extension.view.refresh` |

Update your keybindings in `keybindings.json`:
```json
// Before
{
  "key": "cmd+k",
  "command": "extension.toggle"
}

// After
{
  "key": "cmd+k",
  "command": "extension.sidebar.toggle"
}
```

### Removed Settings
The following settings have been removed:
- `extension.legacyMode` - No longer needed
- `extension.oldCache` - Replaced by `extension.performance.cache`

## New Features
Take advantage of these new capabilities:
- [Feature A](docs/features/feature-a.md)
- [Feature B](docs/features/feature-b.md)
```

## Search and Discovery

Optimize documentation for findability.

### SEO Best Practices

#### Use Descriptive Headings
```markdown
❌ Bad: "Setup"
✅ Good: "Installing and Configuring the Markdown TOC Extension"
```

#### Include Keywords
```markdown
## Keyboard Shortcuts (Hotkeys, Key Bindings, Keybindings)

The extension supports the following keyboard shortcuts...
```

#### Create an Index
```markdown
# Index

## A
- [Activation Events](api-reference.md#activation-events)
- [API Reference](api-reference.md)
- [Auto-save](configuration.md#auto-save)

## B
- [Backwards Compatibility](migration-guide.md#backwards-compatibility)
- [Build Process](contributing.md#build-process)
```

### Glossary

```markdown
# Glossary

**Activation Event**: A VS Code event that triggers extension activation

**Command Palette**: The quick-pick interface (`Cmd+Shift+P`) for running commands

**Extension Host**: The separate process where extensions run

**Webview**: An iframe that can display custom HTML content
```

## Examples of Well-Documented Extensions

Study these extensions for documentation inspiration:

### [GitLens](https://github.com/gitkraken/vscode-gitlens)
- **Strengths**:
  - Extensive GIF demonstrations
  - Interactive settings editor
  - Comprehensive feature tours
- **Learn from**: Visual documentation approach

### [Prettier](https://github.com/prettier/prettier-vscode)
- **Strengths**:
  - Clear configuration examples
  - Language-specific documentation
  - Troubleshooting decision tree
- **Learn from**: Configuration documentation

### [ESLint](https://github.com/Microsoft/vscode-eslint)
- **Strengths**:
  - Detailed troubleshooting
  - Migration guides
  - Performance tuning docs
- **Learn from**: Technical depth and debugging guides

### [Live Server](https://github.com/ritwickdey/vscode-live-server)
- **Strengths**:
  - Simple, effective GIFs
  - Quick start focus
  - FAQ section
- **Learn from**: Simplicity and clarity

### [Python Extension](https://github.com/microsoft/vscode-python)
- **Strengths**:
  - Comprehensive tutorials
  - Environment-specific guides
  - Rich troubleshooting
- **Learn from**: Handling complexity

### [REST Client](https://github.com/Huachao/vscode-restclient)
- **Strengths**:
  - Extensive examples
  - Feature comparison tables
  - Environment variables guide
- **Learn from**: Example-driven documentation

## Documentation Tools and Resources

### Documentation Generators
- [TypeDoc](https://typedoc.org/) - Generate API docs from TypeScript
- [JSDoc](https://jsdoc.app/) - Generate API docs from JavaScript
- [Docusaurus](https://docusaurus.io/) - Full documentation sites
- [VuePress](https://vuepress.vuejs.org/) - Vue-powered static site generator

### Markdown Tools
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) - VS Code extension for markdown editing
- [markdownlint](https://github.com/DavidAnson/markdownlint) - Markdown linting
- [Mermaid](https://mermaid-js.github.io/) - Diagrams in markdown

### Screenshot and Recording Tools
- [Carbon](https://carbon.now.sh/) - Beautiful code screenshots
- [Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode) - VS Code extension for code screenshots
- [Kap](https://getkap.co/) - Screen recorder for macOS
- [OBS Studio](https://obsproject.com/) - Advanced recording

### Hosting Documentation
- [GitHub Pages](https://pages.github.com/) - Free hosting from repository
- [GitBook](https://www.gitbook.com/) - Documentation platform
- [Read the Docs](https://readthedocs.org/) - Documentation hosting
- [Netlify](https://www.netlify.com/) - Static site hosting

### Analytics and Feedback
- [Google Analytics](https://analytics.google.com/) - Track documentation usage
- [Hotjar](https://www.hotjar.com/) - Understand user behavior
- [Utterances](https://utteranc.es/) - GitHub issues as comments

## Conclusion

Great documentation is an investment that pays dividends through:
- **Reduced support burden** - Users find answers themselves
- **Increased adoption** - Lower barriers to entry
- **Better user experience** - Users succeed faster
- **Community growth** - Clear contribution guidelines

Remember: Documentation is a product feature. Treat it with the same care as your code.

### Documentation Checklist

Before each release, verify:

- [ ] README is up to date
- [ ] New features are documented
- [ ] Settings changes are reflected
- [ ] Screenshots/GIFs are current
- [ ] Changelog is updated
- [ ] Migration guide for breaking changes
- [ ] Examples work with new version
- [ ] Links are not broken
- [ ] Search terms are included
- [ ] Troubleshooting covers new issues

---

*This guide is based on analysis of successful VS Code extensions and documentation best practices in the developer community.*