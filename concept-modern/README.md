# Concept Modern - Bootstrap 5 Admin Dashboard

A modern, responsive admin dashboard template built with Bootstrap 5, featuring a clean design and comprehensive functionality for web applications.

## Overview

Concept Modern is a complete rewrite of the Concept Bootstrap 4 admin template, modernized with the latest web technologies and completely jQuery-free. This dashboard provides a solid foundation for building admin panels, analytics dashboards, and management systems.

## Features

### Core Technologies
- **Bootstrap 5.3.7** - Latest Bootstrap framework with modern components
- **Vite 7.0.6** - Next-generation frontend tooling with lightning-fast HMR support
- **Handlebars** - Template engine with reusable partials
- **SCSS** - Advanced styling with variables and mixins
- **ES6 Modules** - Modern JavaScript architecture
- **jQuery-free** - Pure vanilla JavaScript implementation

### Dashboard Pages
- **E-commerce Dashboard** - Main dashboard with revenue cards, charts, and recent orders
- **Finance Dashboard** - Financial metrics, transaction charts, and portfolio overview
- **Sales Dashboard** - Sales funnel, team performance, and revenue analytics
- **Influencer Dashboard** - Social media metrics, engagement tracking, and campaign performance

### UI Components
- **Cards** - Various card layouts with images, colors, borders, and lists
- **Typography** - Complete typography showcase with Bootstrap 5 utilities
- **Forms** - Form elements, validation, and multiselect components
- **Charts** - Chart.js integration with line, bar, pie, and doughnut charts
- **Tables** - Basic tables and DataTables integration with sorting/filtering

### Applications
- **Calendar** - Full-featured calendar with FullCalendar integration
- **User Management** - User list with DataTables, filters, and bulk actions
- **Timeline** - Activity feed with filters and real-time updates
- **Settings** - Comprehensive settings page with multiple sections

### Additional Pages
- **404 Error Page** - Modern error page with helpful navigation
- **Blank Page Template** - Starting point for custom pages

## Installation

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher

### Setup Instructions

1. Clone or download the repository:
```bash
git clone https://github.com/yourusername/concept-modern.git
cd concept-modern
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
concept-modern/
├── src/
│   ├── assets/          # Static assets (images, fonts)
│   ├── js/              # JavaScript modules
│   │   ├── components/  # Reusable components
│   │   └── pages/       # Page-specific scripts
│   ├── pages/           # HTML pages
│   │   ├── dashboards/  # Dashboard pages
│   │   ├── ui-elements/ # UI component pages
│   │   └── misc/        # Miscellaneous pages
│   ├── partials/        # Handlebars partials
│   │   └── layouts/     # Layout components
│   ├── scss/            # SCSS styles
│   │   ├── components/  # Component styles
│   │   ├── layouts/     # Layout styles
│   │   └── pages/       # Page-specific styles
│   └── index.html       # Main entry point
├── dist/                # Production build output
├── public/              # Public assets
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## Key Dependencies

### Core
- `bootstrap@5.3.7` - UI framework
- `@fortawesome/fontawesome-free@7.0.0` - Icon library
- `vite@7.0.6` - Build tool
- `sass@1.89.2` - CSS preprocessor

### JavaScript Libraries
- `chart.js@4.5.0` - Charts and graphs
- `datatables.net-bs5@2.2.3` - Advanced tables
- `@fullcalendar/core@6.1.15` - Calendar functionality
- `tom-select@2.4.1` - Enhanced select boxes

### Build Tools
- `vite-plugin-handlebars@2.0.0` - Handlebars support
- `@vitejs/plugin-legacy@7.1.0` - Legacy browser support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Chrome Mobile (latest)
- Safari Mobile (latest)

## Development Guidelines

### Adding a New Page

1. Create the HTML file in `src/pages/`
2. Add the page to `vite.config.js` in the `rollupOptions.input` section
3. Create corresponding JavaScript in `src/js/pages/`
4. Create SCSS file in `src/scss/pages/` and import in `main.scss`
5. Update sidebar navigation in `src/partials/layouts/sidebar.hbs`

### Component Structure

JavaScript modules follow this pattern:
```javascript
export function initializeComponent() {
    // Component logic
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponent);
} else {
    initializeComponent();
}
```

### SCSS Organization

- Use Bootstrap variables for consistency
- Follow BEM naming convention where applicable
- Keep component styles modular
- Use mixins for repeated patterns

## Performance Optimization

- Vite's code splitting for optimal loading
- Lazy loading for heavy components
- Optimized images and assets
- Minimal CSS with PurgeCSS in production
- ES6 modules for tree shaking

## Deployment

The production build can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Configure your server to serve `index.html` for all routes

### Recommended Hosting
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static file server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact support@yourcompany.com.

## Credits

- Original Concept template design
- Bootstrap team for the excellent framework
- All open-source library contributors