# Configuration Guide

This guide covers all configuration options for the Markdown Preview TOC Sidebar extension.

## Overview

The extension is designed to work out-of-the-box with zero configuration required. However, there are several ways to customize its behavior to suit your preferences.

## Storage Configuration

The extension uses browser LocalStorage to persist settings. These settings are stored per VS Code workspace.

### Available Storage Keys

| Key | Type | Description | Default |
|-----|------|-------------|---------|
| `toc-sidebar-visibility` | `string` | Sidebar visibility state (`"visible"` or `"hidden"`) | `"visible"` |
| `toc-sidebar-language` | `string` | Language override (e.g., `"en"`, `"zh"`, `"ja"`) | Auto-detect |

## Language Settings

### Auto-Detection

By default, the extension automatically detects your browser's language setting:

```javascript
// The extension checks:
navigator.language || navigator.userLanguage
```

This typically returns values like:
- `en-US` → Uses English
- `zh-CN` → Uses Simplified Chinese
- `ja-JP` → Uses Japanese
- `fr-FR` → Uses French

### Supported Languages

The extension currently supports 13 languages:

| Language | Code | Native Name |
|----------|------|-------------|
| English | `en` | English |
| Russian | `ru` | Русский |
| Chinese (Simplified) | `zh` | 简体中文 |
| Japanese | `ja` | 日本語 |
| French | `fr` | Français |
| German | `de` | Deutsch |
| Dutch | `nl` | Nederlands |
| Spanish | `es` | Español |
| Portuguese | `pt` | Português |
| Italian | `it` | Italiano |
| Korean | `ko` | 한국어 |
| Polish | `pl` | Polski |
| Turkish | `tr` | Türkçe |

### Setting Language Manually

To override auto-detection and set a specific language:

```javascript
// Open browser console in markdown preview (F12)
localStorage.setItem('toc-sidebar-language', 'en')
```

Available language codes: `en`, `ru`, `zh`, `ja`, `fr`, `de`, `nl`, `es`, `pt`, `it`, `ko`, `pl`, `tr`

### Resetting to Auto-Detection

To return to automatic language detection:

```javascript
// In preview console (F12)
localStorage.removeItem('toc-sidebar-language')
```

### Checking Current Language

To see what language is currently being used:

```javascript
// In preview console (F12)
localStorage.getItem('toc-sidebar-language') || navigator.language
```

## Visibility Settings

### Default Behavior

- **Desktop (>1366px)**: Sidebar visible by default
- **Narrow screens (<1366px)**: Sidebar hidden by default
- **User preference**: Overrides defaults when set

### Controlling Visibility

#### Via Keyboard
- Press `ESC` to toggle visibility
- State is automatically saved

#### Via Click
- Click hamburger menu (☰) to toggle
- State is automatically saved

#### Via Console
```javascript
// Show sidebar
localStorage.setItem('toc-sidebar-visibility', 'visible')

// Hide sidebar
localStorage.setItem('toc-sidebar-visibility', 'hidden')

// Reset to default
localStorage.removeItem('toc-sidebar-visibility')
```

### Checking Current State

```javascript
// In preview console (F12)
localStorage.getItem('toc-sidebar-visibility')
// Returns: "visible", "hidden", or null (default)
```

## Display Configuration

### Responsive Breakpoint

The extension has a built-in responsive breakpoint at **1366px**:

- **Width ≥ 1366px**: Desktop mode
- **Width < 1366px**: Mobile/tablet mode

This breakpoint is currently not configurable but is optimized for common screen sizes.

### Sidebar Dimensions

Current fixed dimensions:
- **Width**: 250px
- **Height**: 100% of preview
- **Position**: Fixed on left side

### Visual Styling

The TOC sidebar automatically adapts to your VS Code theme:

| VS Code Theme | TOC Appearance |
|---------------|----------------|
| Dark+ (default) | Dark background, light text |
| Light+ (default) | Light background, dark text |
| High Contrast | High contrast colors |
| Custom themes | Inherits theme colors |

## VS Code Settings Integration

While the extension doesn't add VS Code settings directly, it respects these related settings:

### Markdown Preview Settings

```json
{
  // Enable/disable preview scripts (must be true for TOC to work)
  "markdown.preview.scriptEnabled": true,

  // Font family in preview (affects TOC font)
  "markdown.preview.fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",

  // Font size in preview (affects TOC size)
  "markdown.preview.fontSize": 14,

  // Line height in preview
  "markdown.preview.lineHeight": 1.6
}
```

### Editor Settings That Affect Preview

```json
{
  // Theme affects TOC colors
  "workbench.colorTheme": "Default Dark+",

  // Zoom level affects preview scale
  "window.zoomLevel": 0
}
```

## Advanced Configuration

### Debug Mode

Enable debug output for troubleshooting:

```javascript
// In preview console (F12)
window.TOC_DEBUG = true

// Now actions will log to console
console.log('TOC Debug enabled')
```

### Custom CSS (Experimental)

While not officially supported, you can inject custom CSS:

```javascript
// In preview console (F12)
const style = document.createElement('style')
style.textContent = `
  .toc-sidebar {
    width: 300px !important; /* Wider sidebar */
  }
  .toc-sidebar h1 {
    color: #007ACC !important; /* Custom color */
  }
`
document.head.appendChild(style)
```

**Note**: Custom CSS may break with extension updates.

### Performance Tuning

For very large documents, you can optimize performance:

```javascript
// Reduce update frequency during scroll
// (Not currently configurable, for reference only)
const SCROLL_DEBOUNCE = 100 // milliseconds
```

## Multi-Window Configuration

Each VS Code window maintains independent settings:

### Workspace-Specific Settings

Settings are stored per workspace:
- Different projects can have different languages
- Visibility state is independent
- No cross-contamination between workspaces

### Syncing Settings

To sync settings across machines (using Settings Sync):
- LocalStorage settings are NOT synced
- Each machine maintains its own preferences
- This is a limitation of the webview LocalStorage

## Configuration Examples

### Example 1: Japanese Documentation Project

```javascript
// Set Japanese language for documentation project
localStorage.setItem('toc-sidebar-language', 'ja')

// Keep sidebar always visible for reference
localStorage.setItem('toc-sidebar-visibility', 'visible')
```

### Example 2: Code Review Setup

```javascript
// Use English for consistency
localStorage.setItem('toc-sidebar-language', 'en')

// Hide by default to maximize code space
localStorage.setItem('toc-sidebar-visibility', 'hidden')
```

### Example 3: Multi-Language Documentation

```javascript
// Quick language switcher function
function switchTOCLanguage(lang) {
  const supported = ['en','ru','zh','ja','fr','de','nl','es','pt','it','ko','pl','tr']
  if (supported.includes(lang)) {
    localStorage.setItem('toc-sidebar-language', lang)
    location.reload() // Refresh to apply
  } else {
    console.log('Unsupported language. Choose from:', supported)
  }
}

// Usage
switchTOCLanguage('fr') // Switch to French
```

## Resetting All Configuration

To completely reset the extension to defaults:

```javascript
// In preview console (F12)
// Remove all TOC-related settings
localStorage.removeItem('toc-sidebar-visibility')
localStorage.removeItem('toc-sidebar-language')

// Or clear all localStorage (affects other extensions too!)
// localStorage.clear() // Use with caution!

// Reload preview to apply
location.reload()
```

## Configuration Limitations

### Current Limitations

1. **No VS Code Settings UI**: Configuration is via console only
2. **No Sync**: Settings don't sync between machines
3. **Fixed Dimensions**: Sidebar width not adjustable
4. **Single Breakpoint**: Responsive breakpoint not configurable
5. **Per-Workspace**: Can't set global defaults

### Planned Improvements

Future versions may include:
- VS Code settings integration
- Configurable sidebar width
- Multiple responsive breakpoints
- Global default settings
- Settings UI panel

## Troubleshooting Configuration

### Settings Not Persisting?

```javascript
// Check if LocalStorage is available
if (typeof Storage !== "undefined") {
  console.log("LocalStorage is supported")
  // Try setting a test value
  localStorage.setItem('test', 'value')
  console.log(localStorage.getItem('test'))
} else {
  console.log("LocalStorage is NOT supported")
}
```

### Wrong Language Showing?

```javascript
// Check what's being detected
console.log('Browser language:', navigator.language)
console.log('Saved language:', localStorage.getItem('toc-sidebar-language'))
console.log('Would use:', localStorage.getItem('toc-sidebar-language') || navigator.language.split('-')[0])
```

### Configuration Not Applied?

After changing settings, always:
1. Reload the preview window
2. Or close and reopen the preview
3. Or reload VS Code window (`Cmd+R` / `Ctrl+R`)

## Best Practices

### For Individual Users

1. **Set language once** if auto-detection is wrong
2. **Use ESC key** for quick visibility toggling
3. **Don't modify** debug flags unless troubleshooting
4. **Reset settings** if experiencing issues

### For Teams

1. **Document** any required configuration
2. **Use consistent** language settings
3. **Don't rely on** localStorage for critical settings
4. **Include configuration** in project README

### For Contributors

1. **Test with multiple** languages
2. **Verify localStorage** availability
3. **Handle missing** settings gracefully
4. **Document new** configuration options

---

💡 **Pro Tip**: The extension is designed to be zero-config. Only adjust settings if the defaults don't meet your needs. Most users never need to configure anything!