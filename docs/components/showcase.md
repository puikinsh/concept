# Component Showcase

Visual examples of all Concept components with implementation details.

## Cards

Cards are the primary content containers in Concept, featuring custom styling with subtle shadows and borders.

### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Card Title</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Card content goes here.</p>
  </div>
</div>
```

**Features:**
- Border: `1px solid #e6e6f2`
- Shadow: `0px 0px 4px 0px rgba(82, 63, 105, 0.05)`
- Header padding: `20px 30px`
- Body padding: `30px`

### Dashboard Metric Card
Used throughout the Finance Dashboard for displaying key metrics:

```html
<div class="card finance-metric-card">
  <h5 class="card-header">Total Income</h5>
  <div class="card-body">
    <div class="metric-value d-inline-block">
      <h1 class="mb-1">$5,79,000</h1>
    </div>
    <div class="metric-label d-inline-block float-end text-success fw-bold">
      <span class="icon-circle-small icon-box-xs text-success bg-success-light">
        <i class="fa fa-fw fa-arrow-up"></i>
      </span>
      <span class="ms-1">25%</span>
    </div>
  </div>
  <div class="card-body bg-light">
    <div class="sparkline-container">
      <canvas id="sparkline-income"></canvas>
    </div>
  </div>
</div>
```

## Buttons

Concept customizes Bootstrap buttons with specific color overrides for better contrast.

### Button Variants
```html
<!-- Primary Button (#5969ff) -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary Button (#6c757d) -->
<button class="btn btn-secondary">Secondary</button>

<!-- Success Button (#28a745) -->
<button class="btn btn-success">Success</button>

<!-- Danger Button (#dc3545) -->
<button class="btn btn-danger">Danger</button>

<!-- Warning Button (#ffc107) -->
<button class="btn btn-warning">Warning</button>

<!-- Info Button (#17a2b8) -->
<button class="btn btn-info">Info</button>
```

**Key Features:**
- All dark buttons have forced white text using `!important`
- Consistent hover states
- Border radius: `0.25rem`

### Button Groups
```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
```

## Forms

Forms in Concept use custom styling for better visual consistency.

### Form Layout
```html
<div class="card">
  <h5 class="card-header">User Information</h5>
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Enter username">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
        <small class="form-text text-muted">We'll never share your email.</small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
```

**Form Styling:**
- Border color: `#d4d9e3`
- Focus border: `#5969ff`
- Focus shadow: `0 0 0 0.2rem rgba(89, 105, 255, 0.25)`
- Font size: `0.875rem`

## Tables

Concept provides both basic Bootstrap tables and advanced DataTables integration.

### Basic Table
```html
<div class="card">
  <h5 class="card-header">Recent Orders</h5>
  <div class="card-body">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#12345</td>
            <td>John Doe</td>
            <td>iPhone 15 Pro</td>
            <td>$999</td>
            <td><span class="badge bg-success">Completed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

### DataTable
```html
<table id="data-table" class="table table-striped table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Office</th>
      <th>Start date</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <!-- Table rows -->
  </tbody>
</table>

<script type="module">
import DataTable from 'datatables.net-bs5';
new DataTable('#data-table');
</script>
```

## Charts

All charts in Concept use Chart.js with a consistent color palette.

### Line Chart Example
```javascript
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#5969ff',
      backgroundColor: 'rgba(89, 105, 255, 0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    }
  }
});
```

### Chart Color Palette
- Primary: `#5969ff`
- Secondary: `#6c757d`
- Success: `#28a745`
- Danger: `#dc3545`
- Warning: `#ffc107`
- Info: `#17a2b8`
- Purple: `#7b1fa2`
- Pink: `#ff407b`

## Navigation

### Sidebar
The sidebar uses a dark theme with custom styling:

```scss
// Sidebar configuration
$sidebar-width: 260px;
$sidebar-bg: #0e0c28;
$sidebar-color: #8287a0;
$sidebar-hover-bg: rgba(255, 255, 255, 0.08);
$sidebar-active-bg: #5969ff;
```

### Breadcrumbs
```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
    <li class="breadcrumb-item"><a href="#">E-commerce</a></li>
    <li class="breadcrumb-item active">Products</li>
  </ol>
</nav>
```

## Badges & Labels

### Status Badges
```html
<span class="badge bg-primary">Primary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-warning text-dark">Warning</span>
<span class="badge bg-info">Info</span>
<span class="badge bg-secondary">Secondary</span>
```

### Pill Badges
```html
<span class="badge rounded-pill bg-primary">12</span>
<span class="badge rounded-pill bg-danger">5</span>
<span class="badge rounded-pill bg-success">99+</span>
```

## Alerts

### Alert Variants
```html
<div class="alert alert-primary" role="alert">
  <strong>Primary!</strong> This is a primary alert.
</div>

<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Your changes have been saved.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<div class="alert alert-danger" role="alert">
  <i class="fa-solid fa-exclamation-circle me-2"></i>
  <strong>Error!</strong> Something went wrong.
</div>
```

## Modals

### Basic Modal
```html
<!-- Trigger -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch Modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Modal body content goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

## Progress Bars

### Basic Progress
```html
<div class="progress mb-3">
  <div class="progress-bar" role="progressbar" style="width: 25%">25%</div>
</div>

<div class="progress mb-3">
  <div class="progress-bar bg-success" role="progressbar" style="width: 50%">50%</div>
</div>

<div class="progress mb-3">
  <div class="progress-bar bg-warning" role="progressbar" style="width: 75%">75%</div>
</div>

<div class="progress">
  <div class="progress-bar bg-danger" role="progressbar" style="width: 100%">100%</div>
</div>
```

### Striped & Animated
```html
<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" 
       role="progressbar" 
       style="width: 45%">
    Loading...
  </div>
</div>
```

## Component Best Practices

### Accessibility
- All interactive components are keyboard accessible
- Proper ARIA labels and roles
- Sufficient color contrast (WCAG AA compliant)
- Focus indicators on all interactive elements

### Performance
- Components use CSS transforms for animations
- Images are lazy-loaded where appropriate
- JavaScript is loaded asynchronously
- Minimal DOM manipulation

### Responsive Design
- All components adapt to screen size
- Touch-friendly on mobile devices
- Optimized layouts for tablets
- Full functionality across all devices