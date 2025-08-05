# Theming Guide

Concept is designed with theming in mind, allowing you to create custom themes that match your brand or project requirements. This guide covers everything from simple color changes to complete theme systems.

## Theme Structure

### Theme Layers

Concept's theming system works in layers:

1. **Bootstrap Core** - Base Bootstrap 5 variables
2. **Concept Defaults** - Template-specific customizations
3. **Custom Theme** - Your theme overrides
4. **Component Overrides** - Specific component tweaks

### Key Theme Files

```
src/scss/
├── _variables.scss          # Global variables
├── themes/
│   ├── _default.scss       # Default theme
│   ├── _dark.scss          # Dark theme
│   └── _custom.scss        # Your custom theme
├── main.scss               # Import orchestration
└── custom/
    └── _theme-overrides.scss # Runtime overrides
```

## Creating a Custom Theme

### Step 1: Create Theme File

Create a new theme file:

```scss
// src/scss/themes/_corporate.scss

// Theme name and metadata
$theme-name: "corporate";
$theme-description: "Professional corporate theme";

// Color palette
$theme-colors: (
  "primary": #003366,
  "secondary": #0066cc,
  "success": #00a86b,
  "info": #17a2b8,
  "warning": #ffc107,
  "danger": #dc3545,
  "light": #f8f9fa,
  "dark": #001f3f
);

// Extended colors
$theme-extended-colors: (
  "brand": #002244,
  "accent": #0088ff,
  "muted": #6c757d,
  "highlight": #ffeb3b
);

// Typography
$theme-fonts: (
  "base": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  "heading": "'Poppins', sans-serif",
  "mono": "'JetBrains Mono', monospace"
);

// Spacing
$theme-spacing: (
  "tight": 0.25rem,
  "normal": 1rem,
  "relaxed": 1.5rem,
  "loose": 2rem
);

// Component specific
$theme-components: (
  "border-radius": 0.375rem,
  "border-radius-sm": 0.25rem,
  "border-radius-lg": 0.5rem,
  "box-shadow": 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075),
  "box-shadow-lg": 0 0.5rem 1rem rgba(0, 0, 0, 0.15)
);
```

### Step 2: Apply Theme Variables

Update your main variables file:

```scss
// src/scss/_variables.scss

// Import theme
@import "themes/corporate";

// Apply theme colors to Bootstrap
$primary: map-get($theme-colors, "primary");
$secondary: map-get($theme-colors, "secondary");
$success: map-get($theme-colors, "success");
$info: map-get($theme-colors, "info");
$warning: map-get($theme-colors, "warning");
$danger: map-get($theme-colors, "danger");
$light: map-get($theme-colors, "light");
$dark: map-get($theme-colors, "dark");

// Apply theme fonts
$font-family-base: map-get($theme-fonts, "base");
$headings-font-family: map-get($theme-fonts, "heading");
$font-family-monospace: map-get($theme-fonts, "mono");

// Apply component settings
$border-radius: map-get($theme-components, "border-radius");
$border-radius-sm: map-get($theme-components, "border-radius-sm");
$border-radius-lg: map-get($theme-components, "border-radius-lg");
$box-shadow: map-get($theme-components, "box-shadow");
$box-shadow-lg: map-get($theme-components, "box-shadow-lg");
```

### Step 3: Create Theme Utilities

Add theme-specific utility classes:

```scss
// src/scss/themes/_corporate-utilities.scss

// Extended color utilities
@each $name, $color in $theme-extended-colors {
  .text-#{$name} {
    color: $color !important;
  }
  
  .bg-#{$name} {
    background-color: $color !important;
  }
  
  .border-#{$name} {
    border-color: $color !important;
  }
  
  .btn-#{$name} {
    @include button-variant($color, $color);
  }
}

// Spacing utilities
@each $name, $space in $theme-spacing {
  .spacing-#{$name} {
    padding: $space;
    margin: $space;
  }
}
```

## Dark Mode Implementation

### CSS Variables Approach

```scss
// src/scss/themes/_dark-mode.scss

:root {
  // Light mode defaults
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  // Dark mode overrides
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #adb5bd;
  --border-color: #495057;
  --shadow-color: rgba(0, 0, 0, 0.3);
  
  // Component overrides
  --card-bg: var(--bg-secondary);
  --sidebar-bg: #161616;
  --header-bg: var(--bg-secondary);
}

// Apply variables
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.card {
  background-color: var(--card-bg);
  border-color: var(--border-color);
}
```

### JavaScript Theme Switcher

```javascript
// src/js/theme-switcher.js

export class ThemeSwitcher {
  constructor() {
    this.theme = this.loadTheme() || 'light';
    this.init();
  }
  
  init() {
    // Apply saved theme
    this.applyTheme(this.theme);
    
    // Setup toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleTheme());
    }
    
    // Watch for system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          if (this.theme === 'auto') {
            this.applySystemTheme();
          }
        });
    }
  }
  
  toggleTheme() {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(this.theme);
    this.theme = themes[(currentIndex + 1) % themes.length];
    this.applyTheme(this.theme);
    this.saveTheme(this.theme);
  }
  
  applyTheme(theme) {
    if (theme === 'auto') {
      this.applySystemTheme();
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    this.updateToggleButton(theme);
  }
  
  applySystemTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
  
  updateToggleButton(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const icon = toggle.querySelector('i');
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 
                      theme === 'auto' ? 'fa-solid fa-circle-half-stroke' : 
                      'fa-solid fa-moon';
    }
  }
  
  saveTheme(theme) {
    localStorage.setItem('concept-theme', theme);
  }
  
  loadTheme() {
    return localStorage.getItem('concept-theme');
  }
}

// Auto-initialize
new ThemeSwitcher();
```

## Theme Presets

### Minimal Theme

```scss
// src/scss/themes/_minimal.scss

$theme-colors: (
  "primary": #000000,
  "secondary": #666666,
  "success": #00c853,
  "danger": #ff1744,
  "light": #ffffff,
  "dark": #000000
);

$theme-components: (
  "border-radius": 0,
  "box-shadow": none,
  "border-width": 1px
);

// Minimal typography
$font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
$headings-font-weight: 300;
$btn-font-weight: 400;
```

### Material Design Theme

```scss
// src/scss/themes/_material.scss

$theme-colors: (
  "primary": #1976d2,
  "secondary": #dc004e,
  "success": #388e3c,
  "info": #0288d1,
  "warning": #f57c00,
  "danger": #d32f2f
);

$theme-components: (
  "border-radius": 4px,
  "box-shadow": 0 3px 1px -2px rgba(0,0,0,.2), 
                0 2px 2px 0 rgba(0,0,0,.14), 
                0 1px 5px 0 rgba(0,0,0,.12),
  "transition": all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
);

// Material typography
$font-family-base: "Roboto", sans-serif;
$headings-font-weight: 400;
```

### Gradient Theme

```scss
// src/scss/themes/_gradient.scss

// Gradient backgrounds
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$gradient-success: linear-gradient(135deg, #00c853 0%, #00e676 100%);
$gradient-danger: linear-gradient(135deg, #ff5252 0%, #ff1744 100%);

// Apply to buttons
.btn-primary {
  background: $gradient-primary;
  border: none;
  
  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46a1 100%);
  }
}

// Gradient cards
.card-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border: none;
}

// Gradient text
.text-gradient {
  background: $gradient-primary;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Component Theming

### Sidebar Theming

```scss
// src/scss/components/_sidebar-theme.scss

.sidebar {
  // Use theme variables
  background-color: var(--sidebar-bg, $sidebar-bg);
  color: var(--sidebar-color, $sidebar-color);
  
  // Dark sidebar variant
  &.sidebar-dark {
    --sidebar-bg: #1e1e1e;
    --sidebar-color: #ffffff;
    --sidebar-link-color: rgba(255, 255, 255, 0.8);
    --sidebar-link-hover: #ffffff;
    --sidebar-border: rgba(255, 255, 255, 0.1);
  }
  
  // Light sidebar variant
  &.sidebar-light {
    --sidebar-bg: #ffffff;
    --sidebar-color: #495057;
    --sidebar-link-color: #495057;
    --sidebar-link-hover: #000000;
    --sidebar-border: rgba(0, 0, 0, 0.1);
  }
  
  // Gradient sidebar
  &.sidebar-gradient {
    background: linear-gradient(180deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  }
}
```

### Card Theming

```scss
// src/scss/components/_card-theme.scss

.card {
  // Theme variants
  &.card-minimal {
    border: none;
    box-shadow: none;
    background-color: transparent;
  }
  
  &.card-outlined {
    background-color: transparent;
    border-width: 2px;
  }
  
  &.card-elevated {
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  &.card-glassmorphic {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
```

## Theme Configuration

### Theme Manager

```javascript
// src/js/theme-manager.js

export class ThemeManager {
  constructor() {
    this.themes = {
      default: () => import('./themes/default'),
      dark: () => import('./themes/dark'),
      corporate: () => import('./themes/corporate'),
      minimal: () => import('./themes/minimal')
    };
    
    this.currentTheme = 'default';
    this.init();
  }
  
  async init() {
    const savedTheme = localStorage.getItem('selected-theme') || 'default';
    await this.loadTheme(savedTheme);
  }
  
  async loadTheme(themeName) {
    if (!this.themes[themeName]) {
      console.error(`Theme "${themeName}" not found`);
      return;
    }
    
    try {
      // Remove previous theme
      this.removeTheme(this.currentTheme);
      
      // Load new theme
      const theme = await this.themes[themeName]();
      theme.apply();
      
      this.currentTheme = themeName;
      localStorage.setItem('selected-theme', themeName);
      
      // Emit theme change event
      window.dispatchEvent(new CustomEvent('theme-changed', {
        detail: { theme: themeName }
      }));
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }
  
  removeTheme(themeName) {
    document.documentElement.classList.remove(`theme-${themeName}`);
  }
  
  getAvailableThemes() {
    return Object.keys(this.themes);
  }
  
  getCurrentTheme() {
    return this.currentTheme;
  }
}
```

### Theme Settings UI

```html
<!-- Theme selection dropdown -->
<div class="theme-selector">
  <label for="theme-select">Choose Theme:</label>
  <select id="theme-select" class="form-select">
    <option value="default">Default</option>
    <option value="dark">Dark</option>
    <option value="corporate">Corporate</option>
    <option value="minimal">Minimal</option>
  </select>
</div>

<!-- Theme customizer panel -->
<div class="theme-customizer">
  <h5>Customize Theme</h5>
  
  <!-- Color pickers -->
  <div class="color-picker-group">
    <label>Primary Color</label>
    <input type="color" id="primary-color" value="#5969ff">
  </div>
  
  <!-- Font selection -->
  <div class="font-selector">
    <label>Font Family</label>
    <select id="font-family">
      <option value="Inter">Inter</option>
      <option value="Roboto">Roboto</option>
      <option value="Poppins">Poppins</option>
    </select>
  </div>
  
  <!-- Border radius -->
  <div class="radius-slider">
    <label>Border Radius</label>
    <input type="range" id="border-radius" min="0" max="20" value="8">
  </div>
</div>
```

## Best Practices

### DO:
- ✅ Use CSS variables for dynamic theming
- ✅ Keep themes modular and importable
- ✅ Test themes across all components
- ✅ Provide theme preview functionality
- ✅ Save user theme preference
- ✅ Consider accessibility (contrast ratios)

### DON'T:
- ❌ Hardcode colors in components
- ❌ Use !important excessively
- ❌ Create themes without testing
- ❌ Ignore system preferences
- ❌ Mix theme systems
- ❌ Forget about print styles

## Performance Optimization

### Lazy Load Themes

```javascript
// Only load theme CSS when needed
async function loadThemeCSS(themeName) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/themes/${themeName}.css`;
  link.id = `theme-${themeName}`;
  document.head.appendChild(link);
  
  // Wait for load
  return new Promise((resolve) => {
    link.onload = resolve;
  });
}
```

### Theme Preloading

```html
<!-- Preload critical theme resources -->
<link rel="preload" href="/themes/default.css" as="style">
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin>
```

## Troubleshooting

### Common Issues

1. **Theme not applying**: Check import order in main.scss
2. **Colors not updating**: Clear browser cache, check CSS specificity
3. **Dark mode flashing**: Add theme class to HTML element early
4. **Font loading issues**: Use font-display: swap
5. **Performance issues**: Minimize theme CSS, use CSS variables

## Next Steps

Explore more customization options:

1. **[Sass Variables](sass-variables.md)** - All available variables
2. **[Color System](colors.md)** - Color utilities and palette
3. **[Component Styling](components.md)** - Component customization
4. **[Layout Theming](../layout/theming.md)** - Layout-specific theming

---

With proper theming, you can transform Concept to match any brand or design system. Start with colors and typography, then expand to complete theme systems! 🎨