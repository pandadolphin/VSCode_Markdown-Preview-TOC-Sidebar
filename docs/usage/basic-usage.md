# Basic Usage Guide

This guide covers all the essential features of Markdown Preview TOC Sidebar and how to use them effectively.

## Table of Contents

- [Opening the TOC Sidebar](#opening-the-toc-sidebar)
- [Navigating Your Document](#navigating-your-document)
- [Sidebar Visibility Control](#sidebar-visibility-control)
- [Understanding the TOC Structure](#understanding-the-toc-structure)
- [Responsive Behavior](#responsive-behavior)
- [Working with Multiple Files](#working-with-multiple-files)
- [Best Practices](#best-practices)

## Opening the TOC Sidebar

The TOC sidebar activates automatically when you open a markdown preview. Here's the complete workflow:

### Step-by-Step Process

1. **Open a Markdown File**
   - File must have `.md` or `.markdown` extension
   - Can be any markdown file in your workspace

2. **Launch Preview**
   - **Method 1**: Press `Cmd+Shift+V` (macOS) or `Ctrl+Shift+V` (Windows/Linux)
   - **Method 2**: Click the preview button in the editor toolbar
   - **Method 3**: Use Command Palette → "Markdown: Open Preview"
   - **Method 4**: Right-click on `.md` file → "Open Preview"

3. **TOC Appears Automatically**
   - Sidebar appears on the left side of the preview
   - Shows all headers from your document
   - Ready for navigation immediately

### Preview Modes

You can open the preview in different configurations:

#### Same Tab Preview
- Replaces current editor with preview
- Use: `Cmd+Shift+V` / `Ctrl+Shift+V`

#### Side-by-Side Preview
- Opens preview next to your editor
- Use: `Cmd+K V` / `Ctrl+K V`
- Best for: Live editing with instant preview

#### New Window Preview
- Opens preview in a new VS Code window
- Right-click tab → "Move to New Window"
- Best for: Multi-monitor setups

## Navigating Your Document

The TOC sidebar provides multiple ways to navigate your document efficiently:

### Click Navigation

**How it works:**
- Click any header in the TOC
- Preview instantly scrolls to that section
- Currently viewed section is highlighted

**Visual Feedback:**
- Hovered items show pointer cursor
- Active section has distinct highlighting
- Smooth scrolling animation to target

### Scroll Synchronization

**Automatic Highlight:**
- As you scroll through the preview, the TOC highlights your current position
- Helps you understand where you are in the document structure
- Updates in real-time as you scroll

**Smart Detection:**
- Detects which header is currently in view
- Handles nested sections intelligently
- Works with all header levels (h1-h6)

### Nested Navigation

**Hierarchical Structure:**
```
📄 Document Title (h1)
  └── 📂 Main Section (h2)
      ├── 📝 Subsection (h3)
      │   └── 📎 Detail (h4)
      └── 📝 Another Subsection (h3)
```

**Benefits:**
- Understand document structure at a glance
- Jump to any level directly
- Collapse/expand sections (if supported)

## Sidebar Visibility Control

Control when and how the sidebar appears:

### Toggle Methods

#### Method 1: Keyboard Shortcut
- **Press `ESC`** while preview is focused
- Instantly toggles sidebar visibility
- Works from anywhere in the preview

#### Method 2: Click Toggle
- **Click the hamburger icon** (☰) in top-left
- Always visible when sidebar is present
- Provides visual feedback on click

#### Method 3: Auto-Hide (Responsive)
- Sidebar automatically hides on narrow screens
- Breakpoint: 1366px width
- Prevents content crowding on small displays

### Persistent State

**Your Preference is Saved:**
- Sidebar state saved in LocalStorage
- Remembered across sessions
- Per-workspace settings possible

**How to Reset:**
```javascript
// Open browser console in preview (F12)
localStorage.removeItem('toc-sidebar-visibility')
```

## Understanding the TOC Structure

The TOC reflects your markdown header hierarchy:

### Header Levels

| Markdown | HTML | TOC Level | Visual |
|----------|------|-----------|---------|
| `# Title` | `<h1>` | Level 1 | **Bold, Largest** |
| `## Section` | `<h2>` | Level 2 | **Bold, Large** |
| `### Subsection` | `<h3>` | Level 3 | Normal, Indented |
| `#### Detail` | `<h4>` | Level 4 | Normal, More Indented |
| `##### Minor` | `<h5>` | Level 5 | Small, Further Indented |
| `###### Note` | `<h6>` | Level 6 | Smallest, Max Indent |

### Nesting Rules

**Proper Structure:**
```markdown
# Document Title
## Chapter 1
### Section 1.1
#### Subsection 1.1.1
### Section 1.2
## Chapter 2
### Section 2.1
```

**TOC Display:**
- Maintains your exact hierarchy
- Indentation shows relationships
- Skip levels are handled gracefully

### Special Cases

**Multiple H1 Headers:**
- All H1s appear at top level
- Use for multi-part documents
- Each acts as a separate root

**No Headers:**
- Shows friendly message
- "Headers not found" in your language
- Sidebar remains functional

**Very Long Headers:**
- Wrapped to multiple lines
- Full text remains clickable
- Tooltip shows complete text

## Responsive Behavior

The extension adapts to different screen sizes:

### Desktop Mode (>1366px)

**Features:**
- Sidebar visible by default
- Full width TOC display
- Smooth hover effects
- Optimal spacing

**Layout:**
```
┌─────────┬────────────────┐
│   TOC   │    Preview     │
│ Sidebar │    Content     │
│  250px  │   Remaining    │
└─────────┴────────────────┘
```

### Tablet/Narrow Mode (<1366px)

**Features:**
- Sidebar hidden by default
- Toggle button more prominent
- Content takes full width
- Prevents horizontal scrolling

**Layout:**
```
┌──────────────────┐
│ ☰  Preview       │
│    Content       │
│   Full Width     │
└──────────────────┘
```

### Breakpoint Customization

Currently set at 1366px, ideal for:
- Standard laptops
- External monitors
- Split-screen workflows

## Working with Multiple Files

The extension handles multiple markdown files seamlessly:

### Multiple Tabs

**Each Preview is Independent:**
- Separate TOC for each file
- Individual visibility states
- No interference between tabs

**Workflow:**
1. Open multiple `.md` files
2. Preview each in separate tabs
3. Each maintains its own TOC

### Split Editor

**Side-by-Side Documents:**
```
┌──────────────┬──────────────┐
│  Doc1 + TOC  │  Doc2 + TOC  │
│              │              │
└──────────────┴──────────────┘
```

**Benefits:**
- Compare documents
- Reference while writing
- Independent navigation

### Workspace Management

**Tips for Large Projects:**
- Group related markdown files
- Use workspace-specific settings
- Maintain consistent header structure

## Best Practices

### Document Structure

✅ **DO:**
- Start with a single H1 as document title
- Use sequential header levels
- Keep headers concise but descriptive
- Use consistent capitalization

❌ **DON'T:**
- Skip header levels (h1 → h3)
- Use headers for emphasis only
- Create extremely long headers
- Mix formatting styles

### Optimal Usage

**For Long Documents:**
- Use more header levels for organization
- Create logical sections and subsections
- Consider a manual TOC at the top for reference

**For Short Documents:**
- Sidebar auto-hides if no headers found
- Still useful for documents with 3+ sections
- ESC key toggles if needed

**For Technical Documentation:**
- Use clear, searchable header names
- Include keywords in headers
- Maintain consistent terminology

### Performance Tips

**Large Documents (>1000 lines):**
- TOC generation is optimized
- Scrolling remains smooth
- Consider splitting very large files

**Many Headers (>100):**
- All headers display efficiently
- Scrollbar appears in TOC if needed
- Navigation remains instant

## Advanced Tips

### Keyboard-Only Navigation

For keyboard enthusiasts:
1. `Cmd/Ctrl+Shift+V` - Open preview
2. `Tab` - Focus on TOC items (if supported)
3. `Enter` - Navigate to section
4. `ESC` - Toggle sidebar

### Custom Workflows

**Documentation Writing:**
- Keep TOC visible while writing
- Use for outline validation
- Check structure completeness

**Code Documentation:**
- Navigate between API sections
- Quick access to examples
- Jump to specific methods

**Note Taking:**
- Organize thoughts hierarchically
- Quick navigation while reviewing
- Perfect for meeting notes

## Troubleshooting Quick Guide

### TOC Not Appearing?

Check these in order:
1. Is file extension `.md` or `.markdown`?
2. Are you in Preview mode (not Source mode)?
3. Does document have headers (`#` syntax)?
4. Try toggling with ESC key
5. Reload window: `Cmd+R` / `Ctrl+R`

### Headers Not Showing?

Verify markdown syntax:
- Space after `#` symbols
- No leading spaces before `#`
- Proper markdown formatting

### Need More Help?

- See [Troubleshooting Guide](../guides/troubleshooting.md)
- Check [FAQ](../guides/faq.md)
- Report issues on GitHub

---

💡 **Remember:** The TOC sidebar is designed to be intuitive and stay out of your way. Use ESC to toggle visibility whenever needed, and let the extension enhance your markdown reading experience!