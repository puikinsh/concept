#!/usr/bin/env node

/**
 * Fix Navigation Links Script
 * Updates all navigation links to match Vite's build output
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define link mappings
const linkMappings = [
  // Dashboard pages
  { from: '/pages/dashboards/finance.html', to: '/dashboard-finance.html' },
  { from: '/pages/dashboards/sales.html', to: '/dashboard-sales.html' },
  { from: '/pages/dashboards/influencer.html', to: '/dashboard-influencer.html' },
  
  // UI Elements
  { from: '/pages/ui-elements/cards.html', to: '/ui-cards.html' },
  { from: '/pages/ui-elements/general.html', to: '/ui-general.html' },
  { from: '/pages/ui-elements/typography.html', to: '/ui-typography.html' },
  
  // Forms
  { from: '/pages/form-elements.html', to: '/form-elements.html' },
  { from: '/pages/form-validation.html', to: '/form-validation.html' },
  { from: '/pages/multiselect.html', to: '/multiselect.html' },
  
  // Charts
  { from: '/pages/charts/index.html', to: '/charts.html' },
  
  // Tables
  { from: '/pages/tables/general-tables.html', to: '/general-tables.html' },
  { from: '/pages/tables/data-tables.html', to: '/data-tables.html' },
  
  // E-commerce
  { from: '/pages/ecommerce/products.html', to: '/products.html' },
  { from: '/pages/ecommerce/product-single.html', to: '/product-single.html' },
  { from: '/pages/ecommerce/checkout.html', to: '/checkout.html' },
  
  // Apps
  { from: '/pages/apps/influencer-finder.html', to: '/influencer-finder.html' },
  { from: '/pages/apps/influencer-profile.html', to: '/influencer-profile.html' },
  
  // Other pages
  { from: '/pages/calendar.html', to: '/calendar.html' },
  { from: '/pages/chat.html', to: '/chat.html' },
  { from: '/pages/inbox.html', to: '/inbox.html' },
  { from: '/pages/users.html', to: '/users.html' },
  { from: '/pages/timeline.html', to: '/timeline.html' },
  { from: '/pages/settings.html', to: '/settings.html' },
  
  // Auth pages
  { from: '/pages/auth/login.html', to: '/login.html' },
  { from: '/pages/auth/signup.html', to: '/signup.html' },
  { from: '/pages/auth/forgot-password.html', to: '/forgot-password.html' },
  
  // Misc pages
  { from: '/pages/misc/blank-page.html', to: '/blank-page.html' },
  { from: '/pages/misc/404.html', to: '/404.html' },
];

// Files to update
const filesToUpdate = [
  'src/partials/layouts/sidebar.hbs',
  'src/partials/layouts/header.hbs',
  'src/index.html',
  // Add any other files that contain navigation links
];

// Add all HTML files in pages directory
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.name.endsWith('.html') || item.name.endsWith('.hbs')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Add all HTML files from src/pages
const pagesDir = path.join(__dirname, '..', 'src', 'pages');
if (fs.existsSync(pagesDir)) {
  filesToUpdate.push(...findHtmlFiles(pagesDir).map(f => path.relative(path.join(__dirname, '..'), f)));
}

// Update links in files
function updateLinks(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let updated = false;
  
  linkMappings.forEach(({ from, to }) => {
    const regex = new RegExp(`href=["']${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `href="${to}"`);
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed: ${filePath}`);
  }
}

// Main execution
console.log('🔧 Fixing navigation links to match Vite build output...\n');

filesToUpdate.forEach(file => {
  updateLinks(file);
});

console.log('\n✨ Navigation links have been updated!');
console.log('\nNext steps:');
console.log('1. Run "npm run build" to build the project');
console.log('2. Run "npm run preview" to test locally');
console.log('3. Deploy the dist folder to your hosting service');