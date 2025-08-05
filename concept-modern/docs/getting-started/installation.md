# Detailed Installation Guide

This guide provides comprehensive installation instructions for the Concept admin dashboard template.

## System Requirements

### Minimum Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn 1.22+)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB free space

### Recommended Development Environment
- **OS**: macOS, Windows 10/11, or Linux
- **Editor**: VS Code with recommended extensions
- **Browser**: Chrome or Firefox (latest versions)
- **Terminal**: Native terminal, iTerm2 (macOS), or Windows Terminal

## Installation Methods

### Method 1: Using npm (Recommended)

```bash
# Navigate to project directory
cd concept-modern

# Install dependencies
npm install

# Start development server
npm run dev
```

### Method 2: Using Yarn

```bash
# Install Yarn globally if not already installed
npm install -g yarn

# Navigate to project directory
cd concept-modern

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Method 3: Using pnpm (Faster Alternative)

```bash
# Install pnpm globally
npm install -g pnpm

# Navigate to project directory
cd concept-modern

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Detailed Setup Steps

### 1. Verify Prerequisites

First, check that you have the required tools installed:

```bash
# Check Node.js version
node --version
# Expected: v18.0.0 or higher

# Check npm version
npm --version
# Expected: 9.0.0 or higher

# Check Git (optional but recommended)
git --version
# Expected: Any recent version
```

### 2. Download or Clone the Project

**Option A: Download ZIP**
1. Download the Concept template ZIP file
2. Extract to your preferred location
3. Open terminal in the extracted folder

**Option B: Clone via Git**
```bash
# Clone the repository
git clone https://github.com/yourusername/concept-modern.git

# Enter the directory
cd concept-modern
```

### 3. Install Dependencies

```bash
# Install all dependencies
npm install

# If you encounter permission errors on macOS/Linux
sudo npm install

# For Windows, run terminal as Administrator
```

### 4. Environment Configuration (Optional)

Create a `.env` file for environment-specific settings:

```bash
# Create .env file
touch .env

# Add environment variables
echo "VITE_APP_TITLE=My Dashboard" >> .env
echo "VITE_API_URL=http://localhost:3001" >> .env
```

### 5. Start Development Server

```bash
# Start with default settings
npm run dev

# Start with specific host/port
npm run dev -- --host 0.0.0.0 --port 3001

# Start with HTTPS (requires certificate)
npm run dev -- --https
```

## VS Code Setup (Recommended)

### Install Recommended Extensions

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
    "bradlc.vscode-tailwindcss",
    "ritwickdey.liveserver",
    "formulahendry.auto-rename-tag",
    "vue.volar"
  ]
}
```

### Configure VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "scss.validate": false,
  "css.validate": false,
  "stylelint.validate": ["css", "scss"]
}
```

## Build for Production

### Standard Build

```bash
# Create production build
npm run build

# Files will be in dist/ directory
ls -la dist/
```

### Build with Analysis

```bash
# Build and analyze bundle size
npm run build -- --analyze

# Opens bundle analyzer in browser
```

### Preview Production Build

```bash
# Build and preview
npm run build
npm run preview

# Preview will run on http://localhost:4173
```

## Deployment

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
vercel
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

## Troubleshooting

### Common Issues and Solutions

#### 1. EACCES Permission Errors

**macOS/Linux:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**Windows:**
- Run terminal as Administrator
- Or install Node.js to a directory you own

#### 2. Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### 3. Port Already in Use

```bash
# Find process using port 3000
# macOS/Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000

# Kill the process or use different port
npm run dev -- --port 3001
```

#### 4. Vite Build Errors

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

#### 5. SCSS Compilation Errors

```bash
# Rebuild node-sass
npm rebuild sass

# Or reinstall
npm uninstall sass
npm install sass
```

### Getting More Help

If you're still having issues:

1. Check the [GitHub Issues](https://github.com/yourusername/concept-modern/issues)
2. Search for error messages
3. Create a new issue with:
   - Error message
   - Node/npm versions
   - Operating system
   - Steps to reproduce

## Next Steps

✅ Installation complete! Here's what to do next:

1. **[Explore the File Structure](file-structure.md)** - Understand project organization
2. **[Learn About Build Tools](build-tools.md)** - Master Vite configuration
3. **[Start Customizing](../customization/overview.md)** - Make it your own
4. **[Add Your First Page](../layout/page-structure.md)** - Extend functionality

---

Congratulations on setting up Concept! 🎉