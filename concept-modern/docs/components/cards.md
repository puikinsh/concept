# Cards

Cards are flexible content containers with multiple variants for displaying different types of content.

## Basic Card

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

## Card Components

### Card Header & Footer
```html
<div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below.</p>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
```

### Card with Image
```html
<div class="card">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Card content</p>
  </div>
</div>

<!-- Image overlay -->
<div class="card text-white">
  <img src="..." class="card-img" alt="...">
  <div class="card-img-overlay">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Overlay content</p>
  </div>
</div>
```

## Card Variations

### Bordered Cards
```html
<div class="card border-primary">
  <div class="card-header">Header</div>
  <div class="card-body text-primary">
    <h5 class="card-title">Primary card</h5>
    <p class="card-text">Example text content.</p>
  </div>
</div>
```

### Background Colors
```html
<div class="card text-white bg-primary">
  <div class="card-body">
    <h5 class="card-title">Primary card</h5>
    <p class="card-text">White text on colored background.</p>
  </div>
</div>
```

### Card without Border
```html
<div class="card border-0 shadow">
  <div class="card-body">
    <h5 class="card-title">Borderless Card</h5>
    <p class="card-text">Card with shadow instead of border.</p>
  </div>
</div>
```

## Dashboard Cards

### Stat Card
```html
<div class="card border-0">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h6 class="text-muted mb-2">Total Revenue</h6>
        <h3 class="mb-0">$24,563</h3>
        <small class="text-success">
          <i class="fa-solid fa-arrow-up"></i> 12.5%
        </small>
      </div>
      <div class="icon-shape icon-md bg-primary-soft text-primary rounded-circle">
        <i class="fa-solid fa-dollar-sign"></i>
      </div>
    </div>
  </div>
</div>
```

### Chart Card
```html
<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="card-title mb-0">Sales Overview</h5>
    <div class="dropdown">
      <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
        <i class="fa-solid fa-ellipsis-v"></i>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Daily</a></li>
        <li><a class="dropdown-item" href="#">Weekly</a></li>
        <li><a class="dropdown-item" href="#">Monthly</a></li>
      </ul>
    </div>
  </div>
  <div class="card-body">
    <canvas id="salesChart"></canvas>
  </div>
</div>
```

### Activity Card
```html
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Recent Activity</h5>
  </div>
  <div class="card-body">
    <ul class="list-unstyled mb-0">
      <li class="d-flex align-items-center mb-3">
        <div class="avatar avatar-sm me-3">
          <img src="..." class="rounded-circle" alt="User">
        </div>
        <div class="flex-grow-1">
          <h6 class="mb-0">John Doe</h6>
          <small class="text-muted">Completed task - 2 hours ago</small>
        </div>
      </li>
    </ul>
  </div>
</div>
```

## Card Layouts

### Card Group
```html
<div class="card-group">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card 1</h5>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card 2</h5>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card 3</h5>
    </div>
  </div>
</div>
```

### Card Grid
```html
<div class="row g-4">
  <div class="col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Card 1</h5>
      </div>
    </div>
  </div>
  <div class="col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Card 2</h5>
      </div>
    </div>
  </div>
</div>
```

## Interactive Cards

### Clickable Card
```html
<div class="card card-hover" onclick="window.location='#'">
  <div class="card-body">
    <h5 class="card-title">Clickable Card</h5>
    <p class="card-text">Entire card is clickable.</p>
  </div>
</div>

<style>
.card-hover {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
```

### Collapsible Card
```html
<div class="card">
  <div class="card-header" data-bs-toggle="collapse" data-bs-target="#collapseCard">
    <h5 class="card-title mb-0">
      Collapsible Card
      <i class="fa-solid fa-chevron-down float-end"></i>
    </h5>
  </div>
  <div id="collapseCard" class="collapse show">
    <div class="card-body">
      Card content that can be toggled.
    </div>
  </div>
</div>
```

## Custom Card Styles

### Loading Card
```html
<div class="card">
  <div class="card-body">
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 mb-0">Loading content...</p>
    </div>
  </div>
</div>
```

### Empty State Card
```html
<div class="card">
  <div class="card-body text-center py-5">
    <i class="fa-solid fa-inbox fa-3x text-muted mb-3"></i>
    <h5>No Data Available</h5>
    <p class="text-muted">There's nothing to display at the moment.</p>
    <button class="btn btn-primary">Add New Item</button>
  </div>
</div>
```

## JavaScript Usage

### Dynamic Card Creation
```javascript
function createStatCard(title, value, change, icon) {
  return `
    <div class="card border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="text-muted mb-2">${title}</h6>
            <h3 class="mb-0">${value}</h3>
            <small class="${change >= 0 ? 'text-success' : 'text-danger'}">
              <i class="fa-solid fa-arrow-${change >= 0 ? 'up' : 'down'}"></i> 
              ${Math.abs(change)}%
            </small>
          </div>
          <div class="icon-shape icon-md bg-primary-soft text-primary rounded-circle">
            <i class="${icon}"></i>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Usage
const container = document.getElementById('stats-container');
container.innerHTML = createStatCard('Revenue', '$12,345', 5.2, 'fa-solid fa-dollar-sign');
```

### Card State Management
```javascript
// Toggle card loading state
function setCardLoading(card, loading = true) {
  const cardBody = card.querySelector('.card-body');
  
  if (loading) {
    cardBody.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    `;
  } else {
    // Restore content
  }
}

// Refresh card content
async function refreshCard(cardId) {
  const card = document.getElementById(cardId);
  setCardLoading(card, true);
  
  try {
    const data = await fetchCardData(cardId);
    updateCardContent(card, data);
  } finally {
    setCardLoading(card, false);
  }
}
```

## Accessibility

- Use semantic HTML structure
- Provide appropriate headings hierarchy
- Include alt text for images
- Ensure sufficient color contrast
- Make interactive cards keyboard accessible

## Best Practices

### DO:
- Keep card content concise
- Use consistent spacing
- Group related information
- Provide visual hierarchy
- Test responsive behavior

### DON'T:
- Don't overload cards with content
- Don't mix too many card styles
- Don't forget hover/focus states
- Don't use cards for everything