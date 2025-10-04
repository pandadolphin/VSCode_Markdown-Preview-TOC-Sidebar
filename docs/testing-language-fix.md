# Testing the Language Detection Fix

## Changes Made

### 1. Enhanced Language Detection (src/md-toc-sidebar.js:96-147)
Added multiple fallback methods for detecting language:
- **Method 1**: Check document's `lang` attribute
- **Method 2**: Check meta tags for language hints
- **Method 3**: Try to detect from parent window (VS Code frame)
- **Method 4**: Fall back to browser language (original method)

### 2. Dynamic Language System (src/md-toc-sidebar.js:149-184)
- Made language variables (`currentLang`, `i18n`) mutable instead of const
- Added `setLanguage()` function to change language dynamically
- Added `updateUILanguage()` function to update UI text

### 3. Language Selector UI (src/md-toc-sidebar.js:238-287)
- Added a dropdown selector in the sidebar header
- Shows all 13 supported languages with native names
- Allows manual language switching
- Persists selection in localStorage

## How to Test

### 1. Install the Updated Extension
```bash
# Build the extension
npm run build

# Install locally
code --install-extension markdown-preview-toc-sidebar-1.0.2.vsix
```

### 2. Test Language Detection

#### Test Case 1: VS Code in Chinese
1. Set VS Code to Chinese (if not already)
2. Restart VS Code
3. Open any markdown file
4. Open preview (`Cmd+Shift+V`)
5. **Expected**: Sidebar should show "目录" (Chinese)
6. **Actual**: Check if it shows correctly

#### Test Case 2: Manual Language Selection
1. Click the language dropdown in the sidebar header
2. Select "中文"
3. **Expected**: Header immediately changes to "目录"
4. Refresh the preview
5. **Expected**: Language preference persists

#### Test Case 3: Language Persistence
1. Set language to Chinese via dropdown
2. Close the preview
3. Open a different markdown file
4. Open preview
5. **Expected**: Sidebar still shows in Chinese

### 3. Verify All Languages

Test each language in the dropdown:
- English → "Table of Contents"
- 中文 → "目录"
- 日本語 → "目次"
- 한국어 → "목차"
- Русский → "Содержание"
- Français → "Table des matières"
- Deutsch → "Inhaltsverzeichnis"
- Español → "Tabla de contenidos"
- Português → "Índice"
- Italiano → "Indice"
- Nederlands → "Inhoudsopgave"
- Polski → "Spis treści"
- Türkçe → "İçindekiler"

### 4. Edge Cases

#### Test Empty Document
1. Create markdown with no headers
2. Open preview
3. Change language
4. **Expected**: "Document headers will be displayed here" message updates in selected language

#### Test Console Override
1. Open preview
2. Open console (`F12`)
3. Run:
   ```javascript
   localStorage.setItem("toc-sidebar-language", "ja")
   location.reload()
   ```
4. **Expected**: Sidebar shows in Japanese

## Troubleshooting

### If Language Doesn't Change
1. Check browser console for errors
2. Clear localStorage:
   ```javascript
   localStorage.removeItem("toc-sidebar-language")
   location.reload()
   ```
3. Verify the minified files were updated:
   ```bash
   ls -la out/*.min.js
   # Check timestamp is recent
   ```

### Debug Language Detection
Open console and run:
```javascript
// Check what language is detected
console.log('Document lang:', document.documentElement.lang)
console.log('Navigator lang:', navigator.language)
console.log('Saved lang:', localStorage.getItem('toc-sidebar-language'))

// Force a language
localStorage.setItem('toc-sidebar-language', 'zh')
location.reload()
```

## Success Criteria

✅ Language dropdown appears in sidebar header
✅ All 13 languages work when selected
✅ Language preference persists across sessions
✅ VS Code language is detected (if possible)
✅ Fallback to browser language works
✅ No console errors

## Known Limitations

- VS Code's webview doesn't directly inherit VS Code's UI language
- Detection relies on multiple fallback methods
- Manual selection via dropdown is the most reliable method