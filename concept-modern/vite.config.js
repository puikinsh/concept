import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../public',
  
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      helpers: {
        json: (context) => JSON.stringify(context),
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
        lt: (a, b) => a < b,
        gt: (a, b) => a > b,
        lte: (a, b) => a <= b,
        gte: (a, b) => a >= b,
      },
      context: (pagePath) => {
        // Add global context data
        return {
          title: 'Concept Dashboard',
          version: '2.0.0',
          year: new Date().getFullYear(),
          isDev: process.env.NODE_ENV === 'development'
        };
      }
    }),
    legacy({
      targets: ['defaults', 'not dead']
    })
  ],

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // Dashboard pages
        'dashboard-finance': resolve(__dirname, 'src/pages/dashboards/finance.html'),
        'dashboard-sales': resolve(__dirname, 'src/pages/dashboards/sales.html'),
        'dashboard-influencer': resolve(__dirname, 'src/pages/dashboards/influencer.html'),
        // UI Elements
        'ui-cards': resolve(__dirname, 'src/pages/ui-elements/cards.html'),
        'ui-general': resolve(__dirname, 'src/pages/ui-elements/general.html'),
        'ui-typography': resolve(__dirname, 'src/pages/ui-elements/typography.html'),
        // Forms
        'form-elements': resolve(__dirname, 'src/pages/form-elements.html'),
        'form-validation': resolve(__dirname, 'src/pages/form-validation.html'),
        'multiselect': resolve(__dirname, 'src/pages/multiselect.html'),
        // Charts
        'charts': resolve(__dirname, 'src/pages/charts/index.html'),
        // Tables
        'general-tables': resolve(__dirname, 'src/pages/tables/general-tables.html'),
        'data-tables': resolve(__dirname, 'src/pages/tables/data-tables.html'),
        // E-Commerce
        'products': resolve(__dirname, 'src/pages/ecommerce/products.html'),
        'product-single': resolve(__dirname, 'src/pages/ecommerce/product-single.html'),
        'checkout': resolve(__dirname, 'src/pages/ecommerce/checkout.html'),
        // Apps
        'calendar': resolve(__dirname, 'src/pages/calendar.html'),
        'chat': resolve(__dirname, 'src/pages/chat.html'),
        'inbox': resolve(__dirname, 'src/pages/inbox.html'),
        'influencer-finder': resolve(__dirname, 'src/pages/apps/influencer-finder.html'),
        'influencer-profile': resolve(__dirname, 'src/pages/apps/influencer-profile.html'),
        // Settings
        'settings': resolve(__dirname, 'src/pages/settings.html'),
        // User Management
        'users': resolve(__dirname, 'src/pages/users.html'),
        'timeline': resolve(__dirname, 'src/pages/timeline.html'),
        // Auth Pages
        'login': resolve(__dirname, 'src/pages/auth/login.html'),
        'signup': resolve(__dirname, 'src/pages/auth/signup.html'),
        'forgot-password': resolve(__dirname, 'src/pages/auth/forgot-password.html'),
        // Misc Pages
        'blank-page': resolve(__dirname, 'src/pages/misc/blank-page.html'),
        '404': resolve(__dirname, 'src/pages/misc/404.html'),
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/scss/variables" as *;`
      }
    }
  },

  server: {
    port: 3000,
    hot: true,
    open: true
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@scss': resolve(__dirname, 'src/scss'),
      '@js': resolve(__dirname, 'src/js'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/js/components'),
      '@utils': resolve(__dirname, 'src/js/utils')
    }
  }
});