# Components Overview

Concept is built with Bootstrap 5.3.7 and includes custom-styled components optimized for admin dashboards. The template uses modern ES6 modules and is completely jQuery-free.

## Concept Design System

### Core Values
- **Primary Color**: #5969ff (Royal Blue)
- **Body Background**: #efeff6
- **Body Text**: #3d405c
- **Card Border**: #e6e6f2
- **Base Font Size**: 0.875rem (14px)
- **Font Family**: 'Circular Std', -apple-system, BlinkMacSystemFont

### Component Architecture

All Concept components follow this structure:

```javascript
// ES6 module pattern used throughout Concept
import Chart from 'chart.js/auto';
import DataTable from 'datatables.net-bs5';

// Component initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
});
```

## Concept Components

Based on the SCSS imports and actual implementation:

### Styled Components
- **[Buttons](buttons.md)** - Custom button colors with forced white text
- **[Cards](cards.md)** - Dashboard cards with custom borders and shadows
- **[Forms](forms.md)** - Form controls with custom focus states
- **[Tables](tables.md)** - Bootstrap tables + DataTables integration
- **[Charts](charts.md)** - Chart.js with Concept color palette
- **Badges** - Status indicators with theme colors
- **Multiselect** - Tom Select integration for enhanced selects

### Layout Components
- **Sidebar** - Dark sidebar with #0e0c28 background
- **Header** - Top navigation with custom height
- **Page Headers** - Consistent page title structure
- **Breadcrumbs** - Navigation trail styling

### Page-Specific Components
- **Dashboard Metrics** - Finance/revenue cards with sparklines
- **Influencer Cards** - Social media metric displays
- **Product Cards** - E-commerce product displays
- **Timeline** - Activity feed components
- **Chat Interface** - Messaging UI components

## Quick Examples

### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h5 class="card-title">Card Title</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Card content goes here.</p>
  </div>
</div>
```

### Alert with Dismiss
```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Warning!</strong> This is a warning alert.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### Modal Trigger
```html
<!-- Button trigger -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Modal content
      </div>
    </div>
  </div>
</div>
```

## Component Initialization

### Auto-initialization
Most Bootstrap components initialize automatically with data attributes:

```html
<!-- Tooltip -->
<button type="button" data-bs-toggle="tooltip" title="Tooltip text">
  Hover me
</button>

<!-- Popover -->
<button type="button" data-bs-toggle="popover" data-bs-content="Popover content">
  Click me
</button>
```

### Manual Initialization
For dynamic content, initialize components manually:

```javascript
// Initialize all tooltips
const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltips.forEach(el => new bootstrap.Tooltip(el));

// Initialize specific modal
const modal = new bootstrap.Modal(document.getElementById('myModal'));
modal.show();
```

## Custom Components

### Creating Custom Components
```javascript
// components/custom-component.js
export class CustomComponent {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    // Component logic
  }
  
  static init(selector = '[data-custom-component]') {
    document.querySelectorAll(selector).forEach(el => {
      new CustomComponent(el);
    });
  }
}
```

## Component Guidelines

### Accessibility
- All interactive components must be keyboard accessible
- Use proper ARIA attributes
- Maintain focus management
- Provide screen reader support

### Performance
- Lazy load heavy components
- Use event delegation for dynamic content
- Minimize DOM manipulation
- Debounce/throttle expensive operations

### Mobile Support
- Ensure touch-friendly interactions
- Test on various screen sizes
- Consider mobile-specific behaviors
- Optimize for performance

## Next Steps

Explore specific component documentation:

1. **[Buttons](buttons.md)** - All button variants
2. **[Cards](cards.md)** - Card layouts and options
3. **[Forms](forms.md)** - Form building blocks
4. **[Tables](tables.md)** - Data presentation