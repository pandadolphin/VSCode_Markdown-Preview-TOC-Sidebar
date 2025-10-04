# Documentation Images

This directory contains screenshots and GIFs for the documentation.

## Required Images

### For Getting Started Guide

- [ ] `quickstart.gif` - Animated GIF showing the complete flow from opening a markdown file to using the TOC
- [ ] `installation.png` - Screenshot of extension in VS Code marketplace
- [ ] `first-toc.png` - Screenshot showing a simple TOC sidebar with a basic document

### For Basic Usage Guide

- [ ] `toggle-sidebar.gif` - Animation of pressing ESC to toggle sidebar
- [ ] `click-navigation.gif` - Animation of clicking TOC items to navigate
- [ ] `scroll-sync.gif` - Animation showing scroll position highlighting in TOC
- [ ] `nested-structure.png` - Screenshot showing hierarchical TOC structure
- [ ] `responsive-breakpoint.gif` - Animation showing responsive behavior at 1366px
- [ ] `side-by-side.png` - Screenshot of editor and preview side-by-side with TOC
- [ ] `hamburger-menu.png` - Close-up of the hamburger menu icon

### For Keyboard Shortcuts

- [ ] `keyboard-esc.gif` - Animation of ESC key toggling
- [ ] `preview-shortcuts.png` - Visual keyboard layout showing shortcuts

### For Troubleshooting

- [ ] `no-headers-message.png` - Screenshot showing "Headers not found" message
- [ ] `console-debug.png` - Screenshot of browser console with debug info
- [ ] `extensions-view.png` - Screenshot showing the extension in Extensions view

### For Features Showcase

- [ ] `multi-language.png` - Screenshot showing TOC in different languages
- [ ] `theme-adaptation.png` - Screenshots showing TOC with different VS Code themes
- [ ] `large-document.png` - Screenshot demonstrating TOC with a long document

## Image Guidelines

### Screenshots
- **Resolution**: 1920x1080 or 2880x1800 (Retina)
- **Format**: PNG for UI screenshots
- **VS Code Theme**: Use default Dark+ or Light+ theme for consistency
- **Annotations**: Add red arrows or boxes to highlight important areas
- **File Size**: Optimize to under 500KB using tools like ImageOptim

### GIFs
- **Resolution**: Maximum 800px width
- **Frame Rate**: 10-15 fps
- **Duration**: 5-10 seconds max
- **File Size**: Under 2MB (optimize with ezgif.com)
- **Recording Tools**:
  - macOS: LICEcap, Gifox, or Kap
  - Windows: ScreenToGif or LICEcap
  - Linux: Peek or SimpleScreenRecorder

### Naming Convention
```
feature-action-type.ext

Examples:
- toggle-sidebar-keyboard.gif
- settings-panel-overview.png
- error-message-example.png
```

## Creating Screenshots

### VS Code Setup
1. Use a clean VS Code instance
2. Set window size to 1440x900 or 1920x1080
3. Hide unnecessary panels (Terminal, Output, etc.)
4. Use consistent zoom level (100%)
5. Clear all notifications

### Sample Markdown Content

Use this for consistent screenshots:

```markdown
# Project Documentation

## Introduction
Welcome to our comprehensive project documentation. This guide will help you understand and use our application effectively.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following requirements met:
- Node.js version 14 or higher
- VS Code installed
- Basic knowledge of markdown

### Installation
Follow these steps to install the application.

## Features

### Feature One
Description of the first feature.

#### Sub-feature 1.1
Details about this sub-feature.

#### Sub-feature 1.2
More details here.

### Feature Two
Description of the second feature.

## API Reference

### Methods

#### `initialize()`
Initializes the application with default settings.

#### `process(data)`
Processes the input data and returns results.

## Troubleshooting

### Common Issues
Solutions to frequently encountered problems.

## Conclusion
Thank you for using our application!
```

## Placeholder Images

Until actual screenshots are created, the documentation references these placeholder paths. Each should be replaced with actual images before publication.

## Tools and Resources

### Free Tools for Creating Images

**Screenshots:**
- **macOS**: Cmd+Shift+5 (built-in), [Shottr](https://shottr.cc/)
- **Windows**: Win+Shift+S (built-in), [ShareX](https://getsharex.com/)
- **Linux**: [Flameshot](https://flameshot.org/)
- **Cross-platform**: [Greenshot](https://getgreenshot.org/)

**GIF Recording:**
- [LICEcap](https://www.cockos.com/licecap/) - Simple, cross-platform
- [Gifox](https://gifox.app/) - macOS, polished
- [ScreenToGif](https://www.screentogif.com/) - Windows, feature-rich
- [Peek](https://github.com/phw/peek) - Linux, simple

**Image Optimization:**
- [ImageOptim](https://imageoptim.com/) - macOS
- [TinyPNG](https://tinypng.com/) - Web-based
- [ezgif.com](https://ezgif.com/) - GIF optimization
- [Squoosh](https://squoosh.app/) - Advanced web-based optimizer

**Annotation:**
- [Skitch](https://evernote.com/products/skitch) - Simple annotations
- [Annotate](https://apps.apple.com/app/annotate) - macOS
- Built-in tools in screenshot apps

## Contributing Images

When contributing screenshots or GIFs:

1. Follow the naming convention
2. Optimize file sizes
3. Ensure clarity and readability
4. Use consistent styling
5. Include alt text in markdown
6. Test images in both light and dark themes

Example markdown with proper alt text:
```markdown
![TOC sidebar showing nested document structure with multiple header levels](images/nested-structure.png)
```

---

📸 **Note**: High-quality images significantly improve documentation usability. Take time to create clear, informative screenshots and animations.