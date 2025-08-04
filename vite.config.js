import { defineConfig } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  root: '.',
  base: './',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~fontawesome': resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        general: resolve(__dirname, 'pages/general.html'),
        // Add more pages as needed
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
});