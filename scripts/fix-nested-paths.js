import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update paths in a file based on its depth
function updatePathsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Calculate the depth of the file relative to dist
  const relativePath = path.relative('dist', filePath);
  const depth = relativePath.split(path.sep).length - 1;
  
  // Create the prefix based on depth
  const prefix = '../'.repeat(depth);
  
  let updatedContent = content;
  
  // Update all .html links
  updatedContent = updatedContent.replace(/href="([^"]+\.html)"/g, (match, p1) => {
    // Skip if already has ../ or is an absolute URL or anchor
    if (p1.startsWith('../') || p1.startsWith('http') || p1.startsWith('#')) {
      return match;
    }
    return `href="${prefix}${p1}"`;
  });
  
  // Update asset paths
  updatedContent = updatedContent.replace(/href="(assets\/[^"]+)"/g, (match, p1) => {
    if (p1.startsWith('../') || p1.startsWith('http')) {
      return match;
    }
    return `href="${prefix}${p1}"`;
  });
  
  updatedContent = updatedContent.replace(/src="(assets\/[^"]+)"/g, (match, p1) => {
    if (p1.startsWith('../') || p1.startsWith('http')) {
      return match;
    }
    return `src="${prefix}${p1}"`;
  });
  
  // Only write if content changed
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated paths in: ${filePath}`);
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
    } else if (item.endsWith('.html') && fullPath !== path.join('dist', 'index.html')) {
      // Skip index.html as it's in the root
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
console.log('Fixing paths for nested HTML files...\n');

const htmlFiles = findHtmlFiles('dist');
console.log(`Found ${htmlFiles.length} HTML files to process\n`);

htmlFiles.forEach(file => {
  updatePathsInFile(file);
});

console.log('\nPath fixing complete!');