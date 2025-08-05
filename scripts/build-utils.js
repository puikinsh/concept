#!/usr/bin/env node

import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, '..', 'src');

// Find all HTML files in the src directory
async function findHtmlFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and build directories
      if (!['node_modules', 'dist', '.git', 'partials'].includes(entry.name)) {
        await findHtmlFiles(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Generate Vite input configuration
export async function generateViteInputs() {
  const htmlFiles = await findHtmlFiles(srcDir);
  const inputs = {};
  
  for (const file of htmlFiles) {
    const relativePath = relative(srcDir, file);
    const key = relativePath
      .replace(/\\/g, '/')
      .replace(/\.html$/, '')
      .replace(/\//g, '-')
      .replace(/^pages-/, '')
      .replace(/index$/, 'main');
    
    inputs[key] = file;
  }
  
  return inputs;
}

// Check for missing files in Vite config
export async function checkMissingFiles(currentInputs) {
  const allInputs = await generateViteInputs();
  const missing = [];
  
  for (const [key, path] of Object.entries(allInputs)) {
    if (!Object.values(currentInputs).some(p => p.includes(key))) {
      missing.push({ key, path });
    }
  }
  
  return missing;
}

// CLI usage
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Scanning for HTML files...\n');
  
  const inputs = await generateViteInputs();
  console.log('Found HTML files:');
  console.log('=================');
  
  for (const [key, path] of Object.entries(inputs)) {
    console.log(`'${key}': resolve(__dirname, '${relative(join(__dirname, '..'), path).replace(/\\/g, '/')}'),`);
  }
  
  console.log('\nAdd the above entries to your vite.config.js rollupOptions.input');
}