import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-responsive-bs5';

// Data Tables functionality
export function initializeDataTables() {
  // Basic DataTable
  const basicTable = document.getElementById('basic-datatable');
  if (basicTable) {
    new DataTable(basicTable, {
      responsive: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    });
  }

  // Advanced DataTable with custom controls
  const advancedTable = document.getElementById('advanced-datatable');
  if (advancedTable) {
    new DataTable(advancedTable, {
      responsive: true,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>rtip',
      pageLength: 10,
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'All']
      ],
      columnDefs: [
        { orderable: false, targets: -1 } // Disable sorting on last column (actions)
      ],
      order: [[0, 'asc']],
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records...',
        lengthMenu: 'Show _MENU_ records per page',
        paginate: {
          previous: '<i class="fas fa-chevron-left"></i>',
          next: '<i class="fas fa-chevron-right"></i>'
        }
      }
    });
  }

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDataTables);
} else {
  initializeDataTables();
}
