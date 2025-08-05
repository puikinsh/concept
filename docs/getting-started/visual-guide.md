# Visual Installation Guide

This guide provides a visual walkthrough of installing and setting up Concept.

## Dashboard Preview

![Concept Dashboard](../../concept-bootstrap-5-admin-dashboard.png)

## Installation Steps

### Step 1: Download or Clone

```bash
# Clone via Git
git clone https://github.com/yourusername/concept.git

# Or download and extract the ZIP file
```

### Step 2: Project Structure

After extraction, you'll see this structure:
```
concept/
├── src/              # Source files
├── docs/             # Documentation
├── scripts/          # Utility scripts
├── package.json      # Dependencies
└── vite.config.js    # Build configuration
```

### Step 3: Install Dependencies

Open terminal in the project directory:
```bash
npm install
```

This installs all required packages including:
- Bootstrap 5.3.7
- Chart.js 4.5.0
- DataTables
- Font Awesome 7
- And more...

### Step 4: Start Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:3000`

## First Look

When you first open Concept, you'll see:

### 1. Main Dashboard
The default landing page showing:
- Revenue metrics with trend indicators
- Interactive charts
- Recent activity feed
- Quick stats cards

### 2. Navigation Structure

**Sidebar Navigation** includes:
- **Dashboards** - Multiple dashboard variants
- **UI Elements** - Component examples
- **Forms** - Form controls and validation
- **Tables** - Data presentation options
- **E-commerce** - Shop management pages
- **Apps** - Calendar, chat, and more

### 3. Key Features

**Responsive Design**
- Desktop: Full sidebar + multi-column layout
- Tablet: Collapsible sidebar + 2-column layout  
- Mobile: Hamburger menu + single column

**Dark Sidebar**
The sidebar features a dark theme (#0e0c28) with:
- Hover effects
- Active state indicators
- Collapsible sub-menus

## Customization Quick Start

### Change Primary Color

Edit `src/scss/_variables.scss`:
```scss
$primary: #5969ff;  // Change this to your color
```

### Update Logo

Replace the logo in the header:
1. Add your logo to `src/assets/images/`
2. Update `src/partials/layouts/header.hbs`

### Modify Sidebar

Edit `src/partials/layouts/sidebar.hbs` to:
- Add new menu items
- Rearrange navigation
- Change icons

## Building for Production

### Build Command
```bash
npm run build
```

This creates an optimized `dist/` folder with:
- Minified CSS and JavaScript
- Optimized images
- Hashed filenames for caching
- Source maps for debugging

### Production Files
```
dist/
├── assets/
│   ├── css/         # Compiled styles
│   ├── js/          # Compiled scripts
│   └── images/      # Optimized images
├── index.html       # Main entry
├── dashboard-finance.html
├── dashboard-sales.html
└── [other pages].html
```

## Common Customizations

### 1. Dashboard Widgets

Add a new metric card:
```html
<div class="card">
  <div class="card-body">
    <h6 class="text-muted mb-2">New Metric</h6>
    <h3 class="mb-0">1,234</h3>
    <small class="text-success">
      <i class="fa-solid fa-arrow-up"></i> 5.2%
    </small>
  </div>
</div>
```

### 2. Chart Colors

Modify chart colors in your JavaScript:
```javascript
const chartColors = {
  primary: '#5969ff',
  success: '#28a745',
  danger: '#dc3545'
};
```

### 3. Form Styling

Concept's forms use custom variables:
- Border: `#d4d9e3`
- Focus: `#5969ff`
- Shadow: `rgba(89, 105, 255, 0.25)`

## Troubleshooting Visual Guide

### Issue: Pages showing 404

**Solution**: Run the fix script
```bash
node scripts/fix-navigation-links.js
npm run build
```

### Issue: Styles not loading

**Check**:
1. Dev server is running
2. No SCSS compilation errors
3. Browser cache is cleared

### Issue: Charts not displaying

**Verify**:
1. Chart.js is imported
2. Canvas element exists
3. Data is properly formatted

## Mobile Experience

Concept is fully responsive:

### Mobile Navigation
- Hamburger menu toggle
- Full-screen overlay menu
- Touch-friendly controls

### Mobile Tables
- Horizontal scrolling
- Stacked view option
- Simplified controls

### Mobile Charts
- Touch gestures supported
- Simplified legends
- Responsive sizing

## Next Steps

1. **Explore Components** - Check `/pages/ui-elements/` for examples
2. **Try Dashboards** - Test different dashboard variants
3. **Customize Theme** - Modify colors and fonts
4. **Add Features** - Integrate with your backend

## Support Resources

- **Documentation**: `/docs` folder
- **Component Examples**: UI Elements pages
- **Sample Data**: Included in all pages
- **Scripts**: Utility scripts in `/scripts`

Start building your admin panel with Concept!