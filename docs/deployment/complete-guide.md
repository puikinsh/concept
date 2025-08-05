# Complete Deployment Guide

This guide covers deploying Concept to various hosting platforms with proper routing configuration.

## Quick Fix Applied

We've already fixed the navigation links to work with Vite's build output. The links now point directly to the built files (e.g., `/dashboard-finance.html` instead of `/pages/dashboards/finance.html`).

## Build Process

### 1. Build for Production
```bash
npm run build
```

This creates a `dist/` folder with:
- Optimized HTML files
- Minified CSS and JavaScript
- Hashed assets for caching
- All static resources

### 2. Test Locally
```bash
npm run preview
```
Visit `http://localhost:4173` to test the production build.

## Deployment Options

### Option 1: Netlify (Recommended)

**Automatic Setup:**
1. Push your code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

The `_redirects` file in `/public` handles all routing automatically.

**Manual Deploy:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Option 2: Vercel

Create `vercel.json` in project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/$1" }
  ]
}
```

Deploy:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (Apache/Nginx)

#### Apache (.htaccess)
Already included in the build. Place in `dist/` folder:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/concept/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Option 5: Docker

Create `Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and run:
```bash
docker build -t concept-dashboard .
docker run -p 8080:80 concept-dashboard
```

## Environment Variables

### Setting API URLs

Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=My Dashboard
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Post-Deployment Checklist

### 1. Verify All Pages Load
- [ ] Homepage (`/`)
- [ ] Dashboard pages
- [ ] UI Elements pages
- [ ] Form pages
- [ ] Table pages
- [ ] E-commerce pages
- [ ] Authentication pages

### 2. Check Assets
- [ ] CSS loads correctly
- [ ] JavaScript executes
- [ ] Images display
- [ ] Fonts load
- [ ] Icons appear

### 3. Test Functionality
- [ ] Navigation works
- [ ] Charts render
- [ ] Tables sort/filter
- [ ] Forms validate
- [ ] Modals open/close

### 4. Performance
- [ ] Enable gzip compression
- [ ] Set cache headers
- [ ] Use CDN for assets
- [ ] Enable HTTP/2

### 5. Security
- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Remove source maps (optional)
- [ ] Implement CSP

## Troubleshooting

### Problem: 404 Errors on Pages

**Solution**: The navigation links have been fixed to match build output. If you still see 404s:
1. Clear browser cache
2. Check the build output in `dist/`
3. Verify server configuration

### Problem: Assets Not Loading

**Check**:
- Base URL in `vite.config.js` (should be `./`)
- Asset paths in CSS
- Server MIME types

### Problem: Blank White Page

**Debug**:
1. Open browser console
2. Check for JavaScript errors
3. Verify all chunks loaded
4. Check network tab for 404s

### Problem: Charts Not Displaying

**Verify**:
- Chart.js loaded
- Canvas elements exist
- No JavaScript errors
- Data format is correct

## Performance Optimization

### 1. Enable Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/javascript application/json;
gzip_min_length 1000;
```

### 2. Cache Headers

**Nginx**:
```nginx
# HTML files - no cache
location ~* \.(html)$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# Assets - long cache
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN Integration

Update asset URLs to use CDN:
```javascript
// vite.config.js
export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.yourdomain.com/' 
    : './'
});
```

## Monitoring

### 1. Analytics
Add analytics to track usage:
```html
<!-- In src/partials/layouts/scripts.hbs -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Error Tracking
Integrate error tracking:
```javascript
// In src/js/app.js
window.addEventListener('error', (event) => {
  // Send to error tracking service
});
```

### 3. Performance Monitoring
Use tools like:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## Maintenance

### Regular Updates
1. Update dependencies: `npm update`
2. Check for security vulnerabilities: `npm audit`
3. Test thoroughly before deploying
4. Keep backups of previous versions

### Rollback Strategy
1. Tag releases in Git
2. Keep previous build artifacts
3. Document deployment versions
4. Have rollback procedure ready

## Summary

Concept is now optimized for deployment with:
- ✅ Fixed navigation links
- ✅ Netlify redirects configured
- ✅ Build optimization
- ✅ Multiple deployment options
- ✅ Comprehensive documentation

Choose your preferred hosting platform and deploy with confidence!