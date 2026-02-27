import DataTable from 'datatables.net-bs5';
import { logger } from '../utils/logger.js';
import { confirmDelete } from '../utils/confirm-dialog.js';
import { showToast } from '../utils/toast.js';
import { setLoading, resetLoading } from '../utils/button-loading.js';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

// User Management functionality
export function initializeUserManagement() {
  const selectedUsers = new Set();

  // Initialize DataTable (vanilla JS — no jQuery needed with DataTables 2.x)
  const table = new DataTable('#userTable', {
    responsive: true,
    pageLength: 10,
    order: [[5, 'desc']],
    columnDefs: [
      { orderable: false, targets: [0, 7] },
      { searchable: false, targets: [0, 7] }
    ],
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Search users...',
      lengthMenu: '_MENU_ users per page',
      info: 'Showing _START_ to _END_ of _TOTAL_ users',
      paginate: {
        previous: '<i class="fas fa-chevron-left"></i>',
        next: '<i class="fas fa-chevron-right"></i>'
      }
    },
    drawCallback() {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
        new bootstrap.Tooltip(el);
      });
    }
  });

  // Hide default search box as we're using custom search
  const defaultFilter = document.querySelector('.dataTables_filter');
  if (defaultFilter) {
    defaultFilter.style.display = 'none';
  }

  // Custom search functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', function () {
    table.search(this.value).draw();
  });

  // Filter functionality
  const roleFilter = document.getElementById('roleFilter');
  const statusFilter = document.getElementById('statusFilter');

  roleFilter.addEventListener('change', () => filterTable());
  statusFilter.addEventListener('change', () => filterTable());

  function filterTable() {
    const role = roleFilter.value;
    const status = statusFilter.value;

    // Use vanilla DataTables API instead of $.fn.dataTable
    DataTable.ext.search.push((_settings, data) => {
      const roleCell = data[3];
      const statusCell = data[4];

      const roleMatch = !role || roleCell.toLowerCase().includes(role.toLowerCase());
      const statusMatch = !status || statusCell.toLowerCase().includes(status.toLowerCase());

      return roleMatch && statusMatch;
    });

    table.draw();
    DataTable.ext.search.pop();
  }

  // Reset filters
  document.getElementById('resetFilters').addEventListener('click', () => {
    searchInput.value = '';
    roleFilter.value = '';
    statusFilter.value = '';
    table.search('').draw();
  });

  // Select all checkbox
  const selectAllCheckbox = document.getElementById('selectAll');
  selectAllCheckbox.addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('#userTable tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
      const row = checkbox.closest('tr');
      if (this.checked) {
        selectedUsers.add(row);
        row.classList.add('table-active');
      } else {
        selectedUsers.delete(row);
        row.classList.remove('table-active');
      }
    });
    updateBulkActions();
  });

  // Individual checkbox handling
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.closest('#userTable tbody')) {
      const row = e.target.closest('tr');
      if (e.target.checked) {
        selectedUsers.add(row);
        row.classList.add('table-active');
      } else {
        selectedUsers.delete(row);
        row.classList.remove('table-active');
        selectAllCheckbox.checked = false;
      }
      updateBulkActions();
    }
  });

  function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');

    if (selectedUsers.size > 0) {
      bulkActions.style.display = 'block';
      selectedCount.textContent = selectedUsers.size;
    } else {
      bulkActions.style.display = 'none';
    }
  }

  // Export functionality
  document.getElementById('exportBtn').addEventListener('click', function () {
    setLoading(this, 'Exporting...');

    setTimeout(() => {
      const csvContent = generateCSV();
      downloadCSV(csvContent, 'users_export.csv');
      resetLoading(this, '<i class="fas fa-check me-1"></i>Exported!', 'btn-success');
    }, 1500);
  });

  function generateCSV() {
    const headers = ['Name', 'Email', 'Username', 'Role', 'Status', 'Joined Date'];
    const rows = [];
    const parser = new DOMParser();

    table.rows({ search: 'applied' }).every(function () {
      const data = this.data();
      const nameDoc = parser.parseFromString(data[1], 'text/html');
      const name = nameDoc.querySelector('h6')?.textContent || '';
      const username = nameDoc.querySelector('small')?.textContent?.replace('@', '') || '';
      const email = data[2];
      const roleDoc = parser.parseFromString(data[3], 'text/html');
      const role = roleDoc.body.textContent.trim();
      const statusDoc = parser.parseFromString(data[4], 'text/html');
      const status = statusDoc.body.textContent.trim();
      const joined = data[5];

      rows.push([name, email, username, role, status, joined]);
    });

    let csv = `${headers.join(',')}\n`;
    rows.forEach((row) => {
      csv += `${row.map((cell) => `"${cell}"`).join(',')}\n`;
    });
    return csv;
  }

  function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Add user form
  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    setLoading(submitBtn, 'Adding...');

    setTimeout(() => {
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        role: document.getElementById('role').value,
        status: document.getElementById('status').value,
        sendInvite: document.getElementById('sendInvite').checked
      };

      const newRowData = createUserRowData(formData);
      table.row.add(newRowData).draw();

      const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      modal.hide();
      addUserForm.reset();

      showToast('User added successfully!', 'success');
      resetLoading(submitBtn);
    }, 1500);
  });

  function createUserRowData(data) {
    const name = `${data.firstName} ${data.lastName}`;
    const bgColor = getRandomColor();
    const roleClass = getRoleBadgeClass(data.role);
    const statusClass = getStatusBadgeClass(data.status);
    const joinedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    // Return array of HTML strings for DataTables row.add()
    return [
      '<div class="form-check"><input class="form-check-input" type="checkbox"></div>',
      `<div class="d-flex align-items-center">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff" alt="${escapeAttr(name)}'s avatar" class="rounded-circle me-3" width="40" height="40">
        <div><h6 class="mb-0">${escapeHtml(name)}</h6><small class="text-muted">@${escapeHtml(data.username)}</small></div>
      </div>`,
      escapeHtml(data.email),
      `<span class="badge bg-${roleClass}">${capitalizeFirst(data.role)}</span>`,
      `<span class="badge bg-${statusClass}">${capitalizeFirst(data.status)}</span>`,
      joinedDate,
      'Just now',
      `<div class="dropdown">
        <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"><i class="fas fa-eye me-2"></i>View</a></li>
          <li><a class="dropdown-item" href="#"><i class="fas fa-edit me-2"></i>Edit</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#"><i class="fas fa-trash me-2"></i>Delete</a></li>
        </ul>
      </div>`
    ];
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function getRandomColor() {
    const colors = ['667eea', '48bb78', 'f39c12', 'e74c3c', '3498db', '9b59b6', '1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRoleBadgeClass(role) {
    const classes = {
      admin: 'danger',
      manager: 'primary',
      user: 'info',
      guest: 'secondary'
    };
    return classes[role] || 'secondary';
  }

  function getStatusBadgeClass(status) {
    const classes = {
      active: 'success',
      pending: 'warning text-dark',
      inactive: 'secondary',
      suspended: 'danger'
    };
    return classes[status] || 'secondary';
  }

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Handle action buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-item')) {
      const action = e.target.textContent.trim();
      const row = e.target.closest('tr');
      if (!row) {
        return;
      }
      const userName = row.querySelector('h6')?.textContent;

      switch (action) {
        case 'View':
          logger.info('View user:', userName);
          break;
        case 'Edit':
          logger.info('Edit user:', userName);
          break;
        case 'Delete':
          confirmDelete(userName).then((confirmed) => {
            if (confirmed) {
              table.row(row).remove().draw();
              showToast('User deleted successfully!', 'success');
            }
          });
          break;
      }
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUserManagement);
} else {
  initializeUserManagement();
}
