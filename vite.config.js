import { defineConfig } from 'vite';
import { resolve } from 'path';

// Vite 8 resolves configs natively, where rootDir is unavailable.
const rootDir = import.meta.dirname;
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../public',

  plugins: [
    handlebars({
      partialDirectory: resolve(rootDir, 'src/partials'),
      helpers: {
        json: (context) => JSON.stringify(context),
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
        lt: (a, b) => a < b,
        gt: (a, b) => a > b,
        lte: (a, b) => a <= b,
        gte: (a, b) => a >= b
      },
      context: (pagePath) => {
        return {
          title: 'Concept Dashboard',
          version: '3.1.0',
          year: new Date().getFullYear(),
          isDev: process.env.NODE_ENV === 'development'
        };
      }
    })
  ],

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'src/index.html'),
        // Dashboard pages
        'dashboard-finance': resolve(rootDir, 'src/pages/dashboards/finance.html'),
        'dashboard-sales': resolve(rootDir, 'src/pages/dashboards/sales.html'),
        'dashboard-influencer': resolve(rootDir, 'src/pages/dashboards/influencer.html'),
        // UI Elements
        'ui-cards': resolve(rootDir, 'src/pages/ui-elements/cards.html'),
        'ui-general': resolve(rootDir, 'src/pages/ui-elements/general.html'),
        'ui-typography': resolve(rootDir, 'src/pages/ui-elements/typography.html'),
        // Forms
        'form-elements': resolve(rootDir, 'src/pages/form-elements.html'),
        'form-validation': resolve(rootDir, 'src/pages/form-validation.html'),
        multiselect: resolve(rootDir, 'src/pages/multiselect.html'),
        // Charts
        charts: resolve(rootDir, 'src/pages/charts/index.html'),
        // Tables
        'general-tables': resolve(rootDir, 'src/pages/tables/general-tables.html'),
        'data-tables': resolve(rootDir, 'src/pages/tables/data-tables.html'),
        // E-Commerce
        products: resolve(rootDir, 'src/pages/ecommerce/products.html'),
        'product-single': resolve(rootDir, 'src/pages/ecommerce/product-single.html'),
        checkout: resolve(rootDir, 'src/pages/ecommerce/checkout.html'),
        // Apps
        calendar: resolve(rootDir, 'src/pages/calendar.html'),
        chat: resolve(rootDir, 'src/pages/chat.html'),
        inbox: resolve(rootDir, 'src/pages/email/inbox.html'),
        compose: resolve(rootDir, 'src/pages/email/compose.html'),
        'email-details': resolve(rootDir, 'src/pages/email/details.html'),
        'influencer-finder': resolve(rootDir, 'src/pages/apps/influencer-finder.html'),
        'influencer-profile': resolve(rootDir, 'src/pages/apps/influencer-profile.html'),
        // Settings
        settings: resolve(rootDir, 'src/pages/settings.html'),
        // User Management
        users: resolve(rootDir, 'src/pages/users.html'),
        timeline: resolve(rootDir, 'src/pages/timeline.html'),
        // Auth Pages
        login: resolve(rootDir, 'src/pages/auth/login.html'),
        signup: resolve(rootDir, 'src/pages/auth/signup.html'),
        'forgot-password': resolve(rootDir, 'src/pages/auth/forgot-password.html'),
        // Misc Pages
        'blank-page': resolve(rootDir, 'src/pages/misc/blank-page.html'),
        404: resolve(rootDir, 'src/pages/misc/404.html')
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
    sourcemap: false
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/scss/variables" as *;`,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function']
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
      '@': resolve(rootDir, 'src'),
      '@scss': resolve(rootDir, 'src/scss'),
      '@js': resolve(rootDir, 'src/js'),
      '@assets': resolve(rootDir, 'src/assets'),
      '@components': resolve(rootDir, 'src/js/components'),
      '@utils': resolve(rootDir, 'src/js/utils')
    }
  }
});
