# Language Detection Issue Analysis

## Problem Description
The TOC sidebar shows "Table of Contents" in English even when VSCode is configured to use Chinese or other languages.

## Root Cause
The extension uses `navigator.language` to detect the language, but VS Code's markdown preview webview doesn't inherit the VS Code UI language setting. Instead, it uses the system's browser language.

### Current Implementation
```javascript
// src/md-toc-sidebar.js:104-107
const browserLang = navigator.language || navigator.userLanguage
const langCode = browserLang.toLowerCase().split(/[-_]/)[0]
```

This returns the **system browser language**, not VS Code's configured UI language.

## Why This Happens

1. **Webview Isolation**: VS Code's webviews run in an isolated browser context
2. **No Language API Access**: The injected script can't access VS Code's language API directly
3. **Different Context**: VS Code UI language ≠ Webview browser language

## Solutions

### Solution 1: Use VS Code's Display Language (Recommended)
VS Code provides `vscode.env.language` API, but this requires extension activation code:

```javascript
// extension.js (new file needed)
const vscode = require('vscode');

function activate(context) {
    // Get VS Code's display language
    const vscodeLanguage = vscode.env.language; // e.g., "zh-cn", "en-us"

    // Pass to webview via postMessage or meta tag injection
    const panel = vscode.window.createWebviewPanel(...);
    panel.webview.html = `
        <meta name="vscode-language" content="${vscodeLanguage}">
        ${restOfHtml}
    `;
}
```

Then in `md-toc-sidebar.js`:
```javascript
function getVSCodeLanguage() {
    const meta = document.querySelector('meta[name="vscode-language"]');
    return meta ? meta.content.toLowerCase().split('-')[0] : null;
}

function getLanguage() {
    // 1. Check localStorage for manual override
    const savedLang = localStorage.getItem(languageKey);
    if (savedLang && translations[savedLang]) {
        return savedLang;
    }

    // 2. Try to get VS Code's language
    const vscodeLang = getVSCodeLanguage();
    if (vscodeLang && translations[vscodeLang]) {
        return vscodeLang;
    }

    // 3. Fall back to browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.toLowerCase().split(/[-_]/)[0];

    return translations[langCode] ? langCode : "en";
}
```

### Solution 2: Query Parameter Approach
Pass language via URL query parameter:

```javascript
// Check URL params for language
const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');
if (urlLang && translations[urlLang]) {
    return urlLang;
}
```

### Solution 3: Auto-detect from VS Code UI Elements (Hacky)
Try to detect language from VS Code's UI text:

```javascript
function detectVSCodeLanguage() {
    // Look for VS Code UI elements that might reveal language
    const bodyClasses = document.body.className;
    const htmlLang = document.documentElement.lang;

    // VS Code might set these attributes
    if (htmlLang && translations[htmlLang.split('-')[0]]) {
        return htmlLang.split('-')[0];
    }

    return null;
}
```

## Implementation Recommendation

**Short-term fix** (No architecture change):
1. Add better language detection fallbacks
2. Add a user-visible language selector in the sidebar
3. Document the manual override method prominently

**Long-term fix** (Requires architecture change):
1. Create an extension activation script
2. Use `vscode.env.language` API
3. Pass language to webview context
4. This would require changing from pure content script injection to a full extension

## Testing Checklist

- [ ] Test with VS Code in Chinese
- [ ] Test with VS Code in English
- [ ] Test with system in Chinese, VS Code in English
- [ ] Test with system in English, VS Code in Chinese
- [ ] Test localStorage override
- [ ] Test after VS Code language change without restart
- [ ] Test in different OS (Windows, macOS, Linux)

## Workaround for Users

Until fixed, users can manually set their language:

1. Open any markdown file
2. Open preview (`Cmd+Shift+V`)
3. Open browser console (`F12`)
4. Set language:
   ```javascript
   localStorage.setItem("toc-sidebar-language", "zh"); // For Chinese
   location.reload();
   ```

Supported language codes: `en`, `ru`, `zh`, `ja`, `fr`, `de`, `nl`, `es`, `pt`, `it`, `ko`, `pl`, `tr`