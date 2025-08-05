#!/usr/bin/env node

/**
 * Make All Paths Relative Script
 * Converts all absolute paths to relative paths for subfolder deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to update
const filesToUpdate = [
  'src/partials/layouts/sidebar.hbs',
  'src/partials/layouts/header.hbs',
  'src/index.html',
];

// Add all HTML files
function findFiles(dir, extension) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findFiles(fullPath, extension));
    } else if (item.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Add all HTML and HBS files
const srcDir = path.join(__dirname, '..', 'src');
filesToUpdate.push(...findFiles(path.join(srcDir, 'pages'), '.html'));
filesToUpdate.push(...findFiles(path.join(srcDir, 'pages'), '.hbs'));
filesToUpdate.push(...findFiles(path.join(srcDir, 'partials'), '.hbs'));

// Patterns to replace
const replacements = [
  // Navigation links
  { from: /href="\/dashboard-/g, to: 'href="dashboard-' },
  { from: /href="\/ui-/g, to: 'href="ui-' },
  { from: /href="\/form-/g, to: 'href="form-' },
  { from: /href="\/charts\.html"/g, to: 'href="charts.html"' },
  { from: /href="\/general-/g, to: 'href="general-' },
  { from: /href="\/data-/g, to: 'href="data-' },
  { from: /href="\/products\.html"/g, to: 'href="products.html"' },
  { from: /href="\/product-/g, to: 'href="product-' },
  { from: /href="\/checkout\.html"/g, to: 'href="checkout.html"' },
  { from: /href="\/influencer-/g, to: 'href="influencer-' },
  { from: /href="\/calendar\.html"/g, to: 'href="calendar.html"' },
  { from: /href="\/chat\.html"/g, to: 'href="chat.html"' },
  { from: /href="\/inbox\.html"/g, to: 'href="inbox.html"' },
  { from: /href="\/users\.html"/g, to: 'href="users.html"' },
  { from: /href="\/timeline\.html"/g, to: 'href="timeline.html"' },
  { from: /href="\/settings\.html"/g, to: 'href="settings.html"' },
  { from: /href="\/login\.html"/g, to: 'href="login.html"' },
  { from: /href="\/signup\.html"/g, to: 'href="signup.html"' },
  { from: /href="\/forgot-/g, to: 'href="forgot-' },
  { from: /href="\/blank-/g, to: 'href="blank-' },
  { from: /href="\/404\.html"/g, to: 'href="404.html"' },
  { from: /href="\/multiselect\.html"/g, to: 'href="multiselect.html"' },
  
  // Root link
  { from: /href="\/"/g, to: 'href="index.html"' },
  
  // Asset paths - these should remain absolute or use base URL
  { from: /src="\/assets\//g, to: 'src="assets/' },
  { from: /href="\/assets\//g, to: 'href="assets/' },
  
  // Form actions
  { from: /action="\/api\//g, to: 'action="api/' },
];

// Update files
function updateFile(filePath) {
  const fullPath = filePath.startsWith('/') ? filePath : path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let updated = false;
  
  replacements.forEach(({ from, to }) => {
    if (content.match(from)) {
      content = content.replace(from, to);
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated: ${path.relative(process.cwd(), fullPath)}`);
  } else {
    console.log(`⏭️  No changes needed: ${path.relative(process.cwd(), fullPath)}`);
  }
}

// Main execution
console.log('🔧 Converting absolute paths to relative paths...\n');

filesToUpdate.forEach(file => {
  updateFile(file);
});

console.log('\n✨ All paths have been made relative!');
console.log('\nNext steps:');
console.log('1. Build with subfolder support:');
console.log('   BASE_URL=/polygon/concept/ npm run build');
console.log('   or for relative paths everywhere:');
console.log('   npm run build');
console.log('2. Deploy the dist folder to your subfolder');