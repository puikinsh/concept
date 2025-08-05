# Build Tools & Configuration

Concept uses Vite as its build tool, providing lightning-fast development and optimized production builds. This guide covers everything you need to know about the build system.

## Why Vite?

Vite offers several advantages over traditional bundlers:

- ⚡ **Instant Server Start** - No bundling required in development
- 🔥 **Lightning Fast HMR** - Hot Module Replacement in milliseconds
- 📦 **Optimized Builds** - Rollup-based production builds
- 🎯 **Native ESM** - Leverages browser's native ES modules
- 🔧 **Zero Config** - Works out of the box with sensible defaults

## Vite Configuration

The `vite.config.js` file controls how Vite builds your project:

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  base: '/',
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // Add all your pages here
        login: resolve(__dirname, 'src/pages/auth/login.html'),
        products: resolve(__dirname, 'src/pages/ecommerce/products.html'),
        // ... more pages
      }
    }
  },
  
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        title: 'Concept Dashboard'
      }
    }),
    viteStaticCopy({
      targets: [
        { src: 'assets/images/*', dest: 'assets/images' }
      ]
    })
  ],
  
  server: {
    port: 3000,
    hot: true,
    open: true
  }
});
```

## Key Configuration Options

### Root Directory
```javascript
root: 'src'
```
Sets the project root to the `src` directory.

### Build Output
```javascript
build: {
  outDir: '../dist',
  emptyOutDir: true
}
```
- `outDir`: Where production files are generated
- `emptyOutDir`: Cleans the output directory before building

### Multiple Entry Points
```javascript
rollupOptions: {
  input: {
    main: '/index.html',
    dashboard: '/pages/dashboard.html',
    login: '/pages/auth/login.html'
  }
}
```
Each entry creates a separate HTML file in the build.

### Development Server
```javascript
server: {
  port: 3000,
  hot: true,
  open: true,
  host: 'localhost'
}
```

## NPM Scripts

The `package.json` defines useful scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "build:analyze": "vite build --analyze",
    "build:watch": "vite build --watch"
  }
}
```

### Script Explanations

- **`npm run dev`** - Start development server
- **`npm run build`** - Create production build
- **`npm run preview`** - Preview production build locally
- **`npm run clean`** - Remove dist directory
- **`npm run build:analyze`** - Analyze bundle size
- **`npm run build:watch`** - Rebuild on file changes

## Development Workflow

### 1. Starting Development

```bash
npm run dev
```

This starts the Vite dev server with:
- Hot Module Replacement (HMR)
- Fast refresh for styles
- Error overlay
- Network access for mobile testing

### 2. Making Changes

When you modify files:
- **HTML/Handlebars** - Page refreshes automatically
- **SCSS** - Styles update without refresh
- **JavaScript** - Modules hot-reload
- **Assets** - Changes reflect immediately

### 3. Adding New Pages

To add a new page:

1. Create the HTML file:
   ```html
   <!-- src/pages/features/new-feature.html -->
   {{> layouts/main title="New Feature"}}
   
   {{#*inline "content"}}
     <!-- Page content -->
   {{/inline}}
   
   {{> layouts/base}}
   ```

2. Add to `vite.config.js`:
   ```javascript
   input: {
     'new-feature': resolve(__dirname, 'src/pages/features/new-feature.html')
   }
   ```

3. The page is now accessible at `/pages/features/new-feature.html`

## Production Build

### Building for Production

```bash
npm run build
```

This command:
1. Cleans the output directory
2. Compiles SCSS to CSS
3. Transpiles JavaScript
4. Optimizes assets
5. Generates HTML files
6. Creates source maps

### Build Optimizations

Vite automatically applies these optimizations:

- **Code Splitting** - Shared code in separate chunks
- **Tree Shaking** - Removes unused code
- **Minification** - Compressed HTML, CSS, JS
- **Asset Optimization** - Compressed images
- **CSS Extraction** - Separate CSS files
- **Chunk Hashing** - Cache busting

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].css     # Main styles
│   ├── index-[hash].js      # Main JavaScript
│   └── vendor-[hash].js     # Vendor libraries
├── pages/
│   └── [all HTML pages]
├── index.html
└── favicon.ico
```

## Environment Variables

### Using Environment Variables

Create a `.env` file:
```env
VITE_APP_NAME=My Dashboard
VITE_API_URL=https://api.example.com
VITE_VERSION=1.0.0
```

Access in JavaScript:
```javascript
console.log(import.meta.env.VITE_APP_NAME);
console.log(import.meta.env.VITE_API_URL);
```

Access in HTML/Handlebars:
```html
<title>{{env.VITE_APP_NAME}}</title>
```

### Environment-Specific Builds

```bash
# Development
npm run dev

# Production
npm run build

# Staging (with .env.staging)
npm run build -- --mode staging
```

## Advanced Configuration

### Custom Plugins

Add plugins to extend Vite functionality:

```javascript
import imagemin from 'vite-plugin-imagemin';

export default {
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      svgo: { plugins: [{ name: 'removeViewBox' }] }
    })
  ]
}
```

### Proxy Configuration

For API development:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### Build Performance

Optimize build performance:

```javascript
build: {
  // Increase chunk size warning limit
  chunkSizeWarningLimit: 1000,
  
  // Optimize dependencies
  commonjsOptions: {
    include: [/node_modules/]
  },
  
  // Source maps only for errors
  sourcemap: 'hidden'
}
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill
```

#### Build Errors
```bash
# Clear cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### HMR Not Working
```javascript
// Add to vite.config.js
server: {
  watch: {
    usePolling: true
  }
}
```

#### Large Bundle Size
```bash
# Analyze bundle
npm run build -- --analyze

# Check visualization at:
# http://localhost:8888
```

## Deployment Configuration

### Static Hosting

For static hosts (Netlify, Vercel):
```javascript
base: '/',
build: {
  outDir: 'dist'
}
```

### Subdirectory Deployment

For subdirectory deployment:
```javascript
base: '/admin/',
build: {
  outDir: 'dist',
  assetsDir: 'assets'
}
```

### Server Configuration

Example nginx config:
```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/concept/dist;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  location /assets {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

## Best Practices

### Development
- Use environment variables for configuration
- Keep `vite.config.js` clean and documented
- Leverage HMR for faster development
- Use development tools and browser extensions

### Production
- Always test production builds locally
- Monitor bundle sizes
- Enable appropriate caching headers
- Use CDN for static assets
- Implement proper error tracking

### Performance
- Lazy load large components
- Use dynamic imports for code splitting
- Optimize images before adding
- Minimize third-party dependencies

## Next Steps

Master the build system with these guides:

1. **[Deployment Guide](../deployment/overview.md)** - Deploy to production
2. **[Performance Optimization](../advanced/optimization.md)** - Speed up your app
3. **[Custom Builds](../advanced/custom-builds.md)** - Advanced configurations
4. **[CI/CD Setup](../deployment/ci-cd.md)** - Automated deployments

---

Understanding Vite and the build system empowers you to customize and optimize your development workflow. Happy building! 🚀