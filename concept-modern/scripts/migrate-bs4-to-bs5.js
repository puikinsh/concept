#!/usr/bin/env node

/**
 * Bootstrap 4 to Bootstrap 5 Migration Helper
 * This script helps convert Bootstrap 4 HTML to Bootstrap 5
 */

import fs from 'fs';
import path from 'path';

const MIGRATIONS = {
  // Data attributes
  attributes: [
    { from: /data-toggle=/g, to: 'data-bs-toggle=' },
    { from: /data-target=/g, to: 'data-bs-target=' },
    { from: /data-dismiss=/g, to: 'data-bs-dismiss=' },
    { from: /data-placement=/g, to: 'data-bs-placement=' },
    { from: /data-content=/g, to: 'data-bs-content=' },
    { from: /data-trigger=/g, to: 'data-bs-trigger=' },
    { from: /data-offset=/g, to: 'data-bs-offset=' },
    { from: /data-spy=/g, to: 'data-bs-spy=' },
    { from: /data-ride=/g, to: 'data-bs-ride=' },
    { from: /data-slide=/g, to: 'data-bs-slide=' },
    { from: /data-slide-to=/g, to: 'data-bs-slide-to=' },
    { from: /data-parent=/g, to: 'data-bs-parent=' },
  ],
  
  // Classes
  classes: [
    // Grid
    { from: /\bno-gutters\b/g, to: 'g-0' },
    
    // Utilities
    { from: /\btext-left\b/g, to: 'text-start' },
    { from: /\btext-right\b/g, to: 'text-end' },
    { from: /\bfloat-left\b/g, to: 'float-start' },
    { from: /\bfloat-right\b/g, to: 'float-end' },
    { from: /\bborder-left\b/g, to: 'border-start' },
    { from: /\bborder-right\b/g, to: 'border-end' },
    { from: /\brounded-left\b/g, to: 'rounded-start' },
    { from: /\brounded-right\b/g, to: 'rounded-end' },
    { from: /\bml-(\d+)\b/g, to: 'ms-$1' },
    { from: /\bmr-(\d+)\b/g, to: 'me-$1' },
    { from: /\bpl-(\d+)\b/g, to: 'ps-$1' },
    { from: /\bpr-(\d+)\b/g, to: 'pe-$1' },
    
    // Forms
    { from: /\bform-group\b/g, to: 'mb-3' },
    { from: /\bform-row\b/g, to: 'row' },
    { from: /\bform-inline\b/g, to: 'd-flex align-items-center' },
    { from: /\bcustom-control\b/g, to: 'form-check' },
    { from: /\bcustom-control-input\b/g, to: 'form-check-input' },
    { from: /\bcustom-control-label\b/g, to: 'form-check-label' },
    { from: /\bcustom-select\b/g, to: 'form-select' },
    { from: /\bcustom-file\b/g, to: 'form-control' },
    { from: /\bcustom-range\b/g, to: 'form-range' },
    { from: /\bform-control-file\b/g, to: 'form-control' },
    
    // Input groups
    { from: /\binput-group-append\b/g, to: 'input-group-text' },
    { from: /\binput-group-prepend\b/g, to: 'input-group-text' },
    
    // Dropdowns
    { from: /\bdropdown-menu-right\b/g, to: 'dropdown-menu-end' },
    { from: /\bdropdown-menu-left\b/g, to: 'dropdown-menu-start' },
    { from: /\bdropleft\b/g, to: 'dropstart' },
    { from: /\bdropright\b/g, to: 'dropend' },
    
    // Badges
    { from: /\bbadge-pill\b/g, to: 'rounded-pill' },
    { from: /\bbadge-(\w+)\b/g, to: 'bg-$1' },
    
    // Close button
    { from: /\bclose\b/g, to: 'btn-close' },
    
    // Utilities
    { from: /\bfont-weight-bold\b/g, to: 'fw-bold' },
    { from: /\bfont-weight-normal\b/g, to: 'fw-normal' },
    { from: /\bfont-weight-light\b/g, to: 'fw-light' },
    { from: /\bfont-italic\b/g, to: 'fst-italic' },
    
    // Screen readers
    { from: /\bsr-only\b/g, to: 'visually-hidden' },
    { from: /\bsr-only-focusable\b/g, to: 'visually-hidden-focusable' },
    
    // Embed
    { from: /\bembed-responsive\b/g, to: 'ratio' },
    { from: /\bembed-responsive-16by9\b/g, to: 'ratio-16x9' },
    { from: /\bembed-responsive-4by3\b/g, to: 'ratio-4x3' },
    { from: /\bembed-responsive-1by1\b/g, to: 'ratio-1x1' },
    
    // Jumbotron (removed in BS5)
    { from: /\bjumbotron\b/g, to: 'bg-light p-5 rounded-3' },
    
    // Media object (removed in BS5)
    { from: /\bmedia\b/g, to: 'd-flex' },
    { from: /\bmedia-body\b/g, to: 'flex-grow-1 ms-3' },
  ],
  
  // JavaScript changes
  javascript: [
    // jQuery to vanilla JS
    { from: /\$\(document\)\.ready\(function\(\)/g, to: 'document.addEventListener(\'DOMContentLoaded\', function()' },
    { from: /\$\('([^']+)'\)\.tooltip\(\)/g, to: 'new bootstrap.Tooltip(document.querySelector(\'$1\'))' },
    { from: /\$\('([^']+)'\)\.popover\(\)/g, to: 'new bootstrap.Popover(document.querySelector(\'$1\'))' },
    { from: /\$\('([^']+)'\)\.modal\('show'\)/g, to: 'new bootstrap.Modal(document.querySelector(\'$1\')).show()' },
    { from: /\$\('([^']+)'\)\.modal\('hide'\)/g, to: 'bootstrap.Modal.getInstance(document.querySelector(\'$1\')).hide()' },
    { from: /\$\('([^']+)'\)\.collapse\('toggle'\)/g, to: 'new bootstrap.Collapse(document.querySelector(\'$1\'), {toggle: true})' },
  ]
};

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let changesMade = [];
  
  // Apply attribute migrations
  MIGRATIONS.attributes.forEach(migration => {
    const matches = content.match(migration.from);
    if (matches) {
      content = content.replace(migration.from, migration.to);
      changesMade.push(`✓ Replaced ${matches.length} instances of ${migration.from.source}`);
    }
  });
  
  // Apply class migrations
  MIGRATIONS.classes.forEach(migration => {
    const matches = content.match(migration.from);
    if (matches) {
      content = content.replace(migration.from, migration.to);
      changesMade.push(`✓ Replaced ${matches.length} instances of ${migration.from.source}`);
    }
  });
  
  // Apply JavaScript migrations if it's a JS file
  if (filePath.endsWith('.js') || filePath.endsWith('.html')) {
    MIGRATIONS.javascript.forEach(migration => {
      const matches = content.match(migration.from);
      if (matches) {
        content = content.replace(migration.from, migration.to);
        changesMade.push(`✓ Replaced ${matches.length} instances of ${migration.from.source}`);
      }
    });
  }
  
  // Additional manual checks
  const warnings = [];
  
  if (content.includes('jquery')) {
    warnings.push('⚠️  File still contains jQuery references - manual migration needed');
  }
  
  if (content.includes('.card-deck')) {
    warnings.push('⚠️  Card decks removed in BS5 - use grid system instead');
  }
  
  if (content.includes('.form-group')) {
    warnings.push('⚠️  Some form-group classes may need manual adjustment');
  }
  
  if (content.includes('data-toggle') && !content.includes('data-bs-toggle')) {
    warnings.push('⚠️  Some data-toggle attributes may have been missed');
  }
  
  return {
    filePath,
    modified: content !== originalContent,
    content,
    changesMade,
    warnings
  };
}

function migrateDirectory(dirPath, options = {}) {
  const results = [];
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results.push(...migrateDirectory(fullPath, options));
    } else if (stat.isFile() && (file.endsWith('.html') || file.endsWith('.js'))) {
      const result = migrateFile(fullPath);
      
      if (result.modified && !options.dryRun) {
        fs.writeFileSync(fullPath, result.content);
      }
      
      results.push(result);
    }
  });
  
  return results;
}

// CLI usage
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const args = process.argv.slice(2);
  const targetPath = args[0] || '.';
  const dryRun = args.includes('--dry-run');
  
  console.log('🚀 Bootstrap 4 to 5 Migration Tool');
  console.log('==================================');
  console.log(`Target: ${path.resolve(targetPath)}`);
  console.log(`Mode: ${dryRun ? 'Dry run' : 'Live migration'}`);
  console.log('');
  
  const results = fs.statSync(targetPath).isDirectory() 
    ? migrateDirectory(targetPath, { dryRun })
    : [migrateFile(targetPath)];
  
  results.forEach(result => {
    if (result.modified || result.warnings.length > 0) {
      console.log(`\n📄 ${result.filePath}`);
      
      if (result.changesMade.length > 0) {
        console.log('\nChanges made:');
        result.changesMade.forEach(change => console.log(`  ${change}`));
      }
      
      if (result.warnings.length > 0) {
        console.log('\nWarnings:');
        result.warnings.forEach(warning => console.log(`  ${warning}`));
      }
    }
  });
  
  const modifiedCount = results.filter(r => r.modified).length;
  const warningCount = results.filter(r => r.warnings.length > 0).length;
  
  console.log('\n==================================');
  console.log(`✅ Processed ${results.length} files`);
  console.log(`📝 Modified ${modifiedCount} files`);
  console.log(`⚠️  ${warningCount} files need manual review`);
  
  if (dryRun) {
    console.log('\n💡 This was a dry run. Use without --dry-run to apply changes.');
  }
}

export { migrateFile, migrateDirectory, MIGRATIONS };