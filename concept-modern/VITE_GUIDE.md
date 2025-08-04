# Vite Build System Guide

This project uses Vite as the build tool with Handlebars for templating. This guide helps you understand the setup and common tasks.

## Project Structure

```
concept-modern/
├── src/                    # Source files
│   ├── assets/            # Static assets (images, fonts)
│   ├── js/                # JavaScript files
│   │   ├── app.js         # Main entry point
│   │   ├── components/    # Reusable JS components
│   │   └── pages/         # Page-specific JS
│   ├── scss/              # SCSS stylesheets
│   │   ├── main.scss      # Main stylesheet
│   │   ├── components/    # Component styles
│   │   └── pages/         # Page-specific styles
│   ├── pages/             # HTML pages
│   ├── partials/          # Handlebars partials
│   │   └── layouts/       # Layout partials (header, sidebar, etc.)
│   └── index.html         # Main entry page
├── dist/                  # Build output (git-ignored)
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Key Features

### 1. No CDN Dependencies
All dependencies are bundled locally:
- Bootstrap 5 is installed via npm
- FontAwesome is installed via npm
- Only Google Fonts uses CDN (for optimal caching)

### 2. Handlebars Templating
- Reusable partials for common elements (header, sidebar, footer)
- Page-specific variables (pageTitle, activeMenu, activePage)
- Helper functions for conditionals and comparisons

### 3. Module-based JavaScript
- ES6 modules with proper imports
- Bootstrap components imported as needed
- Page-specific scripts loaded only when needed

## Common Tasks

### Adding a New Page

1. **Create the HTML file** in the appropriate directory:
   ```
   src/pages/your-new-page.html
   ```

2. **Use the standard template structure**:
   ```html
   <!doctype html>
   <html lang="en">
   <head>
       {{> layouts/head pageTitle="Your Page Title" }}
   </head>
   <body>
       <div class="dashboard-main-wrapper">
           {{> layouts/header }}
           {{> layouts/sidebar activeMenu="menu-id" activePage="page-id" }}
           
           <div class="dashboard-wrapper">
               <div class="dashboard-content">
                   <!-- Your content here -->
               </div>
               {{> layouts/footer }}
           </div>
       </div>
       
       {{> layouts/scripts }}
       
       <!-- Page specific JS if needed -->
       <script type="module" src="../js/pages/your-page.js"></script>
   </body>
   </html>
   ```

3. **Add to vite.config.js**:
   ```js
   rollupOptions: {
     input: {
       // ... existing entries
       'your-new-page': resolve(__dirname, 'src/pages/your-new-page.html'),
     }
   }
   ```

4. **Update navigation** in `src/partials/layouts/sidebar.hbs`

### Adding Page-Specific Styles

1. Create a new SCSS file:
   ```
   src/scss/pages/_your-page.scss
   ```

2. Import it in `src/scss/main.scss`:
   ```scss
   @import "pages/your-page";
   ```

### Adding Page-Specific JavaScript

1. Create a new JS file:
   ```
   src/js/pages/your-page.js
   ```

2. Import Bootstrap if needed:
   ```js
   import * as bootstrap from 'bootstrap';
   ```

3. Reference it in your HTML page:
   ```html
   <script type="module" src="../js/pages/your-page.js"></script>
   ```

## Build Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Best Practices

1. **Always use relative paths** in HTML files for JS imports
2. **Import Bootstrap components** only when needed
3. **Use Handlebars partials** for repeated elements
4. **Keep page-specific code** in separate files
5. **Use SCSS variables** for consistent theming
6. **Test the production build** before deployment

## Troubleshooting

### Module not found errors
- Ensure all imports use proper paths
- Check that the file is added to vite.config.js

### Styles not loading
- Verify SCSS file is imported in main.scss
- Check for syntax errors in SCSS

### JavaScript errors
- Import Bootstrap before using its components
- Use proper module syntax (import/export)

### 404 errors in development
- Add HTML file to vite.config.js input
- Restart the dev server after config changes

## Helper Scripts

Run the build utility to find missing HTML files:
```bash
node scripts/build-utils.js
```

This will scan for all HTML files and show which ones need to be added to the Vite config.