# Tables

Concept includes both Bootstrap 5 tables and DataTables v2.2.3 with Bootstrap 5 styling for advanced functionality.

## Concept Table Configuration

### Table Variables
```scss
// From Concept's _variables.scss
$table-cell-padding-y: 0.75rem;
$table-cell-padding-x: 0.75rem;
$body-color: #3d405c;
$border-color: #e6e6f2;
```

### Basic Table Structure
From Concept's general-tables.html:

```html
<div class="card">
  <h5 class="card-header">Basic Table</h5>
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td><span class="badge bg-success">Active</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Table Variants
```html
<!-- Striped rows -->
<table class="table table-striped">
  <!-- table content -->
</table>

<!-- Bordered table -->
<table class="table table-bordered">
  <!-- table content -->
</table>

<!-- Hover effect -->
<table class="table table-hover">
  <!-- table content -->
</table>

<!-- Small table -->
<table class="table table-sm">
  <!-- table content -->
</table>
```

### Responsive Tables
```html
<!-- Always responsive -->
<div class="table-responsive">
  <table class="table">
    <!-- table content -->
  </table>
</div>

<!-- Responsive at specific breakpoints -->
<div class="table-responsive-lg">
  <table class="table">
    <!-- table content -->
  </table>
</div>
```

## DataTables Integration

Concept uses DataTables with Bootstrap 5 styling. From data-tables.html:

```html
<!-- Employee Database table -->
<table id="basic-datatable" class="table table-striped table-bordered" style="width:100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Office</th>
      <th>Age</th>
      <th>Start date</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tiger Nixon</td>
      <td>System Architect</td>
      <td>Edinburgh</td>
      <td>61</td>
      <td>2011/04/25</td>
      <td>$320,800</td>
    </tr>
    <!-- more rows -->
  </tbody>
</table>

<script type="module">
import DataTable from 'datatables.net-bs5';

// Initialize DataTable
new DataTable('#basic-datatable', {
  pageLength: 10,
  responsive: true
});
</script>
```

### DataTable with Options
```javascript
new DataTable('#advancedTable', {
  // Pagination
  pageLength: 25,
  lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
  
  // Sorting
  order: [[1, 'asc']],
  
  // Search
  searching: true,
  
  // Info
  info: true,
  
  // Responsive
  responsive: true,
  
  // Language
  language: {
    search: "Search:",
    lengthMenu: "Show _MENU_ entries",
    info: "Showing _START_ to _END_ of _TOTAL_ entries",
    paginate: {
      first: "First",
      last: "Last",
      next: "Next",
      previous: "Previous"
    }
  }
});
```

### Server-Side Processing
```javascript
new DataTable('#serverTable', {
  processing: true,
  serverSide: true,
  ajax: {
    url: '/api/data',
    type: 'POST',
    data: function(d) {
      // Add custom parameters
      d.customParam = 'value';
    }
  },
  columns: [
    { data: 'name' },
    { data: 'email' },
    { data: 'status' },
    {
      data: 'id',
      render: function(data) {
        return `
          <button class="btn btn-sm btn-primary" onclick="editRecord(${data})">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteRecord(${data})">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
      }
    }
  ]
});
```

## Table Patterns

### Table with Actions
```html
<table class="table">
  <thead>
    <tr>
      <th>
        <input type="checkbox" class="form-check-input" id="selectAll">
      </th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input type="checkbox" class="form-check-input row-checkbox">
      </td>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
      <td>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-primary">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="btn btn-outline-secondary">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="btn btn-outline-danger">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<script>
// Select all functionality
document.getElementById('selectAll').addEventListener('change', function() {
  const checkboxes = document.querySelectorAll('.row-checkbox');
  checkboxes.forEach(cb => cb.checked = this.checked);
});
</script>
```

### Expandable Rows
```html
<table class="table">
  <tbody>
    <tr class="expandable-row" data-target="#details1">
      <td><i class="fa-solid fa-chevron-right"></i></td>
      <td>Order #1234</td>
      <td>$150.00</td>
      <td>Completed</td>
    </tr>
    <tr id="details1" class="collapse">
      <td colspan="4">
        <div class="p-3">
          <h6>Order Details</h6>
          <p>Additional information about the order...</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<script>
document.querySelectorAll('.expandable-row').forEach(row => {
  row.addEventListener('click', function() {
    const target = document.querySelector(this.dataset.target);
    const icon = this.querySelector('i');
    
    if (target.classList.contains('show')) {
      target.classList.remove('show');
      icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
    } else {
      target.classList.add('show');
      icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
    }
  });
});
</script>
```

### Editable Table
```html
<table class="table" id="editableTable">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td contenteditable="true">Product Name</td>
      <td contenteditable="true" class="price">10.00</td>
      <td contenteditable="true" class="quantity">1</td>
      <td class="total">10.00</td>
    </tr>
  </tbody>
</table>

<script>
// Calculate totals on edit
document.querySelectorAll('#editableTable td[contenteditable]').forEach(cell => {
  cell.addEventListener('input', function() {
    const row = this.closest('tr');
    const price = parseFloat(row.querySelector('.price').textContent) || 0;
    const quantity = parseInt(row.querySelector('.quantity').textContent) || 0;
    row.querySelector('.total').textContent = (price * quantity).toFixed(2);
  });
});
</script>
```

## Advanced Features

### Export Buttons
```javascript
new DataTable('#exportTable', {
  dom: 'Bfrtip',
  buttons: [
    'copy',
    'csv',
    'excel',
    'pdf',
    {
      extend: 'print',
      text: '<i class="fa-solid fa-print"></i> Print',
      className: 'btn btn-secondary'
    }
  ]
});
```

### Column Visibility
```javascript
new DataTable('#columnToggleTable', {
  dom: 'Bfrtip',
  buttons: [
    {
      extend: 'colvis',
      text: 'Columns',
      className: 'btn btn-secondary'
    }
  ],
  columnDefs: [
    {
      targets: [2, 3],
      visible: false
    }
  ]
});
```

### Custom Filtering
```html
<div class="row mb-3">
  <div class="col-md-4">
    <select class="form-select" id="statusFilter">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
</div>

<table id="filterTable" class="table">
  <!-- table content -->
</table>

<script>
const table = new DataTable('#filterTable');

// Custom filter
document.getElementById('statusFilter').addEventListener('change', function() {
  table.column(3).search(this.value).draw();
});

// Date range filter
$.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
  const min = $('#minDate').val();
  const max = $('#maxDate').val();
  const date = data[4]; // Date column
  
  if (!min && !max) return true;
  if (!min && date <= max) return true;
  if (min <= date && !max) return true;
  if (min <= date && date <= max) return true;
  
  return false;
});
</script>
```

## Table Styling

### Custom Table Styles
```scss
// Compact table
.table-compact {
  td, th {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

// Fixed header
.table-fixed-header {
  thead {
    position: sticky;
    top: 0;
    background-color: $white;
    z-index: 10;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
  }
}

// Highlight on hover
.table-highlight tbody tr:hover {
  background-color: rgba($primary, 0.05);
  cursor: pointer;
}
```

## Performance Optimization

### Virtual Scrolling
```javascript
new DataTable('#largeTable', {
  scrollY: '400px',
  scrollCollapse: true,
  scroller: true,
  deferRender: true,
  ajax: 'large-dataset.json'
});
```

### Lazy Loading
```javascript
let page = 1;
const pageSize = 50;

function loadMoreRows() {
  fetch(`/api/data?page=${page}&size=${pageSize}`)
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#infiniteTable tbody');
      data.forEach(row => {
        tbody.insertAdjacentHTML('beforeend', createTableRow(row));
      });
      page++;
    });
}

// Intersection Observer for infinite scroll
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadMoreRows();
  }
});

observer.observe(document.querySelector('#loadMoreTrigger'));
```

## Accessibility

- Use proper table structure with thead, tbody
- Include scope attributes on th elements
- Provide table captions when needed
- Ensure keyboard navigation works
- Use aria-label for action buttons
- Maintain focus management

## Best Practices

### DO:
- Use semantic HTML table elements
- Make tables responsive
- Provide sorting/filtering for large datasets
- Include loading states
- Show empty states when no data
- Use appropriate column widths

### DON'T:
- Don't use tables for layout
- Don't load thousands of rows at once
- Don't forget mobile experience
- Don't make cells too cramped
- Don't use tables for simple lists