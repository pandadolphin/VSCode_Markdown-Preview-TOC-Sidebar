# Troubleshooting Guide

This guide helps you resolve common issues with the Markdown Preview TOC Sidebar extension.

## Quick Fixes

Before diving into specific issues, try these quick fixes that resolve 90% of problems:

1. **Reload VS Code Window**
   - Press `Cmd+R` (macOS) or `Ctrl+R` (Windows/Linux)
   - Or Command Palette → "Developer: Reload Window"

2. **Check File Extension**
   - Ensure file ends with `.md` or `.markdown`
   - Other extensions won't trigger the TOC

3. **Verify Preview Mode**
   - Make sure you're in Preview mode (`Cmd+Shift+V`)
   - Not in Source mode or regular editor

4. **Update Extension**
   - Check for updates in Extensions view
   - Install latest version if available

## Common Issues

### Issue: TOC Sidebar Not Appearing

**Symptoms:**
- No sidebar visible in markdown preview
- Hamburger menu icon missing
- ESC key has no effect

**Possible Causes & Solutions:**

#### 1. Not in Preview Mode
```
✅ Solution:
- Press Cmd+Shift+V (macOS) or Ctrl+Shift+V (Windows/Linux)
- Verify you see the rendered markdown, not source code
```

#### 2. Wrong File Type
```
✅ Solution:
- Check file extension is .md or .markdown
- Rename file if necessary
- Reopen preview after renaming
```

#### 3. Extension Not Loaded
```
✅ Solution:
1. Open Extensions view (Cmd+Shift+X)
2. Search for "Markdown Preview TOC Sidebar"
3. Ensure it's installed and enabled
4. Click "Reload" if button appears
```

#### 4. No Headers in Document
```
✅ Solution:
- Add at least one header using # syntax
- Example: # My Title
- TOC appears once headers exist
```

#### 5. JavaScript Disabled
```
✅ Solution:
1. Open VS Code settings (Cmd+,)
2. Search for "markdown.preview.scriptEnabled"
3. Ensure it's checked/enabled
4. Restart VS Code
```

### Issue: ESC Key Not Working

**Symptoms:**
- Pressing ESC doesn't toggle sidebar
- No response to keyboard shortcut

**Solutions:**

#### 1. Preview Not Focused
```
✅ Solution:
- Click anywhere in the preview pane first
- Then press ESC
- Preview must have focus for shortcut to work
```

#### 2. Conflicting Extension
```
✅ Solution:
1. Disable other extensions temporarily
2. Test if ESC works
3. Re-enable extensions one by one to find conflict
4. Configure conflicting extension's shortcuts
```

#### 3. Use Alternative Toggle
```
✅ Solution:
- Click the hamburger menu (☰) icon instead
- Located in top-left corner of preview
- Same effect as ESC key
```

### Issue: TOC Not Showing All Headers

**Symptoms:**
- Some headers missing from TOC
- Incomplete document structure
- Headers appear in preview but not sidebar

**Solutions:**

#### 1. Invalid Header Syntax
```
❌ Wrong:
#Header (no space)
# Header with trailing #

✅ Correct:
# Header
## Subheader
### Sub-subheader
```

#### 2. Headers Inside Code Blocks
```
Headers in code blocks are ignored:
```markdown
# This header won't appear in TOC
```

Move headers outside code blocks
```

#### 3. HTML Headers Not Supported
```
❌ Not detected:
<h1>HTML Header</h1>

✅ Use markdown instead:
# Markdown Header
```

### Issue: Sidebar State Not Persisting

**Symptoms:**
- Sidebar visibility resets on reload
- Preference not saved
- Always starts in default state

**Solutions:**

#### 1. LocalStorage Disabled
```
✅ Solution:
1. Check browser console in preview (F12)
2. Try: localStorage.setItem('test', 'value')
3. If error appears, LocalStorage is disabled
4. This is a VS Code webview limitation
```

#### 2. Clear Corrupted Storage
```javascript
// In preview console (F12)
localStorage.clear()
// Then reload preview
```

#### 3. Different Workspace
```
Note: Settings are per-workspace
- Each workspace maintains separate state
- This is expected behavior
```

### Issue: Poor Performance

**Symptoms:**
- Slow preview rendering
- Laggy scrolling
- Delayed TOC updates

**Solutions:**

#### 1. Large Document
```
✅ Solution:
- Split very large documents (>5000 lines)
- Reduce number of headers if excessive (>200)
- Close unnecessary preview tabs
```

#### 2. Too Many Extensions
```
✅ Solution:
1. Disable unnecessary extensions
2. Use Extension Bisect:
   - Command Palette → "Start Extension Bisect"
   - Helps identify problematic extensions
```

#### 3. Memory Issues
```
✅ Solution:
- Restart VS Code
- Check Activity Monitor/Task Manager
- Increase VS Code memory limit if needed
```

### Issue: Wrong Language Displayed

**Symptoms:**
- TOC shows in unexpected language
- Not matching system language
- Can't change language

**Solutions:**

#### 1. Set Language Manually
```javascript
// In preview console (F12)
localStorage.setItem('toc-sidebar-language', 'en')
// Options: en, ru, zh, ja, fr, de, nl, es, pt, it, ko, pl, tr
```

#### 2. Check Browser Language
```javascript
// In preview console (F12)
console.log(navigator.language)
// Shows detected language
```

#### 3. Clear Language Setting
```javascript
// In preview console (F12)
localStorage.removeItem('toc-sidebar-language')
// Reverts to auto-detection
```

## Advanced Troubleshooting

### Debug Mode

Enable detailed logging:

```javascript
// In preview console (F12)
// Check for any error messages
console.log('TOC Extension Debug Info:')
console.log('Sidebar visible:', localStorage.getItem('toc-sidebar-visibility'))
console.log('Language:', localStorage.getItem('toc-sidebar-language'))
console.log('Headers found:', document.querySelectorAll('.markdown-body h1, h2, h3, h4, h5, h6').length)
```

### Check Extension Files

Verify installation:

```bash
# Check if extension files exist
ls ~/.vscode/extensions/ | grep markdown-preview-toc

# Should see something like:
# publisher.markdown-preview-toc-sidebar-1.0.2
```

### VS Code Developer Tools

1. **Open Developer Tools**
   - Help → Toggle Developer Tools
   - Or `Cmd+Alt+I` (macOS) / `Ctrl+Alt+I` (Windows/Linux)

2. **Check Console Tab**
   - Look for red error messages
   - Filter by "markdown" or "toc"

3. **Check Network Tab**
   - Verify extension resources load
   - Look for failed requests

### Clean Reinstall

If nothing else works:

1. **Uninstall Extension**
   ```
   - Open Extensions view
   - Find "Markdown Preview TOC Sidebar"
   - Click Uninstall
   ```

2. **Clear Extension Data**
   ```bash
   # Remove extension folder
   rm -rf ~/.vscode/extensions/publisher.markdown-preview-toc-sidebar*
   ```

3. **Restart VS Code**
   ```
   - Completely quit VS Code
   - Wait 5 seconds
   - Reopen VS Code
   ```

4. **Reinstall Extension**
   ```
   - Install from marketplace
   - Reload window
   - Test with sample markdown
   ```

## Platform-Specific Issues

### Windows

#### Issue: Permission Errors
```
Solution:
- Run VS Code as Administrator
- Check antivirus isn't blocking
- Ensure Windows Defender allows VS Code
```

#### Issue: Path Too Long
```
Solution:
- Move workspace to shorter path
- Enable long path support in Windows
- Use Windows 10 version 1607 or later
```

### macOS

#### Issue: Security Blocking
```
Solution:
- System Preferences → Security & Privacy
- Allow VS Code under "Privacy" tab
- Grant necessary permissions
```

#### Issue: Quarantine Flag
```bash
# Remove quarantine flag
xattr -d com.apple.quarantine ~/.vscode/extensions/publisher.markdown-preview-toc-sidebar*
```

### Linux

#### Issue: Missing Dependencies
```bash
# Install required packages
sudo apt-get update
sudo apt-get install libx11-xcb1 libxcb-dri3-0
```

#### Issue: Snap Installation
```
Solution:
- Snap versions may have restrictions
- Try installing VS Code via .deb/.rpm instead
- Grant necessary snap permissions
```

## Error Messages Reference

### "Cannot read property 'querySelectorAll' of null"

**Meaning:** DOM not fully loaded
**Solution:** Extension timing issue - reload preview

### "localStorage is not defined"

**Meaning:** Storage API unavailable
**Solution:** VS Code webview limitation - feature will work without persistence

### "Extension host terminated unexpectedly"

**Meaning:** VS Code crashed
**Solution:** Restart VS Code, check for conflicting extensions

## Getting Help

### Before Reporting an Issue

1. **Check Existing Issues**
   - Visit [GitHub Issues](https://github.com/your-username/VSCode_Markdown-Preview-TOC-Sidebar/issues)
   - Search for your problem
   - Check closed issues too

2. **Gather Information**
   ```
   Required info:
   - VS Code version (Help → About)
   - Extension version
   - Operating system
   - Error messages (if any)
   - Steps to reproduce
   ```

3. **Create Minimal Example**
   ```markdown
   # Test Document
   ## This Should Work
   ### But It Doesn't
   Describe what happens vs. what should happen
   ```

### Reporting an Issue

**Template:**
```markdown
**Environment:**
- VS Code Version: 1.70.0
- Extension Version: 1.0.2
- OS: macOS 12.4

**Problem:**
Brief description

**Steps to Reproduce:**
1. Open markdown file
2. Press Cmd+Shift+V
3. Expected: TOC appears
4. Actual: No TOC

**Error Messages:**
[Paste any console errors]

**Sample File:**
[Attach minimal .md file that shows issue]
```

### Community Support

- **GitHub Discussions**: Ask questions, share tips
- **VS Code Community**: [Community Forums](https://stackoverflow.com/questions/tagged/visual-studio-code)
- **Twitter**: Tag @code for VS Code specific issues

## Prevention Tips

### Best Practices

1. **Keep VS Code Updated**
   - Enable auto-update
   - Check monthly for updates

2. **Minimal Extension Set**
   - Only install needed extensions
   - Regularly review and remove unused

3. **Standard Markdown**
   - Use standard markdown syntax
   - Avoid non-standard extensions

4. **Regular Maintenance**
   - Clear cache periodically
   - Restart VS Code weekly
   - Update extensions regularly

---

💡 **Remember:** Most issues are resolved by simply reloading the VS Code window (`Cmd+R` / `Ctrl+R`). When in doubt, try this first!