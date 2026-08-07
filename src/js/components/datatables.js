// DataTables Component with Bootstrap 5 styling
import DataTable from 'datatables.net-bs5';
import { logger } from '../utils/logger.js';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

// Default DataTables configuration
const defaultConfig = {
  pageLength: 10,
  responsive: true,
  language: {
    search: '_INPUT_',
    searchPlaceholder: 'Search...',
    lengthMenu: '_MENU_ records per page',
    paginate: {
      first: '<i class="fas fa-angle-double-left"></i>',
      last: '<i class="fas fa-angle-double-right"></i>',
      next: '<i class="fas fa-angle-right"></i>',
      previous: '<i class="fas fa-angle-left"></i>'
    }
  },
  layout: {
    topStart: 'pageLength',
    topEnd: 'search',
    bottomStart: 'info',
    bottomEnd: 'paging'
  }
};

/**
 * Initialize a DataTable with custom configuration
 * @param {string|HTMLElement} selector - Table selector or element
 * @param {Object} customConfig - Custom configuration to merge with defaults
 * @returns {DataTable} DataTable instance
 */
/**
 * Initialize a DataTable with the Buttons extension (copy / csv / excel / print).
 *
 * Buttons and JSZip are imported dynamically so only the pages that actually
 * export data pay for them. Previously data-tables.html asked for
 * `dom: 'Bfrtip'` with a `buttons` array while nothing ever imported the
 * Buttons extension, so the export toolbar simply never rendered.
 *
 * @param {string|HTMLElement} selector
 * @param {Object} customConfig
 * @returns {Promise<DataTable>}
 */
export async function initDataTableWithButtons(selector, customConfig = {}) {
  // Import the .mjs builds: the .js ones are UMD and expect a jQuery-style
  // global, which throws under Vite's ESM bundling.
  const [, , , JSZipModule] = await Promise.all([
    import('datatables.net-buttons-bs5'),
    import('datatables.net-buttons/js/buttons.html5.mjs'),
    import('datatables.net-buttons/js/buttons.print.mjs'),
    import('jszip')
  ]);

  // The Excel export looks JSZip up through this registration hook.
  DataTable.Buttons.jszip(JSZipModule.default ?? JSZipModule);

  const { buttons = ['copy', 'csv', 'excel', 'print'], ...rest } = customConfig;

  return initDataTable(selector, {
    ...rest,
    // DataTables 3 prefers `layout` over the legacy `dom` string.
    layout: {
      ...defaultConfig.layout,
      topStart: 'buttons'
    },
    buttons
  });
}

export function initDataTable(selector, customConfig = {}) {
  const config = { ...defaultConfig, ...customConfig };

  // Initialize DataTable
  const table = new DataTable(selector, config);

  // Add custom styling to search input
  const searchInput = document.querySelector(`${selector}_wrapper .dataTables_filter input`);
  if (searchInput) {
    searchInput.classList.add('form-control', 'form-control-sm');
  }

  // Add custom styling to length select
  const lengthSelect = document.querySelector(`${selector}_wrapper .dataTables_length select`);
  if (lengthSelect) {
    lengthSelect.classList.add('form-select', 'form-select-sm');
  }

  return table;
}

/**
 * Initialize all tables with data-datatable attribute
 */
export function initAllDataTables() {
  const tables = document.querySelectorAll('[data-datatable]');
  const instances = [];

  tables.forEach((table) => {
    // Get custom config from data attributes
    const customConfig = {};

    // Check for common data attributes
    if (table.dataset.pageLength) {
      customConfig.pageLength = parseInt(table.dataset.pageLength);
    }

    if (table.dataset.order) {
      try {
        customConfig.order = JSON.parse(table.dataset.order);
      } catch (e) {
        logger.error('Invalid order configuration:', e);
      }
    }

    if (table.dataset.searching !== undefined) {
      customConfig.searching = table.dataset.searching === 'true';
    }

    if (table.dataset.paging !== undefined) {
      customConfig.paging = table.dataset.paging === 'true';
    }

    if (table.dataset.info !== undefined) {
      customConfig.info = table.dataset.info === 'true';
    }

    // Initialize the table
    const instance = initDataTable(table, customConfig);
    instances.push({ element: table, instance });
  });

  return instances;
}

/**
 * Destroy a DataTable instance
 * @param {string|HTMLElement} selector - Table selector or element
 */
export function destroyDataTable(selector) {
  const table = typeof selector === 'string' ? document.querySelector(selector) : selector;

  if (table && DataTable.isDataTable(table)) {
    new DataTable(table).destroy();
  }
}

/**
 * Reload DataTable data
 * @param {string|HTMLElement} selector - Table selector or element
 */
export function reloadDataTable(selector) {
  const table = typeof selector === 'string' ? document.querySelector(selector) : selector;

  if (table && DataTable.isDataTable(table)) {
    new DataTable(table).ajax.reload();
  }
}

// Export DataTable for advanced usage
export { DataTable };
