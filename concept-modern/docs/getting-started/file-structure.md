# File Structure

Understanding the project structure is key to working efficiently with Concept. This guide explains the organization of files and directories.

## Project Root Structure

```
concept-modern/
├── src/                    # Source files (development)
├── dist/                   # Production build output
├── public/                 # Static public assets
├── docs/                   # Documentation files
├── scripts/                # Build and utility scripts
├── node_modules/           # Dependencies (git-ignored)
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata and scripts
├── package-lock.json      # Locked dependency versions
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Source Directory Structure

The `src/` directory contains all development files:

```
src/
├── assets/                 # Static assets
│   ├── fonts/             # Custom fonts
│   └── images/            # Images and icons
├── config/                # Configuration files
│   └── navigation.js      # Sidebar navigation config
├── js/                    # JavaScript modules
│   ├── app.js            # Main application entry
│   ├── components/       # Reusable components
│   └── pages/            # Page-specific scripts
├── pages/                 # HTML pages
│   ├── apps/             # Application pages
│   ├── auth/             # Authentication pages
│   ├── dashboards/       # Dashboard variants
│   ├── ecommerce/        # E-commerce pages
│   ├── email/            # Email app pages
│   ├── misc/             # Miscellaneous pages
│   ├── tables/           # Table examples
│   └── ui-elements/      # UI component demos
├── partials/              # Handlebars partials
│   ├── components/       # Reusable components
│   └── layouts/          # Layout partials
├── scss/                  # Sass stylesheets
│   ├── components/       # Component styles
│   ├── layouts/          # Layout styles
│   ├── pages/            # Page-specific styles
│   ├── utilities/        # Utility classes
│   ├── _variables.scss   # Sass variables
│   └── main.scss         # Main stylesheet
└── index.html            # Main entry point
```

## Key Directories Explained

### `/src/assets/`
Static assets that are processed by Vite:
- **fonts/** - Custom web fonts (if not using CDN)
- **images/** - Images, icons, logos

```
assets/
├── fonts/
│   └── inter/            # Inter font files
└── images/
    ├── logo.png          # Application logo
    ├── avatars/          # User avatars
    └── products/         # Product images
```

### `/src/js/`
JavaScript modules using ES6 syntax:

```
js/
├── app.js                 # Main app initialization
├── components/
│   ├── charts.js         # Chart.js wrapper
│   ├── datatables.js     # DataTables setup
│   ├── sidebar.js        # Sidebar functionality
│   └── tooltips.js       # Bootstrap tooltips
└── pages/
    ├── dashboard.js      # Dashboard-specific code
    ├── calendar.js       # Calendar page logic
    └── products.js       # Product page logic
```

### `/src/pages/`
All HTML pages organized by feature:

```
pages/
├── dashboards/
│   ├── finance.html      # Finance dashboard
│   ├── sales.html        # Sales dashboard
│   └── influencer.html   # Influencer dashboard
├── apps/
│   ├── calendar.html     # Calendar application
│   └── chat.html         # Chat application
├── auth/
│   ├── login.html        # Login page
│   ├── signup.html       # Registration page
│   └── forgot-password.html # Password reset
└── ui-elements/
    ├── buttons.html      # Button examples
    ├── cards.html        # Card layouts
    └── forms.html        # Form elements
```

### `/src/partials/`
Handlebars template partials for reusability:

```
partials/
├── layouts/
│   ├── base.hbs          # Base HTML structure
│   ├── main.hbs          # Main layout wrapper
│   ├── head.hbs          # HTML head section
│   ├── header.hbs        # Top navigation bar
│   ├── sidebar.hbs       # Side navigation
│   ├── footer.hbs        # Footer section
│   └── scripts.hbs       # Script includes
└── components/
    ├── breadcrumb.hbs    # Breadcrumb navigation
    ├── page-header.hbs   # Page title section
    └── card.hbs          # Reusable card component
```

### `/src/scss/`
Organized Sass files following ITCSS methodology:

```
scss/
├── _variables.scss        # Global variables
├── main.scss             # Main entry point
├── layouts/
│   ├── _layout.scss      # Overall layout
│   ├── _sidebar.scss     # Sidebar styles
│   ├── _header.scss      # Header styles
│   └── _footer.scss      # Footer styles
├── components/
│   ├── _buttons.scss     # Button styles
│   ├── _cards.scss       # Card styles
│   ├── _forms.scss       # Form styles
│   └── _tables.scss      # Table styles
├── pages/
│   ├── _dashboard.scss   # Dashboard specific
│   ├── _login.scss       # Login page styles
│   └── _products.scss    # Product pages
└── utilities/
    ├── _helpers.scss     # Helper classes
    └── _animations.scss  # Animations
```

## File Naming Conventions

### HTML Files
- Use kebab-case: `product-details.html`
- Group by feature: `pages/ecommerce/products.html`

### JavaScript Files
- Use camelCase for files: `productDetails.js`
- Use PascalCase for classes: `ProductManager.js`
- Suffix with type: `product.service.js`

### SCSS Files
- Prefix partials with underscore: `_buttons.scss`
- Match component names: `_product-card.scss`

### Asset Files
- Use kebab-case: `user-avatar-default.png`
- Include dimensions: `hero-banner-1920x600.jpg`
- Be descriptive: `icon-shopping-cart.svg`

## Important Files

### `vite.config.js`
Vite build configuration:
```javascript
export default {
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: '/index.html',
        // Add pages here
      }
    }
  }
}
```

### `package.json`
Project dependencies and scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### `/src/config/navigation.js`
Centralized navigation configuration:
```javascript
export const navigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'fa-chart-line',
    submenu: [...]
  }
]
```

## Adding New Files

### Adding a New Page
1. Create HTML file in appropriate directory:
   ```
   src/pages/features/new-feature.html
   ```

2. Add to `vite.config.js`:
   ```javascript
   input: {
     'new-feature': '/pages/features/new-feature.html'
   }
   ```

3. Create JavaScript if needed:
   ```
   src/js/pages/new-feature.js
   ```

4. Create SCSS if needed:
   ```
   src/scss/pages/_new-feature.scss
   ```

### Adding a New Component
1. Create component JavaScript:
   ```
   src/js/components/newComponent.js
   ```

2. Create component styles:
   ```
   src/scss/components/_new-component.scss
   ```

3. Import in main files:
   ```scss
   // In main.scss
   @import "components/new-component";
   ```

## Build Output Structure

After running `npm run build`, the `dist/` directory contains:

```
dist/
├── assets/
│   ├── css/              # Compiled CSS files
│   ├── js/               # Compiled JS files
│   └── images/           # Optimized images
├── pages/                # All HTML pages
├── index.html            # Main entry point
└── [other pages].html    # Other built pages
```

## Best Practices

### Organization
- Keep related files together
- Use consistent naming conventions
- Follow the established structure
- Document new patterns

### Performance
- Lazy load large components
- Optimize images before adding
- Use code splitting for pages
- Minimize third-party dependencies

### Maintenance
- Remove unused files
- Keep dependencies updated
- Document custom modifications
- Use meaningful commit messages

## Next Steps

Now that you understand the file structure:

1. **[Learn About Build Tools](build-tools.md)** - Vite configuration details
2. **[Page Structure](../layout/page-structure.md)** - How pages are constructed
3. **[Adding Components](../components/creating-components.md)** - Create new components
4. **[Customization Guide](../customization/overview.md)** - Modify the template

---

Understanding the file structure is crucial for efficient development. Take time to explore the directories and familiarize yourself with the organization.