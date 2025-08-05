# Quick Start Guide

Get your Concept dashboard up and running in just 5 minutes!

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))
- A modern web browser

To check if you have Node.js installed, run:
```bash
node --version
# Should output: v18.x.x or higher

npm --version
# Should output: 9.x.x or higher
```

## 🚀 5-Minute Setup

### Step 1: Get the Files

**Option A: Download**
1. Download the Concept template zip file
2. Extract it to your desired location
3. Open the folder in your terminal

**Option B: Clone from Git**
```bash
git clone https://github.com/yourusername/concept-modern.git
cd concept-modern
```

### Step 2: Install Dependencies

Run the following command in your project directory:

```bash
npm install
```

This will install all required packages including Bootstrap, Vite, and other dependencies.

### Step 3: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v7.0.6  ready in 325 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
  ➜  press h + enter to show help
```

### Step 4: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

🎉 **Congratulations!** You should now see the Concept dashboard running locally.

## Common Commands

### Development
```bash
# Start dev server with hot reload
npm run dev

# Start on a different port
npm run dev -- --port 3001
```

### Building for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Other Commands
```bash
# Clean build directory
npm run clean

# Check for dependency updates
npm outdated

# Update dependencies
npm update
```

## First Steps After Setup

### 1. Explore the Dashboard
- Click through different dashboard variants
- Try the sidebar navigation
- Test responsive behavior

### 2. Check Out Components
- Visit `/pages/ui-elements/general.html`
- Explore form elements
- View table examples

### 3. Try the Apps
- Open the email client
- Test the chat interface
- Browse the calendar

### 4. Customize Your First Page
1. Open `src/pages/misc/blank-page.html`
2. Add your content
3. Save and see instant updates

## Project Structure Overview

```
concept-modern/
├── src/
│   ├── index.html          # Main dashboard
│   ├── pages/              # All HTML pages
│   ├── js/                 # JavaScript files
│   ├── scss/               # Styles
│   └── assets/             # Images & fonts
├── package.json            # Dependencies
└── vite.config.js         # Build config
```

## Troubleshooting Quick Fixes

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3001
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear dist folder
npm run clean

# Rebuild
npm run build
```

### Vite Not Starting
Make sure you're in the correct directory:
```bash
pwd
# Should show: /path/to/concept-modern
```

## What's Next?

Now that you have Concept running:

1. **[Read the Installation Guide](installation.md)** - For detailed setup options
2. **[Understand File Structure](file-structure.md)** - Learn where everything is
3. **[Start Customizing](../customization/overview.md)** - Make it yours
4. **[Add New Pages](../layout/page-structure.md)** - Extend functionality

## Need Help?

- 📚 Check the full documentation in the `docs/` folder
- 🐛 Report issues on GitHub
- 💬 Join our community forum
- 📧 Email support for license holders

---

Happy coding! 🚀