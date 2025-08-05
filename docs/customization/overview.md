# Customization Overview

Concept is built with customization in mind. This guide provides an overview of all the ways you can make the template your own.

## Customization Approaches

### 1. Quick Customizations
- Change colors and fonts
- Modify spacing and sizes
- Toggle features on/off
- Adjust layouts

### 2. Intermediate Customizations
- Create custom themes
- Add new components
- Modify existing components
- Integrate new plugins

### 3. Advanced Customizations
- Restructure layouts
- Build custom applications
- Create new design systems
- Implement custom build processes

## Customization Layers

### SCSS Variables
The fastest way to customize Concept is through Sass variables:

```scss
// src/scss/_variables.scss
$primary: #5969ff;
$secondary: #6c757d;
$success: #28a745;
$font-family-base: 'Inter', sans-serif;
$border-radius: 0.375rem;
```

### Component Overrides
Override specific components without modifying core files:

```scss
// src/scss/custom/_buttons.scss
.btn-primary {
  background: linear-gradient(45deg, $primary, lighten($primary, 10%));
  border: none;
  box-shadow: 0 4px 6px rgba($primary, 0.3);
}
```

### Layout Modifications
Customize the overall layout structure:

```javascript
// src/config/layout.js
export const layoutConfig = {
  sidebar: {
    width: '260px',
    collapsed: '70px',
    dark: true
  },
  header: {
    height: '70px',
    fixed: true
  }
};
```

## Key Customization Files

### Style Customization
- **`_variables.scss`** - Global Sass variables
- **`main.scss`** - Main stylesheet entry
- **`custom/`** - Your custom styles directory

### JavaScript Customization
- **`config/`** - Configuration files
- **`js/custom/`** - Custom JavaScript modules
- **`app.js`** - Main application logic

### Layout Customization
- **`partials/layouts/`** - Layout templates
- **`partials/components/`** - Reusable components
- **`pages/`** - Page templates

## Customization Workflow

### Step 1: Plan Your Changes
Before starting, identify:
- What needs to be changed
- Which files are affected
- Whether to override or modify
- Impact on other components

### Step 2: Set Up Custom Files
Create a custom directory structure:

```
src/
├── scss/
│   └── custom/
│       ├── _variables.scss    # Your variables
│       ├── _components.scss   # Component overrides
│       └── _theme.scss        # Theme customizations
└── js/
    └── custom/
        ├── theme.js           # Theme switcher
        └── components.js      # Custom components
```

### Step 3: Override Safely
Always override rather than modify core files:

```scss
// DO: Create custom/_buttons.scss
.btn-primary {
  // Your customizations
}

// DON'T: Modify components/_buttons.scss directly
```

### Step 4: Test Thoroughly
- Test in development mode
- Build for production
- Check responsive behavior
- Verify cross-browser compatibility

## Quick Start Examples

### Change Primary Color
```scss
// src/scss/_variables.scss
$primary: #7c3aed; // Purple instead of blue
```

### Change Font Family
```scss
// src/scss/_variables.scss
$font-family-base: 'Roboto', sans-serif;

// Add font import
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
```

### Customize Sidebar Width
```scss
// src/scss/custom/_layout.scss
.sidebar {
  width: 280px; // Instead of 260px
  
  &.collapsed {
    width: 80px; // Instead of 70px
  }
}
```

### Add Dark Mode
```javascript
// src/js/custom/theme.js
export function initThemeSwitcher() {
  const toggle = document.getElementById('darkModeToggle');
  
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', 
      document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
  });
}
```

## Customization Best Practices

### DO:
- ✅ Use variables for consistency
- ✅ Create custom files for overrides
- ✅ Document your customizations
- ✅ Test across browsers
- ✅ Keep customizations modular
- ✅ Use version control

### DON'T:
- ❌ Modify core Bootstrap files
- ❌ Edit vendor libraries directly
- ❌ Use !important excessively
- ❌ Hardcode values
- ❌ Skip responsive testing
- ❌ Forget about accessibility

## Common Customizations

### 1. Branding
- Logo replacement
- Color scheme
- Typography
- Favicon

### 2. Layout
- Sidebar behavior
- Header style
- Footer content
- Page width

### 3. Components
- Button styles
- Card designs
- Form elements
- Table layouts

### 4. Features
- Remove unused pages
- Add new functionality
- Integrate APIs
- Custom widgets

## Advanced Customization

### Creating a Theme System
```javascript
// src/js/custom/theme-manager.js
class ThemeManager {
  constructor() {
    this.themes = {
      default: { primary: '#5969ff', secondary: '#6c757d' },
      dark: { primary: '#1a1a1a', secondary: '#2d2d2d' },
      corporate: { primary: '#003366', secondary: '#0066cc' }
    };
  }
  
  applyTheme(themeName) {
    const theme = this.themes[themeName];
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }
}
```

### Custom Build Process
```javascript
// vite.config.custom.js
import { defineConfig } from 'vite';
import customPlugin from './plugins/custom';

export default defineConfig({
  plugins: [
    customPlugin({
      // Your custom options
    })
  ]
});
```

## Troubleshooting Customizations

### Styles Not Applying
1. Check import order in `main.scss`
2. Verify file paths
3. Clear browser cache
4. Check CSS specificity

### JavaScript Errors
1. Check console for errors
2. Verify module imports
3. Ensure DOM is ready
4. Check for conflicts

### Build Issues
1. Clear Vite cache
2. Check for syntax errors
3. Verify dependencies
4. Review build logs

## Next Steps

Dive deeper into specific customization topics:

1. **[Theming Guide](theming.md)** - Create custom themes
2. **[Sass Variables](sass-variables.md)** - All available variables
3. **[Color System](colors.md)** - Color customization
4. **[Component Styling](components.md)** - Customize components
5. **[Layout Options](../layout/overview.md)** - Layout customization

---

Remember: Good customization maintains the template's quality while adding your unique touch. Start small, test often, and build incrementally! 🎨