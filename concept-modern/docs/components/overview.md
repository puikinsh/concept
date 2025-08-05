# Components Overview

Concept includes a comprehensive set of reusable components built on Bootstrap 5. All components are jQuery-free and use modern JavaScript.

## Component Structure

Components follow a consistent pattern:

```javascript
// JavaScript initialization
import { ComponentName } from './components/component-name.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ComponentName.init();
});
```

## Available Components

### Core Components
- **[Buttons](buttons.md)** - Button styles, sizes, and states
- **[Cards](cards.md)** - Content containers with various layouts
- **[Forms](forms.md)** - Form controls and validation
- **[Tables](tables.md)** - Data tables with sorting and filtering

### Navigation
- **[Sidebar](../layout/sidebar.md)** - Collapsible navigation sidebar
- **[Header](../layout/header.md)** - Top navigation bar
- **[Breadcrumbs](#breadcrumbs)** - Page navigation trail

### Feedback
- **[Alerts](#alerts)** - Dismissible alert messages
- **[Modals](#modals)** - Dialog boxes
- **[Toasts](#toasts)** - Non-blocking notifications

### Data Display
- **[Charts](charts.md)** - Chart.js integration
- **[Progress](#progress)** - Progress bars and indicators
- **[Badges](#badges)** - Status indicators

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