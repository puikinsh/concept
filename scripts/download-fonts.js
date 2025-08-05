#!/usr/bin/env node

// Script to download and self-host Google Fonts
// This improves performance and privacy

import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
const FONTS_DIR = join(__dirname, '..', 'src', 'assets', 'fonts', 'inter');

async function downloadFont() {
  console.log('Downloading Inter font family...');
  
  try {
    // Create fonts directory
    await mkdir(FONTS_DIR, { recursive: true });
    
    // Fetch the CSS
    const response = await fetch(FONT_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    let css = await response.text();
    
    // Extract font URLs
    const fontUrls = css.match(/url\((https:\/\/[^)]+)\)/g);
    
    if (!fontUrls) {
      console.error('No font URLs found in CSS');
      return;
    }
    
    // Download each font file
    for (const urlMatch of fontUrls) {
      const url = urlMatch.match(/url\((https:\/\/[^)]+)\)/)[1];
      const filename = url.split('/').pop().split('?')[0];
      
      console.log(`Downloading ${filename}...`);
      
      const fontResponse = await fetch(url);
      const fontBuffer = await fontResponse.arrayBuffer();
      
      await writeFile(
        join(FONTS_DIR, filename),
        Buffer.from(fontBuffer)
      );
      
      // Update CSS to use local path
      css = css.replace(url, `/assets/fonts/inter/${filename}`);
    }
    
    // Save the updated CSS
    const cssPath = join(__dirname, '..', 'src', 'scss', '_fonts.scss');
    await writeFile(cssPath, css);
    
    console.log('✅ Fonts downloaded successfully!');
    console.log(`📁 Font files saved to: ${FONTS_DIR}`);
    console.log(`📄 CSS saved to: ${cssPath}`);
    console.log('\nUpdate your main.scss to import _fonts.scss instead of the Google Fonts URL');
    
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
}

downloadFont();