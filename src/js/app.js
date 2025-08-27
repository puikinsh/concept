// Main Application JavaScript
import * as bootstrap from 'bootstrap';
import { logger } from './utils/logger.js';

// Make Bootstrap available globally
window.bootstrap = bootstrap;

// Import components
import { initSidebar } from './components/sidebar.js';
import { initTooltips } from './components/tooltips.js';
import { initPopovers } from './components/popovers.js';
import { initFormValidation } from './components/form-validation.js';
import { initAllDataTables } from './components/datatables.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Bootstrap components
  initTooltips();
  initPopovers();

  // Initialize custom components
  initSidebar();
  initFormValidation();
  initAllDataTables();

  // Initialize dropdowns
  const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  dropdownElementList.forEach((dropdown) => {
    new bootstrap.Dropdown(dropdown);
  });

  logger.info('Concept Dashboard initialized');
});
