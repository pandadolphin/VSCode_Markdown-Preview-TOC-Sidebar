# Getting Started Guide

Welcome to Markdown Preview TOC Sidebar! This guide will help you get up and running in just a few minutes.

## Prerequisites

Before you begin, ensure you have:
- **Visual Studio Code** version 1.70.0 or later installed
- A markdown file to work with (we'll create one if you don't have any)

## Installation

### Method 1: Install from VS Code Marketplace (Recommended)

1. **Open VS Code**
2. **Open Extensions View**
   - Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Windows/Linux)
   - Or click the Extensions icon in the Activity Bar
3. **Search for the Extension**
   - Type "Markdown Preview TOC Sidebar" in the search box
4. **Install**
   - Click the blue "Install" button
   - VS Code will download and install the extension automatically

### Method 2: Install from VSIX File

If you have a `.vsix` file (for development or pre-release versions):

1. **Open Command Palette**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. **Run Install Command**
   - Type "Extensions: Install from VSIX..."
   - Press Enter
3. **Select File**
   - Navigate to your `.vsix` file
   - Click "Install"

### Method 3: Install via Command Line

```bash
code --install-extension markdown-preview-toc-sidebar-1.0.2.vsix
```

## Your First Table of Contents

Let's create your first markdown document with a table of contents:

### Step 1: Create a Sample Markdown File

1. Create a new file in VS Code (`Cmd+N` or `Ctrl+N`)
2. Save it with a `.md` extension (e.g., `sample.md`)
3. Add the following sample content:

```markdown
# My Document

## Introduction
Welcome to this sample document!

## Main Content

### Section 1
This is the first section of content.

#### Subsection 1.1
Details about the first subsection.

#### Subsection 1.2
More details here.

### Section 2
This is the second section.

## Conclusion
Thanks for reading!
```

### Step 2: Open Markdown Preview

Open the markdown preview using any of these methods:

- **Keyboard Shortcut**: Press `Cmd+Shift+V` (macOS) or `Ctrl+Shift+V` (Windows/Linux)
- **Command Palette**:
  1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
  2. Type "Markdown: Open Preview"
  3. Press Enter
- **Editor Icon**: Click the preview icon in the top right corner of the editor

### Step 3: See the TOC Sidebar

🎉 **That's it!** The table of contents sidebar should appear automatically on the left side of your preview.

The TOC will show:
- All headers from your document (h1-h6)
- Nested structure matching your document hierarchy
- Clickable links to jump to any section

### Step 4: Toggle the Sidebar

Try toggling the sidebar visibility:

- **Press `ESC`** while the preview is focused
- Or **click the hamburger menu icon** (☰) in the top-left corner

Your preference will be saved and remembered for next time!

## What's Next?

Now that you have the basics working, explore these features:

### 📚 Learn More
- [Basic Usage Guide](usage/basic-usage.md) - Detailed feature walkthrough
- [Keyboard Shortcuts](usage/keyboard-shortcuts.md) - All available shortcuts
- [Multi-language Support](usage/configuration.md#language-settings) - Configure language preferences

### 🎨 Customize Your Experience
- Change the sidebar language
- Adjust responsive behavior
- Configure persistent settings

### 🔧 Advanced Topics
- [Troubleshooting Guide](guides/troubleshooting.md) - Solutions to common issues
- [Development Setup](../CLAUDE.md#development-commands) - Contribute to the extension

## Quick Tips

💡 **Pro Tips for Better Experience:**

1. **Large Documents**: The TOC is especially useful for documents with many sections
2. **Keyboard Navigation**: Use `ESC` for quick toggling without reaching for the mouse
3. **Side-by-Side Mode**: Open preview to the side (`Cmd+K V`) to edit and navigate simultaneously
4. **Multiple Previews**: Each preview window maintains its own TOC sidebar state

## Need Help?

If you encounter any issues:
1. Check our [Troubleshooting Guide](guides/troubleshooting.md)
2. Review the [FAQ](guides/faq.md)
3. Report issues on [GitHub](https://github.com/your-username/VSCode_Markdown-Preview-TOC-Sidebar/issues)

---

**Ready to boost your markdown productivity?** Start using the TOC sidebar with your own documents and enjoy seamless navigation! 🚀