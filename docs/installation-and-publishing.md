# Installation and Publishing Guide

## Installing Extension Locally in VSCode

### Build the Extension Package

First, build the extension into a `.vsix` file:

```bash
npm run build
```

This command:
1. Runs the prepublish script to minify JS/CSS files
2. Packages all extension files into a `.vsix` file (e.g., `markdown-preview-toc-sidebar-1.0.2.vsix`)

### Install the VSIX File

You have two options to install the generated `.vsix` file:

#### Option 1: Command Line
```bash
code --install-extension markdown-preview-toc-sidebar-1.0.2.vsix
```

#### Option 2: VSCode UI
1. Open Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
2. Type and select **"Extensions: Install from VSIX..."**
3. Browse and select the `.vsix` file from your project directory
4. VSCode will install the extension and prompt you to reload

The extension is now permanently installed and will persist across VSCode restarts.

### Uninstalling Local Extension

To uninstall:
1. Open Extensions view (`Cmd+Shift+X`)
2. Search for "Markdown Preview TOC Sidebar"
3. Click the Uninstall button

## Publishing to VSCode Extension Marketplace

### Prerequisites

1. **Publisher Account**: Create a publisher account at [marketplace.visualstudio.com](https://marketplace.visualstudio.com/manage)
2. **Personal Access Token (PAT)**:
   - Go to [Azure DevOps](https://dev.azure.com/)
   - Click on User Settings (profile icon) → Personal Access Tokens
   - Create a new token with **Marketplace → Publish** scope
   - Save the token securely (you'll need it for publishing)

### Configure Publisher

1. Update [`package.json:5`](../package.json#L5) with your publisher ID:
   ```json
   "publisher": "your-publisher-id"
   ```

2. Login with vsce (VSCode Extension manager):
   ```bash
   npx vsce login your-publisher-id
   ```
   Enter your Personal Access Token when prompted.

### Publishing Steps

1. **Update Version** (if needed):
   ```bash
   npm version patch  # or minor/major
   ```
   This updates the version in [`package.json:4`](../package.json#L4)

2. **Build and Test**:
   ```bash
   npm run pretest  # Run linter
   npm run test     # Run tests
   npm run build    # Create local .vsix to test
   ```

3. **Publish to Marketplace**:
   ```bash
   npm run publish
   ```
   Or manually with vsce:
   ```bash
   npx vsce publish
   ```

   To publish with a specific version bump:
   ```bash
   npx vsce publish patch  # Increments version and publishes
   # or
   npx vsce publish minor
   npx vsce publish major
   ```

### Post-Publication

After successful publication:
1. The extension will be available at `https://marketplace.visualstudio.com/items?itemName=your-publisher-id.markdown-preview-toc-sidebar`
2. It typically takes 5-10 minutes for the extension to appear in VSCode's extension search
3. Users can install it directly from VSCode by searching for the extension name

### Important Files for Publishing

- [`package.json`](../package.json) - Extension metadata, version, publisher info
- [`README.md`](../README.md) - Displayed on the Marketplace page
- [`CHANGELOG.md`](../CHANGELOG.md) - Version history (if present)
- [`.vscodeignore`](../.vscodeignore) - Files to exclude from the published package
- [`icon.png`](../icon.png) - Extension icon (128x128 or 256x256 recommended)

### Troubleshooting

**Common Issues:**

1. **"Publisher not found"**: Ensure you've created a publisher account and updated `package.json`
2. **"Invalid token"**: Regenerate PAT with correct scope (Marketplace → Publish)
3. **"Version already exists"**: Bump the version number before publishing
4. **Large package size**: Check `.vscodeignore` to exclude unnecessary files

**Useful Commands:**

```bash
# Check what files will be included in the package
npx vsce ls

# Create package without publishing (for testing)
npx vsce package

# Publish with specific PAT (without login)
npx vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN
```