# Buttons

Buttons are essential interactive elements. Concept extends Bootstrap's button styles with additional variants and states.

## Basic Usage

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
```

## Button Sizes

```html
<button class="btn btn-primary btn-lg">Large button</button>
<button class="btn btn-primary">Default button</button>
<button class="btn btn-primary btn-sm">Small button</button>
```

## Button Variants

### Outline Buttons
```html
<button class="btn btn-outline-primary">Primary</button>
<button class="btn btn-outline-secondary">Secondary</button>
<button class="btn btn-outline-success">Success</button>
```

### Rounded Buttons
```html
<button class="btn btn-primary rounded-pill">Pill Button</button>
<button class="btn btn-primary rounded-0">Square Button</button>
```

### Icon Buttons
```html
<!-- Icon only -->
<button class="btn btn-primary btn-icon">
  <i class="fa-solid fa-plus"></i>
</button>

<!-- Icon with text -->
<button class="btn btn-primary">
  <i class="fa-solid fa-download me-2"></i>
  Download
</button>
```

## Button States

### Disabled State
```html
<button class="btn btn-primary" disabled>Disabled button</button>
<a class="btn btn-primary disabled" role="button" aria-disabled="true">Disabled link</a>
```

### Loading State
```html
<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Loading...
</button>
```

### Toggle State
```html
<button type="button" class="btn btn-primary" data-bs-toggle="button">
  Toggle button
</button>
```

## Button Groups

### Basic Group
```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
```

### Vertical Group
```html
<div class="btn-group-vertical" role="group">
  <button type="button" class="btn btn-primary">Top</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Bottom</button>
</div>
```

### Button Toolbar
```html
<div class="btn-toolbar" role="toolbar">
  <div class="btn-group me-2" role="group">
    <button type="button" class="btn btn-primary">1</button>
    <button type="button" class="btn btn-primary">2</button>
  </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-secondary">A</button>
    <button type="button" class="btn btn-secondary">B</button>
  </div>
</div>
```

## Custom Button Styles

### Gradient Buttons
```scss
.btn-gradient-primary {
  background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%);
  border: none;
  color: $white;
  
  &:hover {
    background: linear-gradient(135deg, darken($primary, 5%) 0%, darken($primary, 15%) 100%);
  }
}
```

### Social Media Buttons
```html
<button class="btn btn-facebook">
  <i class="fa-brands fa-facebook-f me-2"></i>
  Facebook
</button>

<button class="btn btn-twitter">
  <i class="fa-brands fa-x-twitter me-2"></i>
  Twitter
</button>
```

## JavaScript Usage

### Dynamic Button Creation
```javascript
// Create button element
const button = document.createElement('button');
button.className = 'btn btn-primary';
button.textContent = 'Dynamic Button';

// Add click handler
button.addEventListener('click', () => {
  console.log('Button clicked');
});

// Append to container
document.getElementById('button-container').appendChild(button);
```

### Button State Management
```javascript
// Loading state
function setLoading(button, loading = true) {
  if (loading) {
    button.disabled = true;
    button.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2"></span>
      Loading...
    `;
  } else {
    button.disabled = false;
    button.textContent = 'Submit';
  }
}

// Toggle active state
document.querySelectorAll('[data-toggle-group] .btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from siblings
    this.parentElement.querySelectorAll('.btn').forEach(b => {
      b.classList.remove('active');
    });
    // Add active to clicked
    this.classList.add('active');
  });
});
```

## Accessibility

### ARIA Labels
```html
<!-- Icon-only button -->
<button class="btn btn-primary" aria-label="Add new item">
  <i class="fa-solid fa-plus"></i>
</button>

<!-- Loading button -->
<button class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </span>
</button>
```

### Keyboard Navigation
- All buttons must be keyboard accessible
- Use `tabindex="0"` for custom button elements
- Provide visual focus indicators
- Support Enter and Space key activation

## Best Practices

### DO:
- Use semantic button elements when possible
- Provide clear button labels
- Include hover and focus states
- Test keyboard navigation
- Use appropriate button sizes for touch

### DON'T:
- Don't use buttons for navigation (use links)
- Don't disable buttons without explanation
- Don't remove focus indicators
- Don't make touch targets too small

## Common Patterns

### Confirmation Buttons
```html
<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">
  Delete
</button>

<!-- Confirmation Modal -->
<div class="modal fade" id="confirmModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Are you sure you want to delete this item?
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
```

### Button with Dropdown
```html
<div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
    Actions
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Edit</a></li>
    <li><a class="dropdown-item" href="#">Duplicate</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
  </ul>
</div>
```