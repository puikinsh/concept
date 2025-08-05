# Static Hosting Deployment Guide

This guide explains how to deploy Concept to static hosting services and fix common routing issues.

## The 404 Issue

When you deploy Concept to a static server, you may encounter 404 errors for all pages except `index.html`. This happens because:

1. Vite builds files with simplified names (e.g., `dashboard-finance.html`)
2. But the navigation links point to nested paths (e.g., `/pages/dashboards/finance.html`)
3. Static servers can't find these nested paths because they don't exist in the build

## Solution 1: Server Configuration (Recommended)

### Nginx Configuration

Add rewrite rules to handle the path mapping:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/concept/dist;
    
    # Rewrite rules for Concept dashboard
    rewrite ^/pages/dashboards/finance\.html$ /dashboard-finance.html last;
    rewrite ^/pages/dashboards/sales\.html$ /dashboard-sales.html last;
    rewrite ^/pages/dashboards/influencer\.html$ /dashboard-influencer.html last;
    
    rewrite ^/pages/ui-elements/cards\.html$ /ui-cards.html last;
    rewrite ^/pages/ui-elements/general\.html$ /ui-general.html last;
    rewrite ^/pages/ui-elements/typography\.html$ /ui-typography.html last;
    
    rewrite ^/pages/form-elements\.html$ /form-elements.html last;
    rewrite ^/pages/form-validation\.html$ /form-validation.html last;
    rewrite ^/pages/multiselect\.html$ /multiselect.html last;
    
    rewrite ^/pages/charts/index\.html$ /charts.html last;
    
    rewrite ^/pages/tables/general-tables\.html$ /general-tables.html last;
    rewrite ^/pages/tables/data-tables\.html$ /data-tables.html last;
    
    rewrite ^/pages/ecommerce/products\.html$ /products.html last;
    rewrite ^/pages/ecommerce/product-single\.html$ /product-single.html last;
    rewrite ^/pages/ecommerce/checkout\.html$ /checkout.html last;
    
    rewrite ^/pages/apps/influencer-finder\.html$ /influencer-finder.html last;
    rewrite ^/pages/apps/influencer-profile\.html$ /influencer-profile.html last;
    
    rewrite ^/pages/calendar\.html$ /calendar.html last;
    rewrite ^/pages/chat\.html$ /chat.html last;
    rewrite ^/pages/inbox\.html$ /inbox.html last;
    rewrite ^/pages/users\.html$ /users.html last;
    rewrite ^/pages/timeline\.html$ /timeline.html last;
    rewrite ^/pages/settings\.html$ /settings.html last;
    
    rewrite ^/pages/auth/login\.html$ /login.html last;
    rewrite ^/pages/auth/signup\.html$ /signup.html last;
    rewrite ^/pages/auth/forgot-password\.html$ /forgot-password.html last;
    
    rewrite ^/pages/misc/blank-page\.html$ /blank-page.html last;
    rewrite ^/pages/misc/404\.html$ /404.html last;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache .htaccess

Create a `.htaccess` file in your dist folder:

```apache
RewriteEngine On

# Dashboard pages
RewriteRule ^pages/dashboards/finance\.html$ dashboard-finance.html [L]
RewriteRule ^pages/dashboards/sales\.html$ dashboard-sales.html [L]
RewriteRule ^pages/dashboards/influencer\.html$ dashboard-influencer.html [L]

# UI Elements
RewriteRule ^pages/ui-elements/cards\.html$ ui-cards.html [L]
RewriteRule ^pages/ui-elements/general\.html$ ui-general.html [L]
RewriteRule ^pages/ui-elements/typography\.html$ ui-typography.html [L]

# Forms
RewriteRule ^pages/form-elements\.html$ form-elements.html [L]
RewriteRule ^pages/form-validation\.html$ form-validation.html [L]
RewriteRule ^pages/multiselect\.html$ multiselect.html [L]

# Charts
RewriteRule ^pages/charts/index\.html$ charts.html [L]

# Tables
RewriteRule ^pages/tables/general-tables\.html$ general-tables.html [L]
RewriteRule ^pages/tables/data-tables\.html$ data-tables.html [L]

# E-commerce
RewriteRule ^pages/ecommerce/products\.html$ products.html [L]
RewriteRule ^pages/ecommerce/product-single\.html$ product-single.html [L]
RewriteRule ^pages/ecommerce/checkout\.html$ checkout.html [L]

# Apps
RewriteRule ^pages/apps/influencer-finder\.html$ influencer-finder.html [L]
RewriteRule ^pages/apps/influencer-profile\.html$ influencer-profile.html [L]

# Other pages
RewriteRule ^pages/calendar\.html$ calendar.html [L]
RewriteRule ^pages/chat\.html$ chat.html [L]
RewriteRule ^pages/inbox\.html$ inbox.html [L]
RewriteRule ^pages/users\.html$ users.html [L]
RewriteRule ^pages/timeline\.html$ timeline.html [L]
RewriteRule ^pages/settings\.html$ settings.html [L]

# Auth pages
RewriteRule ^pages/auth/login\.html$ login.html [L]
RewriteRule ^pages/auth/signup\.html$ signup.html [L]
RewriteRule ^pages/auth/forgot-password\.html$ forgot-password.html [L]

# Misc pages
RewriteRule ^pages/misc/blank-page\.html$ blank-page.html [L]
RewriteRule ^pages/misc/404\.html$ 404.html [L]

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Solution 2: Fix Build Output (Alternative)

Modify the Vite build configuration to maintain the directory structure:

```javascript
// vite.config.js modification
build: {
  rollupOptions: {
    input: {
      // ... existing inputs
    },
    output: {
      entryFileNames: (chunkInfo) => {
        // Maintain directory structure for HTML files
        if (chunkInfo.name.includes('dashboard-')) {
          return 'pages/dashboards/[name].html';
        }
        if (chunkInfo.name.includes('ui-')) {
          return 'pages/ui-elements/[name].html';
        }
        // ... add more patterns
        return '[name].html';
      }
    }
  }
}
```

## Solution 3: Update Navigation Links (Simplest)

The simplest solution is to update all navigation links to match the build output. Create a script to fix all links:

```bash
#!/bin/bash
# fix-links.sh

# Update sidebar links
sed -i 's|href="/pages/dashboards/finance.html"|href="/dashboard-finance.html"|g' src/partials/layouts/sidebar.hbs
sed -i 's|href="/pages/dashboards/sales.html"|href="/dashboard-sales.html"|g' src/partials/layouts/sidebar.hbs
sed -i 's|href="/pages/dashboards/influencer.html"|href="/dashboard-influencer.html"|g' src/partials/layouts/sidebar.hbs
# ... add all other link updates
```

## Platform-Specific Solutions

### Netlify

Create a `_redirects` file in your `public` folder:

```
/pages/dashboards/finance.html    /dashboard-finance.html    200
/pages/dashboards/sales.html      /dashboard-sales.html      200
/pages/dashboards/influencer.html /dashboard-influencer.html 200
/pages/ui-elements/cards.html     /ui-cards.html            200
/pages/ui-elements/general.html   /ui-general.html          200
/pages/ui-elements/typography.html /ui-typography.html      200
/pages/form-elements.html         /form-elements.html       200
/pages/form-validation.html       /form-validation.html     200
/pages/multiselect.html           /multiselect.html         200
/pages/charts/index.html          /charts.html              200
/pages/tables/general-tables.html /general-tables.html      200
/pages/tables/data-tables.html    /data-tables.html         200
/pages/ecommerce/products.html    /products.html            200
/pages/ecommerce/product-single.html /product-single.html   200
/pages/ecommerce/checkout.html    /checkout.html            200
/pages/apps/influencer-finder.html /influencer-finder.html  200
/pages/apps/influencer-profile.html /influencer-profile.html 200
/pages/calendar.html              /calendar.html            200
/pages/chat.html                  /chat.html                200
/pages/inbox.html                 /inbox.html               200
/pages/users.html                 /users.html               200
/pages/timeline.html              /timeline.html            200
/pages/settings.html              /settings.html            200
/pages/auth/login.html            /login.html               200
/pages/auth/signup.html           /signup.html              200
/pages/auth/forgot-password.html  /forgot-password.html     200
/pages/misc/blank-page.html       /blank-page.html          200
/pages/misc/404.html              /404.html                 200
```

### Vercel

Create a `vercel.json` file in your project root:

```json
{
  "rewrites": [
    { "source": "/pages/dashboards/finance.html", "destination": "/dashboard-finance.html" },
    { "source": "/pages/dashboards/sales.html", "destination": "/dashboard-sales.html" },
    { "source": "/pages/dashboards/influencer.html", "destination": "/dashboard-influencer.html" },
    { "source": "/pages/ui-elements/cards.html", "destination": "/ui-cards.html" },
    { "source": "/pages/ui-elements/general.html", "destination": "/ui-general.html" },
    { "source": "/pages/ui-elements/typography.html", "destination": "/ui-typography.html" },
    { "source": "/pages/form-elements.html", "destination": "/form-elements.html" },
    { "source": "/pages/form-validation.html", "destination": "/form-validation.html" },
    { "source": "/pages/multiselect.html", "destination": "/multiselect.html" },
    { "source": "/pages/charts/index.html", "destination": "/charts.html" },
    { "source": "/pages/tables/general-tables.html", "destination": "/general-tables.html" },
    { "source": "/pages/tables/data-tables.html", "destination": "/data-tables.html" },
    { "source": "/pages/ecommerce/products.html", "destination": "/products.html" },
    { "source": "/pages/ecommerce/product-single.html", "destination": "/product-single.html" },
    { "source": "/pages/ecommerce/checkout.html", "destination": "/checkout.html" },
    { "source": "/pages/apps/influencer-finder.html", "destination": "/influencer-finder.html" },
    { "source": "/pages/apps/influencer-profile.html", "destination": "/influencer-profile.html" },
    { "source": "/pages/calendar.html", "destination": "/calendar.html" },
    { "source": "/pages/chat.html", "destination": "/chat.html" },
    { "source": "/pages/inbox.html", "destination": "/inbox.html" },
    { "source": "/pages/users.html", "destination": "/users.html" },
    { "source": "/pages/timeline.html", "destination": "/timeline.html" },
    { "source": "/pages/settings.html", "destination": "/settings.html" },
    { "source": "/pages/auth/login.html", "destination": "/login.html" },
    { "source": "/pages/auth/signup.html", "destination": "/signup.html" },
    { "source": "/pages/auth/forgot-password.html", "destination": "/forgot-password.html" },
    { "source": "/pages/misc/blank-page.html", "destination": "/blank-page.html" },
    { "source": "/pages/misc/404.html", "destination": "/404.html" }
  ]
}
```

## Testing Your Deployment

After implementing one of these solutions, test your deployment:

1. Build the project: `npm run build`
2. Test locally: `npm run preview`
3. Deploy to your hosting service
4. Test all navigation links

## Recommended Approach

For production deployments, we recommend:

1. **For Netlify/Vercel**: Use their redirect configuration files
2. **For Traditional Hosting**: Use nginx/Apache rewrite rules
3. **For Quick Fix**: Update the navigation links in the source code

The server configuration approach is most maintainable as it doesn't require changing the source code and works with the existing build output.