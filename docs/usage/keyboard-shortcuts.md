# Keyboard Shortcuts Reference

Quick access to all keyboard shortcuts for Markdown Preview TOC Sidebar and related markdown preview functions.

## TOC Sidebar Shortcuts

### Primary Shortcut

| Action | Windows/Linux | macOS | Description |
|--------|--------------|-------|-------------|
| **Toggle TOC Sidebar** | `ESC` | `ESC` | Show/hide the table of contents sidebar while preview is focused |

**Usage Notes:**
- Works only when markdown preview pane is focused
- State is saved automatically
- Instant toggle with no delay

## Markdown Preview Shortcuts

These VS Code built-in shortcuts work with our TOC sidebar:

### Opening Preview

| Action | Windows/Linux | macOS | Description |
|--------|--------------|-------|-------------|
| **Open Preview** | `Ctrl+Shift+V` | `Cmd+Shift+V` | Open preview in current tab |
| **Open Preview to Side** | `Ctrl+K V` | `Cmd+K V` | Open preview beside current editor |
| **Open Locked Preview** | - | - | Available via Command Palette only |

### Preview Navigation

| Action | Windows/Linux | macOS | Description |
|--------|--------------|-------|-------------|
| **Scroll Preview Up** | `Arrow Up` | `Arrow Up` | Scroll preview content up |
| **Scroll Preview Down** | `Arrow Down` | `Arrow Down` | Scroll preview content down |
| **Page Up** | `Page Up` | `Page Up` | Scroll up by page |
| **Page Down** | `Page Down` | `Page Down` | Scroll down by page |
| **Go to Top** | `Ctrl+Home` | `Cmd+Up` | Jump to document beginning |
| **Go to Bottom** | `Ctrl+End` | `Cmd+Down` | Jump to document end |

### Editor & Preview Synchronization

| Action | Windows/Linux | macOS | Description |
|--------|--------------|-------|-------------|
| **Toggle Preview Lock** | - | - | Via Command Palette: Lock preview to current editor |
| **Refresh Preview** | - | - | Via Command Palette: Force preview refresh |
| **Switch Focus** | `Ctrl+Tab` | `Cmd+Tab` | Switch between editor and preview |

## Command Palette Commands

Access these via `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS):

### TOC Related

While the extension doesn't add custom commands, these built-in commands work with it:

```
Markdown: Open Preview
Markdown: Open Preview to the Side
Markdown: Open Locked Preview
Markdown: Toggle Preview Lock
Markdown: Refresh Preview
```

### Useful Editor Commands

```
View: Toggle Word Wrap
View: Zoom In
View: Zoom Out
View: Reset Zoom
File: Save
File: Save All
```

## Custom Keybinding Configuration

Want to customize shortcuts? Add these to your `keybindings.json`:

### Access Keybindings File

1. Open Command Palette: `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Type: "Preferences: Open Keyboard Shortcuts (JSON)"
3. Add custom bindings

### Example Custom Bindings

```json
[
  {
    "key": "ctrl+t",
    "command": "markdown.showPreview",
    "when": "editorLangId == markdown"
  },
  {
    "key": "ctrl+shift+t",
    "command": "markdown.showPreviewToSide",
    "when": "editorLangId == markdown"
  },
  {
    "key": "alt+t",
    "command": "workbench.action.focusFirstEditorGroup",
    "when": "markdownPreviewFocus"
  }
]
```

### Keybinding Conditions

Use these `when` clause contexts:

| Context | Description |
|---------|-------------|
| `editorLangId == markdown` | Current editor is markdown |
| `markdownPreviewFocus` | Markdown preview is focused |
| `!markdownPreviewFocus` | Markdown preview is not focused |
| `resourceExtname == .md` | Current file is markdown |

## Workflow Shortcuts

### Efficient Document Navigation Workflow

1. **Open Document**: Open your `.md` file
2. **Launch Preview**: `Cmd+Shift+V` / `Ctrl+Shift+V`
3. **Toggle TOC**: `ESC` (if needed)
4. **Navigate**: Click headers in TOC
5. **Hide TOC**: `ESC` (for more reading space)

### Side-by-Side Editing Workflow

1. **Open Document**: Open your `.md` file
2. **Split Preview**: `Cmd+K V` / `Ctrl+K V`
3. **Edit**: Make changes in editor
4. **Navigate**: Use TOC in preview to jump around
5. **Toggle TOC**: `ESC` to maximize preview space

### Multi-Document Workflow

1. **Open Multiple Files**: Open several `.md` files
2. **Preview Each**: `Cmd+Shift+V` in each tab
3. **Switch Tabs**: `Ctrl+Tab` / `Cmd+Tab`
4. **Toggle TOCs**: `ESC` in each preview
5. **Compare**: View documents side-by-side

## Quick Reference Card

### Essential Shortcuts

```
📄 Open Preview:        Cmd/Ctrl + Shift + V
📑 Preview to Side:     Cmd/Ctrl + K, V
📋 Toggle TOC:          ESC
🔄 Switch Editor/Preview: Cmd/Ctrl + Tab
💾 Save:                Cmd/Ctrl + S
```

### Navigation in Preview

```
⬆️  Scroll Up:          Arrow Up / Mouse Wheel Up
⬇️  Scroll Down:        Arrow Down / Mouse Wheel Down
🏠 Top of Document:     Cmd/Ctrl + Home
🔚 End of Document:     Cmd/Ctrl + End
📍 Click TOC Item:      Navigate to section
```

## Platform-Specific Notes

### Windows

- All shortcuts use `Ctrl` instead of `Cmd`
- Right-click menus provide alternative access
- Windows key combinations may conflict with OS shortcuts

### macOS

- Use `Cmd` for most shortcuts
- Touch Bar (if available) may show context actions
- Mission Control gestures work with preview windows

### Linux

- Shortcuts similar to Windows
- Desktop environment may override some shortcuts
- Configure in system settings if conflicts occur

## Accessibility Shortcuts

### Screen Reader Support

The TOC sidebar is designed to work with screen readers:

- Headers are semantic HTML elements
- Proper ARIA labels where needed
- Keyboard navigation friendly

### High Contrast Mode

The extension respects VS Code's theme settings:

1. Toggle High Contrast: `Ctrl+K Ctrl+T` / `Cmd+K Cmd+T`
2. Select high contrast theme
3. TOC sidebar adapts automatically

## Tips for Memorizing Shortcuts

### Most Important Three

1. **`Cmd/Ctrl+Shift+V`** - Your gateway to preview
2. **`ESC`** - Master toggle for TOC
3. **`Cmd/Ctrl+K V`** - Side-by-side for active editing

### Mnemonic Devices

- **ESC**: "**Esc**ape from clutter" (hide TOC)
- **Shift+V**: "**V**iew with Shift" (preview)
- **K V**: "**K**eep **V**isible" (side-by-side)

## Troubleshooting Shortcuts

### ESC Key Not Working?

**Check these:**
1. Is markdown preview focused? (click on it)
2. Is another extension intercepting ESC?
3. Try clicking the hamburger menu instead

**Reset if needed:**
```javascript
// In preview console (F12)
localStorage.removeItem('toc-sidebar-visibility')
```

### Shortcuts Conflicting?

**Resolve conflicts:**
1. Open Keyboard Shortcuts: `Cmd+K Cmd+S`
2. Search for conflicting command
3. Right-click → "Change Keybinding"
4. Set new shortcut

### Custom Shortcuts Not Working?

**Verify JSON syntax:**
```json
{
  "key": "your+shortcut",     // ✅ Correct format
  "command": "command.name",   // ✅ Valid command
  "when": "condition"          // ✅ Optional condition
}
```

## Advanced Power User Tips

### Combine with VS Code Shortcuts

```bash
# Quick workflow
Cmd+P          # Quick open file
type: .md      # Filter markdown files
Enter          # Open file
Cmd+Shift+V    # Open preview
ESC            # Toggle TOC
```

### Create Macros

Using the [Macros extension](https://marketplace.visualstudio.com/items?itemName=geddski.macros):

```json
"macros": {
  "openMarkdownWithTOC": [
    "markdown.showPreviewToSide",
    "workbench.action.focusSecondEditorGroup"
  ]
}
```

### Terminal Integration

```bash
# Open VS Code with markdown preview
code myfile.md && code --command markdown.showPreview
```

---

💡 **Pro Tip:** Master the `ESC` key for TOC toggling and `Cmd/Ctrl+Shift+V` for preview - these two shortcuts will cover 90% of your needs!