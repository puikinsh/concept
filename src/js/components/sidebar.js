import { logger } from '../utils/logger.js';

// Sidebar functionality
export function initSidebar() {
  const sidebar = document.querySelector('.nav-left-sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggler'); // This is the hamburger in the header
  const _dashboardWrapper = document.querySelector('.dashboard-wrapper');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  // Toggle sidebar function
  function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  }

  // Close sidebar function
  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    });
  }

  // Close sidebar when clicking overlay
  overlay.addEventListener('click', closeSidebar);

  // Handle sidebar menu clicks
  const sidebarLinks = document.querySelectorAll('.nav-left-sidebar .nav-link');
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', function (_e) {
      // Don't prevent default for actual navigation links
      if (!this.hasAttribute('data-bs-toggle')) {
        // This is a navigation link, not a dropdown toggle
        logger.info('Navigating to:', this.href);
        // Don't prevent the navigation
        return;
      }

      // Remove active class from all links
      sidebarLinks.forEach((l) => l.classList.remove('active'));

      // Add active class to clicked link
      this.classList.add('active');

      // Handle submenu active states
      const parentLi = this.closest('li');
      if (parentLi) {
        const submenu = parentLi.querySelector('.collapse');
        if (submenu && !this.hasAttribute('data-bs-toggle')) {
          // This is a submenu item
          const parentToggle = parentLi.closest('.collapse')?.previousElementSibling;
          if (parentToggle) {
            parentToggle.classList.add('active');
          }
        }
      }
    });
  });

  // Close sidebar when clicking on a link (mobile only)
  // But NOT when clicking on dropdown toggles
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (_e) => {
      // Don't close if this is a dropdown toggle
      if (
        link.hasAttribute('data-bs-toggle') &&
        link.getAttribute('data-bs-toggle') === 'collapse'
      ) {
        return; // Don't close sidebar for dropdown toggles
      }

      // Only close for actual navigation links on mobile (not parent menu items)
      const isLeafLink = !link.querySelector('span.badge'); // Links without badges are usually leaf links
      const isInSubmenu = link.closest('.collapse') !== null;

      if (window.innerWidth <= 991 && (isLeafLink || isInSubmenu)) {
        setTimeout(() => {
          closeSidebar();
        }, 300);
      }
    });
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 991) {
        closeSidebar();
      }
    }, 250);
  });
}
