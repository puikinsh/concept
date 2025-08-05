import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of sidebar links to actual file locations
const linkMappings = {
  'dashboard-finance.html': 'pages/dashboards/finance.html',
  'dashboard-sales.html': 'pages/dashboards/sales.html',
  'dashboard-influencer.html': 'pages/dashboards/influencer.html',
  'ui-cards.html': 'pages/ui-elements/cards.html',
  'ui-general.html': 'pages/ui-elements/general.html',
  'ui-typography.html': 'pages/ui-elements/typography.html',
  'general-tables.html': 'pages/tables/general-tables.html',
  'data-tables.html': 'pages/tables/data-tables.html',
  'products.html': 'pages/ecommerce/products.html',
  'product-single.html': 'pages/ecommerce/product-single.html',
  'checkout.html': 'pages/ecommerce/checkout.html',
  'blank-page.html': 'pages/misc/blank-page.html',
  'login.html': 'pages/auth/login.html',
  'signup.html': 'pages/auth/signup.html',
  'forgot-password.html': 'pages/auth/forgot-password.html',
  '404.html': 'pages/misc/404.html',
  'calendar.html': 'pages/calendar.html',
  'chat.html': 'pages/chat.html',
  'inbox.html': 'pages/email/inbox.html',
  'influencer-finder.html': 'pages/apps/influencer-finder.html',
  'influencer-profile.html': 'pages/apps/influencer-profile.html',
  'users.html': 'pages/users.html',
  'timeline.html': 'pages/timeline.html',
  'settings.html': 'pages/settings.html',
  'form-elements.html': 'pages/form-elements.html',
  'form-validation.html': 'pages/form-validation.html',
  'multiselect.html': 'pages/multiselect.html',
  'charts.html': 'pages/charts/index.html'
};

// Function to update paths in a file
function updatePathsInFile(filePath, rootDir) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileRelativeToRoot = path.relative(rootDir, filePath);
  const fileDepth = fileRelativeToRoot.split(path.sep).length - 1;
  
  let updatedContent = content;
  
  // Update all .html links
  updatedContent = updatedContent.replace(/href="([^"]+\.html)"/g, (match, p1) => {
    // Skip if already has ../ or is an absolute URL or anchor
    if (p1.startsWith('../') || p1.startsWith('http') || p1.startsWith('#') || p1.startsWith('/')) {
      return match;
    }
    
    // Check if this link needs mapping
    const mappedPath = linkMappings[p1] || p1;
    
    // For nested files, calculate the correct relative path
    if (fileDepth > 0) {
      const fromDir = path.dirname(fileRelativeToRoot);
      const toPath = mappedPath === 'index.html' ? 'index.html' : mappedPath;
      const relativePath = path.relative(fromDir, toPath).replace(/\\/g, '/');
      return `href="${relativePath}"`;
    }
    
    // For root files, use the mapped path directly
    return `href="${mappedPath}"`;
  });
  
  // Update asset paths
  updatedContent = updatedContent.replace(/(?:href|src)="(assets\/[^"]+)"/g, (match, p1) => {
    if (p1.startsWith('../') || p1.startsWith('http')) {
      return match;
    }
    const prefix = fileDepth > 0 ? '../'.repeat(fileDepth) : '';
    return match.replace(p1, prefix + p1);
  });
  
  // Update special paths like /pages/email/compose.html
  updatedContent = updatedContent.replace(/href="\/pages\/([^"]+)"/g, (match, p1) => {
    const prefix = fileDepth > 0 ? '../'.repeat(fileDepth) : '';
    return `href="${prefix}pages/${p1}"`;
  });
  
  // Only write if content changed
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated paths in: ${path.relative(rootDir, filePath)}`);
  }
}

// Function to recursively find all HTML files
function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
const distDir = path.resolve(__dirname, '../dist');
console.log('Fixing paths for universal deployment...\n');

const htmlFiles = findHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files to process\n`);

htmlFiles.forEach(file => {
  updatePathsInFile(file, distDir);
});

console.log('\nPath fixing complete! The project can now be deployed to any subfolder.');